import { useEffect, useMemo, useState } from 'react'
import PatientCard from '../components/PatientCard.jsx'
import Modal from '../components/Modal.jsx'

const Patients = () => {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)
        const data = await res.json()
        const mapped = data.map(u => ({
          id: u.id,
          name: u.name,
          age: 20 + (u.id * 7) % 50,
          contact: u.phone,
          email: u.email,
          address: `${u.address.street}, ${u.address.city}`,
          company: u.company?.name || ''
        }))
        setPatients(mapped)
      } catch (err) {
        setError(err.message || 'Error fetching patients')
      } finally {
        setLoading(false)
      }
    }
    fetchPatients()
  }, [])

  const filteredPatients = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return patients.filter(p => p.name.toLowerCase().includes(q))
  }, [patients, searchQuery])

  const onAddNewPatient = (newPatient) => {
    const id = patients.length ? Math.max(...patients.map(p => p.id)) + 1 : 1
    setPatients(prev => [{ ...newPatient, id }, ...prev])
    setShowAddModal(false)
  }

  return (
    <section className="patients">
      <div className="patients-header">
        <h1>Patients</h1>
        <div className="actions">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Search patients by name"
          />
          <button className="btn primary" onClick={() => setShowAddModal(true)}>
            Add New Patient
          </button>
        </div>
      </div>

      {loading && <div className="status">Loading patients...</div>}
      {error && <div className="status error">Error: {error}</div>}

      {!loading && !error && (
        <div className="grid">
          {filteredPatients.map(p => (
            <PatientCard
              key={p.id}
              patient={p}
              onViewDetails={() => setSelectedPatient(p)}
            />
          ))}
          {filteredPatients.length === 0 && (
            <div className="empty">No patients match your search.</div>
          )}
        </div>
      )}

      <Modal isOpen={!!selectedPatient} onClose={() => setSelectedPatient(null)} title="Patient Details">
        {selectedPatient && (
          <div className="details">
            <p><strong>Name:</strong> {selectedPatient.name}</p>
            <p><strong>Age:</strong> {selectedPatient.age}</p>
            <p><strong>Contact:</strong> {selectedPatient.contact}</p>
            <p><strong>Email:</strong> {selectedPatient.email}</p>
            <p><strong>Address:</strong> {selectedPatient.address}</p>
            {selectedPatient.company && <p><strong>Company:</strong> {selectedPatient.company}</p>}
          </div>
        )}
      </Modal>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Patient">
        <AddPatientForm onSubmit={onAddNewPatient} />
      </Modal>
    </section>
  )
}

const initialForm = { name: '', age: '', contact: '', email: '', address: '' }

const AddPatientForm = ({ onSubmit }) => {
  const [form, setForm] = useState(initialForm)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.age || !form.contact) return
    onSubmit({ ...form, age: Number(form.age) })
    setForm(initialForm)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" />
      </div>
      <div className="form-row">
        <label>Age</label>
        <input name="age" type="number" min="0" value={form.age} onChange={handleChange} placeholder="Age" />
      </div>
      <div className="form-row">
        <label>Contact</label>
        <input name="contact" value={form.contact} onChange={handleChange} placeholder="Phone number" />
      </div>
      <div className="form-row">
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email (optional)" />
      </div>
      <div className="form-row">
        <label>Address</label>
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address (optional)" />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn primary">Add Patient</button>
      </div>
    </form>
  )
}

export default Patients