'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FALLBACK_MESSAGE, CONTACT_INFO } from '@/lib/chatKnowledgeBase';
import { IconWhatsApp, IconSparkles, IconHupacBot } from '@/components/Icons';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  isFallback?: boolean;
  links?: { label: string; url: string }[];
  options?: string[];
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '¡Hola! Bienvenido(a) a Hupac Textiles. Con gusto te ayudamos a encontrar los uniformes, prendas o productos de seguridad industrial que necesitas.\n\n¿Qué estás buscando hoy?',
      time: 'Ahora',
      links: [
        { label: 'Ver Catálogo de Uniformes', url: '/catalogo?catalogo=textil' },
        { label: 'Seguridad Industrial (EPP)', url: '/catalogo?catalogo=epc' },
        { label: 'Abrir Configurador 3D', url: '/configurador' }
      ],
      options: [
        'Uniformes Corporativos',
        'Playeras Tipo Polo',
        'Seguridad Industrial (EPP)',
        'Calzado de Seguridad'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Escuchar evento global desde el Navbar u otros botones del sitio
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-hupac-chat', handleOpenChat);
    return () => window.removeEventListener('open-hupac-chat', handleOpenChat);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const time = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      time
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    const chatHistory = [...messages, userMsg].slice(-8).map((m) => ({
      sender: m.sender,
      text: m.text
    }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: chatHistory
        })
      });

      const data = await res.json();
      const replyText = data.reply || FALLBACK_MESSAGE;
      const isFallback = replyText.includes('no cuento con esa información');

      const botMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
        isFallback,
        links: data.links || [],
        options: data.options || []
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      const botMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: FALLBACK_MESSAGE,
        time: new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
        isFallback: true,
        links: [{ label: 'Contactar a Soporte por WhatsApp', url: 'https://wa.me/525612870780' }],
        options: [
          'Uniformes Corporativos',
          'Playeras Tipo Polo',
          'Seguridad Industrial (EPP)',
          'Hablar con un asesor'
        ]
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const QUICK_QUESTIONS = [
    '¿Qué tipos de playeras y polos tienen?',
    '¿Qué cascos y guantes manejan?',
    '¿Tienen calzado industrial?',
    '¿Qué técnicas de personalización ofrecen?',
    '¿Dónde están ubicados y qué horarios tienen?',
    '¿Cómo puedo consultar sus catálogos?'
  ];

  return (
    <>
      {/* Ventana Modal / Popover del Chat (activado desde el Asistente en la barra superior) */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '400px',
            maxWidth: 'calc(100vw - 32px)',
            height: '600px',
            maxHeight: 'calc(100vh - 120px)',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 20px 48px rgba(19, 42, 82, 0.25)',
            border: '1px solid var(--linea)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9999,
            overflow: 'hidden',
            fontFamily: 'var(--sans)'
          }}
        >
          {/* Header del Chat */}
          <div
            style={{
              backgroundColor: 'var(--marino)',
              color: '#ffffff',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            {/* Línea superior con gradiente de luz */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #2456C4, #38bdf8, #132A52)'
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#0B192C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid rgba(56, 189, 248, 0.5)',
                  boxShadow: '0 0 14px rgba(56, 189, 248, 0.25)',
                  flexShrink: 0,
                  position: 'relative'
                }}
              >
                <img
                  src="/images/asistente-hupac.jpg"
                  alt="Asistente Virtual HUPAC"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: 'scale(1.2)'
                  }}
                />
              </div>
              <div>
                <b style={{ fontSize: '0.98rem', display: 'block', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                  Asistente Virtual HUPAC
                </b>
                <span style={{ fontSize: '0.75rem', color: '#93c5fd', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22c55e', display: 'inline-block' }} />
                  En línea · Base oficial autorizada
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                type="button"
                onClick={() => {
                  setMessages([
                    {
                      id: 'welcome',
                      sender: 'assistant',
                      text: '¡Hola! Bienvenido(a) a Hupac Textiles. Con gusto te ayudamos a encontrar los uniformes, prendas o productos de seguridad industrial que necesitas.\n\n¿Qué estás buscando hoy?',
                      time: 'Ahora',
                      links: [
                        { label: 'Ver Catálogo de Uniformes', url: '/catalogo?catalogo=textil' },
                        { label: 'Seguridad Industrial (EPP)', url: '/catalogo?catalogo=epc' },
                        { label: 'Abrir Configurador 3D', url: '/configurador' }
                      ],
                      options: [
                        'Uniformes Corporativos',
                        'Playeras Tipo Polo',
                        'Seguridad Industrial (EPP)',
                        'Calzado de Seguridad'
                      ]
                    }
                  ]);
                }}
                title="Reiniciar chat"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 600
                }}
              >
                Reiniciar
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar chat"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '8px',
                  opacity: 0.8,
                  transition: 'opacity 0.15s ease'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Historial de Mensajes */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '18px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              backgroundColor: '#f8fafc'
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  gap: '4px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '8px',
                    maxWidth: '92%',
                    flexDirection: m.sender === 'user' ? 'row-reverse' : 'row'
                  }}
                >
                  {m.sender === 'assistant' && (
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        backgroundColor: '#0B192C',
                        border: '1.5px solid rgba(56, 189, 248, 0.55)',
                        boxShadow: '0 2px 6px rgba(19, 42, 82, 0.15)',
                        flexShrink: 0,
                        marginBottom: '2px'
                      }}
                    >
                      <img
                        src="/images/asistente-hupac.jpg"
                        alt="Asistente Virtual HUPAC"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.2)' }}
                      />
                    </div>
                  )}

                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: m.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      backgroundColor: m.sender === 'user' ? 'var(--rey)' : '#ffffff',
                      color: m.sender === 'user' ? '#ffffff' : 'var(--texto)',
                      fontSize: '0.88rem',
                      lineHeight: 1.5,
                      boxShadow: m.sender === 'user' ? '0 4px 14px rgba(26, 58, 112, 0.2)' : '0 2px 10px rgba(0,0,0,0.04)',
                      border: m.sender === 'user' ? 'none' : '1px solid var(--linea)',
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {m.text}
                  </div>
                </div>

                {/* Botones de acción directa / Enlaces a la web */}
                {m.links && m.links.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px', marginLeft: m.sender === 'assistant' ? '36px' : '0', maxWidth: '90%' }}>
                    {m.links.map((lnk, i) => (
                      <a
                        key={i}
                        href={lnk.url}
                        target={lnk.url.startsWith('http') ? '_blank' : '_self'}
                        rel={lnk.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: '#ffffff',
                          color: 'var(--marino)',
                          border: '1.5px solid var(--rey)',
                          textDecoration: 'none',
                          padding: '6px 14px',
                          borderRadius: '100px',
                          fontSize: '0.78rem',
                          fontWeight: 750,
                          boxShadow: '0 2px 6px rgba(19, 42, 82, 0.08)',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {lnk.label}
                      </a>
                    ))}
                  </div>
                )}

                {/* Si es mensaje de fallback, botón de soporte directo por WhatsApp */}
                {m.isFallback && (
                  <div style={{ marginLeft: '36px', marginTop: '4px' }}>
                    <a
                      href={`https://wa.me/525612870780?text=${encodeURIComponent('Hola HUPAC Textiles, tengo una duda directa: ')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#25D366',
                        color: '#ffffff',
                        textDecoration: 'none',
                        padding: '8px 14px',
                        borderRadius: '100px',
                        fontSize: '0.8rem',
                        fontWeight: 800,
                        boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)'
                      }}
                    >
                      <IconWhatsApp size={16} />
                      <span>Contactar a Soporte por WhatsApp</span>
                    </a>
                  </div>
                )}

                {/* Opciones de respuesta rápida para el usuario */}
                {m.sender === 'assistant' && m.options && m.options.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      marginTop: '4px',
                      marginLeft: '36px',
                      maxWidth: '92%'
                    }}
                  >
                    {m.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSendMessage(opt)}
                        style={{
                          backgroundColor: '#EFF6FF',
                          border: '1.5px solid #BFDBFE',
                          borderRadius: '100px',
                          padding: '6px 14px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: 'var(--rey)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          boxShadow: '0 2px 4px rgba(36, 86, 196, 0.08)',
                          transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--rey)';
                          e.currentTarget.style.color = '#ffffff';
                          e.currentTarget.style.borderColor = 'var(--rey)';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = '0 4px 10px rgba(36, 86, 196, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#EFF6FF';
                          e.currentTarget.style.color = 'var(--rey)';
                          e.currentTarget.style.borderColor = '#BFDBFE';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 4px rgba(36, 86, 196, 0.08)';
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                <span style={{ fontSize: '0.7rem', color: '#94a3b8', padding: '0 4px', marginLeft: m.sender === 'assistant' ? '36px' : '0' }}>
                  {m.time}
                </span>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--texto-2)', fontSize: '0.82rem', padding: '4px 8px' }}>
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    backgroundColor: '#0B192C',
                    border: '1px solid #38bdf8',
                    flexShrink: 0
                  }}
                >
                  <img
                    src="/images/asistente-hupac.jpg"
                    alt="Asistente"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.25)' }}
                  />
                </div>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--rey)', animation: 'pulse 1s infinite' }} />
                El Asistente Hupac está escribiendo...
              </div>
            )}

            {/* Preguntas rápidas de sugerencia (solo visibles si hay 1 o 2 mensajes) */}
            {messages.length <= 2 && (
              <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Consultas Frecuentes
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {QUICK_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(q)}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        borderRadius: '100px',
                        padding: '6px 12px',
                        fontSize: '0.78rem',
                        fontWeight: 650,
                        color: 'var(--marino)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input y botón enviar */}
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: '#ffffff',
              borderTop: '1px solid var(--linea)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu duda sobre uniformes, EPP o calzado..."
              style={{
                flex: 1,
                padding: '11px 16px',
                borderRadius: '100px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.86rem',
                outline: 'none',
                fontFamily: 'var(--sans)',
                color: 'var(--marino)'
              }}
            />

            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              aria-label="Enviar mensaje"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: inputMessage.trim() ? 'var(--rey)' : '#e2e8f0',
                color: inputMessage.trim() ? '#ffffff' : '#94a3b8',
                border: 'none',
                cursor: inputMessage.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
                flexShrink: 0
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
