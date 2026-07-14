import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface MainModel {
  _id: string;
  customerId: string;
  restaurantId: string;
  menuItemIds: string[];
  total: number;
  status: string;
}

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [items, setItems] = useState<MainModel[]>([]);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [error, setError] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [menuItemIds, setMenuItemIds] = useState('');
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('');

  const authHeaders = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  };

  useEffect(() => { if (token) fetchItems(); }, [token]);

  const fetchItems = async () => {
    const res = await fetch(`${API_URL}/api/orders`, {
      method: 'GET', headers: authHeaders
    });
    const data = await res.json();
    if (res.ok) setItems(data);
    else setError(data.message || 'Failed to fetch items');
  };

  const handleLogin = async () => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail, password: loginPassword })
    });
    const data = await res.json();
    if (res.ok) { localStorage.setItem('token', data.token); setToken(data.token); setError(''); }
    else setError(data.message || 'Login failed');
  };

  const handleRegister = async () => {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: registerEmail, password: registerPassword })
    });
    const data = await res.json();
    if (res.ok) { localStorage.setItem('token', data.token); setToken(data.token); setError(''); }
    else setError(data.message || 'Register failed');
  };

  const handleLogout = () => { localStorage.removeItem('token'); setToken(null); setItems([]); };

  const handleCreate = async () => {
    const res = await fetch(`${API_URL}/api/orders`, {
      method: 'POST', headers: authHeaders,
      body: JSON.stringify({ customerId, restaurantId, menuItemIds: [menuItemIds], total, status })
    });
    const data = await res.json();
    if (res.ok) fetchItems();
    else setError(data.message || 'Failed to create item');
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`${API_URL}/api/orders/${id}`, {
      method: 'DELETE', headers: authHeaders
    });
    if (res.ok) fetchItems();
    else setError(data.message || 'Failed to delete item');
  };

  if (!token) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-white text-center mb-1">Sistema de gestión de pedidos de delivery</h1>
        <p className="text-slate-400 text-sm text-center mb-6">Sign in or create an account</p>
        {error && <p className="text-red-400 text-sm text-center mb-4 bg-red-900/20 border border-red-800 rounded-lg p-2">{error}</p>}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-200 mb-3 pb-2 border-b border-slate-700">Login</h2>
            <div className="flex flex-col gap-3">
              <input className="bg-slate-700 border border-slate-600 text-slate-200 placeholder-slate-400 rounded-lg px-4 py-2.5 w-full outline-none focus:border-blue-500 transition-all" type="email" placeholder="Email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
              <input className="bg-slate-700 border border-slate-600 text-slate-200 placeholder-slate-400 rounded-lg px-4 py-2.5 w-full outline-none focus:border-blue-500 transition-all" type="password" placeholder="Password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2.5 rounded-lg transition-all w-full" onClick={handleLogin}>Login</button>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-200 mb-3 pb-2 border-b border-slate-700">Register</h2>
            <div className="flex flex-col gap-3">
              <input className="bg-slate-700 border border-slate-600 text-slate-200 placeholder-slate-400 rounded-lg px-4 py-2.5 w-full outline-none focus:border-blue-500 transition-all" type="email" placeholder="Email" value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} />
              <input className="bg-slate-700 border border-slate-600 text-slate-200 placeholder-slate-400 rounded-lg px-4 py-2.5 w-full outline-none focus:border-blue-500 transition-all" type="password" placeholder="Password" value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} />
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2.5 rounded-lg transition-all w-full" onClick={handleRegister}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <nav className="bg-slate-800 border border-slate-700 rounded-xl px-6 py-4 flex items-center justify-between mb-6 shadow-lg">
        <h1 className="text-xl font-bold text-white">Sistema de gestión de pedidos de delivery</h1>
        <button className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium px-4 py-2 rounded-lg transition-all" onClick={handleLogout}>Logout</button>
      </nav>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg mb-6">
        <h2 className="text-lg font-bold text-white mb-4 pb-3 border-b border-slate-700">Create New</h2>
        <div className="flex flex-wrap gap-3 items-end">
          <input className="bg-slate-700 border border-slate-600 text-slate-200 placeholder-slate-400 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-all" type="text" placeholder="Customer ID" value={customerId} onChange={e => setCustomerId(e.target.value)} />
          <input className="bg-slate-700 border border-slate-600 text-slate-200 placeholder-slate-400 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-all" type="text" placeholder="Restaurant ID" value={restaurantId} onChange={e => setRestaurantId(e.target.value)} />
          <input className="bg-slate-700 border border-slate-600 text-slate-200 placeholder-slate-400 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-all" type="text" placeholder="Menu Item IDs" value={menuItemIds} onChange={e => setMenuItemIds(e.target.value)} />
          <input className="bg-slate-700 border border-slate-600 text-slate-200 placeholder-slate-400 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-all" type="number" placeholder="Total" value={total} onChange={e => setTotal(Number(e.target.value))} />
          <input className="bg-slate-700 border border-slate-600 text-slate-200 placeholder-slate-400 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 transition-all" type="text" placeholder="Status" value={status} onChange={e => setStatus(e.target.value)} />
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2.5 rounded-lg transition-all" onClick={handleCreate}>Create</button>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700">
          <h2 className="text-lg font-bold text-white">Items</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-slate-300">
            <thead className="bg-slate-700 text-slate-200 text-xs uppercase">
              <tr>
                <th className="px-6 py-3 text-left">Customer ID</th>
                <th className="px-6 py-3 text-left">Restaurant ID</th>
                <th className="px-6 py-3 text-left">Menu Item IDs</th>
                <th className="px-6 py-3 text-left">Total</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id} className="border-b border-slate-700 hover:bg-slate-750 transition-colors">
                  <td className="px-6 py-4">{item.customerId}</td>
                  <td className="px-6 py-4">{item.restaurantId}</td>
                  <td className="px-6 py-4">{item.menuItemIds.join(', ')}</td>
                  <td className="px-6 py-4">{item.total}</td>
                  <td className="px-6 py-4">{item.status}</td>
                  <td className="px-6 py-4">
                    <button className="bg-red-600 hover:bg-red-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-all" onClick={() => handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}