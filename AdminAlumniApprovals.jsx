import { useEffect, useState } from "react";

export default function AdminPendingApprovals() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/pending-approvals")
      .then(res => res.json())
      .then(data => {
        setPending(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const approveUser = async (id) => {
    await fetch(`http://localhost:5000/api/admin/approve-user/${id}`, {
      method: "PUT"
    });

    // remove approved user from UI
    setPending(prev => prev.filter(u => u._id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="page-card">
      <h2>Pending Approvals</h2>

      {pending.length === 0 && <p>No pending approvals</p>}

      {pending.map(user => (
        <div key={user._id} className="approval-card">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> {user.role}</p>

          <button onClick={() => approveUser(user._id)}>
            Approve
          </button>
        </div>
      ))}
    </div>
  );
}
