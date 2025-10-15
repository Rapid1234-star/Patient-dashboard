const PatientCard = ({ patient, onViewDetails }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{patient.name}</h3>
      </div>
      <div className="card-body">
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Contact:</strong> {patient.contact}</p>
      </div>
      <div className="card-actions">
        <button className="btn" onClick={onViewDetails}>View Details</button>
      </div>
    </div>
  )
}

export default PatientCard