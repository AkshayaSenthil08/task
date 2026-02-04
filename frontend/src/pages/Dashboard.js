import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [user, setUser] = useState(null);
  const [editProfile, setEditProfile] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const getProfile = async () => {
    const res = await api.get("/me");
    setUser(res.data.user);
    setName(res.data.user.name);
    setEmail(res.data.user.email);
  };

  const updateProfile = async () => {
    await api.put("/me", { name, email });
    alert("Profile updated");
    setEditProfile(false);
    getProfile();
  };

  const getTasks = async () => {
    const res = await api.get("/getTask");
    setTasks(res.data.task);
  };

  useEffect(() => {
    getTasks();
    getProfile();
  }, []);

  const createTask = async () => {
    if (!title || !desc) return alert("All fields required");
    await api.post("/newTask", { title, desc });
    setTitle("");
    setDesc("");
    getTasks();
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete task?")) return;
    await api.delete(`/deleteTask/${id}`);
    getTasks();
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setTitle(task.title);
    setDesc(task.desc);
  };

  const updateTask = async () => {
    await api.put(`/updateTask/${editId}`, { title, desc });
    setEditId(null);
    setTitle("");
    setDesc("");
    getTasks();
  };

  const logout = () => {
  const ok = window.confirm("Are you sure you want to logout?");
  if (!ok) return;

  localStorage.removeItem("token");
  alert("Logged out successfully");
  navigate("/");
};

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Dashboard</h3>
        <button className="btn btn-danger" onClick={logout}>Logout</button>
      </div>

      <div className="card mb-4 card shadow-sm p-4">
        <div className="card-body">
          <h5 className="card-title"> Profile</h5>

          {editProfile ? (
            <>
              <input
                className="form-control mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="form-control mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn btn-success me-2" onClick={updateProfile}>Save</button>
              <button className="btn btn-secondary" onClick={() => setEditProfile(false)}>Cancel</button>
            </>
          ) : (
            <>
              <p><b>Name:</b> {user?.name}</p>
              <p><b>Email:</b> {user?.email}</p>
              <button className="btn btn-primary" onClick={() => setEditProfile(true)}>
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      <div className="card mb-4 card shadow-sm p-4">
        <div className="card-body">
          <h5>{editId ? " Edit Task" : " Add Task"}</h5>

          <input
            className="form-control mb-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          {editId ? (
            <button className="btn btn-warning" onClick={updateTask}>Update</button>
          ) : (
            <button className="btn btn-success" onClick={createTask}>Add</button>
          )}
        </div>
      </div>

      <input
        className="form-control mb-3 card shadow-sm p-4"
        placeholder="Search tasks"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredTasks.map(task => (
        <div key={task._id} className="card mb-2">
          <div className="card-body">
            <h5>{task.title}</h5>
            <p>{task.desc}</p>

            <button className="btn btn-sm btn-outline-primary me-2" onClick={() => startEdit(task)}>
              Edit
            </button>
            <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
