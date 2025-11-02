'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import Toast from './Toast';
import './candidates.css';

const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080';

export default function CandidatesAdmin() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'info' });
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', party: '', age: '' });
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');
  const router = useRouter();

  const token = (typeof window !== 'undefined') ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }
    // check admin profile
    fetch(`${base}/user/profile`, { 
      headers: { Authorization: `Bearer ${token}` } 
    })
      .then(r => r.json())
      .then(data => {
        if (!data.user || data.user.role !== 'admin') {
          setToast({ message: 'Admin access required', type: 'error' });
          setLoading(false);
          return;
        }
        loadCandidates();
      })
      .catch(err => {
        console.error(err);
        setToast({ message: 'Failed to fetch profile', type: 'error' });
        setLoading(false);
      });
  }, []);

  async function loadCandidates() {
    try {
      setLoading(true);

      const res = await fetch(`${base}/candidate`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error(`Failed to fetch candidates: ${res.status}`);

      const data = await res.json();
      setCandidates(data);
    } catch (e) {
      console.error("Error loading candidates:", e);
      setToast({ message: "Failed to load candidates", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  function openCreate() {
    setForm({ name: '', party: '', age: '' });
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(id) {
    const picked = candidates.find(c => c._id === id);
    if (!picked) return setToast({ message: 'Candidate not found', type: 'error' });
    setForm({ name: picked.name, party: picked.party, age: picked.age });
    setEditing(id);
    setModalOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { 
        name: form.name, 
        party: form.party, 
        age: Number(form.age) 
      };
      const url = editing 
        ? `${base}/candidate/${editing}` 
        : `${base}/candidate`;
      const method = editing ? 'PUT' : 'POST';
      const resp = await fetch(url, { 
        method, 
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        }, 
        body: JSON.stringify(payload) 
      });

      if (!resp.ok) throw new Error(await resp.text());

      setToast({ 
        message: editing ? 'Candidate updated' : 'Candidate created', 
        type: 'success' 
      });
      setModalOpen(false);
      await loadCandidates();
    } catch (err) { 
      console.error(err);
      setToast({ message: 'Save failed', type: 'error' }); 
    }
    setSaving(false);
  }

  async function handleDelete(id) {
    if (!confirm('Delete this candidate?')) return;
    try {
      const resp = await fetch(`${base}/candidate/${id}`, { 
        method: 'DELETE', 
        headers: { Authorization: `Bearer ${token}` } 
      });
      if (!resp.ok) throw new Error(await resp.text());
      setToast({ message: 'Candidate deleted', type: 'success' });
      await loadCandidates();
    } catch (err) { 
      console.error(err);
      setToast({ message: 'Delete failed', type: 'error' }); 
    }
  }

  const filtered = candidates.filter(c =>
    (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.party || '').toLowerCase().includes(search.toLowerCase())
  );

  filtered.sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name);
    if (sort === 'party') return a.party.localeCompare(b.party);
    if (sort === 'votes') return (b.voteCount || 0) - (a.voteCount || 0);
    return 0;
  });

  return (
    <div className="cand-admin container fade-in">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '' })} />

      <header className="cand-header">
        <h2>Candidate Management</h2>
        <div className="header-actions">
          <input 
            className="search" 
            placeholder="Search by name or party" 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
          />
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="name">Sort: Name</option>
            <option value="party">Sort: Party</option>
            <option value="votes">Sort: Votes</option>
          </select>
          <button className="btn primary" onClick={openCreate}>+ New Candidate</button>
        </div>
      </header>

      {loading ? (
        <div className="loading">Loading candidates...</div>
      ) : (
        <div className="cand-list">
          {filtered.length === 0 && <div className="empty">No candidates found</div>}
          {filtered.map(c => (
            <div key={c._id} className="cand-card">
              <div className="left">
                <div className="avatar">{(c.name || '')[0]}</div>
                <div className="meta">
                  <div className="name">{c.name}</div>
                  <div className="sub">{c.party} • Age {c.age}</div>
                </div>
              </div>
              <div className="right">
                <div className="votes">{c.voteCount || 0} votes</div>
                <div className="actions">
                  <button className="btn" onClick={() => openEdit(c._id)}>Edit</button>
                  <button className="btn danger" onClick={() => handleDelete(c._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal 
        open={modalOpen} 
        title={editing ? 'Edit Candidate' : 'New Candidate'} 
        onClose={() => setModalOpen(false)}
      >
        <form className="modal-form" onSubmit={handleSave}>
          <input 
            placeholder="Name" 
            value={form.name} 
            onChange={e => setForm({ ...form, name: e.target.value })} 
            required 
          />
          <input 
            placeholder="Party" 
            value={form.party} 
            onChange={e => setForm({ ...form, party: e.target.value })} 
            required 
          />
          <input 
            placeholder="Age" 
            type="number" 
            value={form.age} 
            onChange={e => setForm({ ...form, age: e.target.value })} 
            required 
          />
          <div className="modal-actions">
            <button className="btn primary" type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button type="button" className="btn" onClick={() => setModalOpen(false)}>Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
