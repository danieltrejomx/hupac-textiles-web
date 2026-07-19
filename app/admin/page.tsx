'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

type Order = {
  id: string;
  prenda: string;
  color: string;
  tecnica: string;
  posicion: string;
  tamaño: number;
  logoIncluido: boolean;
  fecha: any;
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, 'orders'), orderBy('fecha', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedOrders: Order[] = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push({ id: doc.id, ...doc.data() } as Order);
        });
        setOrders(fetchedOrders);
      } catch (err: any) {
        console.error("Error fetching orders:", err);
        setError('No se pudieron cargar los pedidos. ¿Configuraste correctamente las credenciales de Firebase y las reglas de seguridad?');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'var(--fuente-cuerpo)', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontFamily: 'var(--fuente-titulos)', color: 'var(--marino)', fontSize: '2rem' }}>Panel de Pedidos</h1>
          <Link href="/" style={{ color: 'var(--rey)', textDecoration: 'none', fontWeight: 'bold' }}>&larr; Volver al sitio</Link>
        </div>

        {error && (
          <div style={{ padding: '16px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        {loading ? (
          <p>Cargando pedidos...</p>
        ) : (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #e2e8f0' }}>
                <tr>
                  <th style={{ padding: '16px' }}>Fecha</th>
                  <th style={{ padding: '16px' }}>Prenda</th>
                  <th style={{ padding: '16px' }}>Color</th>
                  <th style={{ padding: '16px' }}>Personalización</th>
                  <th style={{ padding: '16px' }}>¿Subió Logo?</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>
                      No hay pedidos registrados aún.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '16px', color: '#475569' }}>
                        {order.fecha?.toDate ? order.fecha.toDate().toLocaleString() : 'Reciente'}
                      </td>
                      <td style={{ padding: '16px', fontWeight: 'bold', color: 'var(--marino)' }}>{order.prenda}</td>
                      <td style={{ padding: '16px' }}>{order.color}</td>
                      <td style={{ padding: '16px' }}>
                        {order.tecnica} ({order.posicion})<br/>
                        <span style={{ fontSize: '0.85em', color: '#64748b' }}>Tamaño: {order.tamaño}%</span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        {order.logoIncluido ? <span style={{ color: '#16a34a' }}>Sí ✓</span> : <span style={{ color: '#dc2626' }}>No ✗</span>}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
