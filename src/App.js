import './App.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { auth } from './firebaseConfig.js';
import { useNavigate } from 'react-router-dom';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newValue, setNewValue] = useState("");
  const [newTask, setNewTask] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/Login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
    console.log("Loaded tasks:", savedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const createTask = () => {
    if (newTask.trim() !== "") {
      const task = {
        id: Date.now(),
        value: newTask,
      };
      setTasks([...tasks, task]);
      setNewTask("");
    } else {
      alert("Task is empty");
    }
  };

  const taskItems = tasks.map((task) => (
    <li key={task.id}>
      {editId === task.id ? (
        <>
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <button className="save-button" onClick={() => handleSave(task.id)}>
            Save
          </button>
        </>
      ) : (
        <>
          <span className="task-text">{task.value}</span>
          <div className="task-actions">
            <button className="edit-button" onClick={() => handleEditClick(task.id)}>
              Edit <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button className="delete-button" onClick={() => deleteTask(task.id)}>
              Delete <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </>
      )}
    </li>
  ));

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleEditClick = (id) => {
    setEditId(id);
    setNewValue(tasks.find((task) => task.id === id).value);
  };

  const handleSave = (id) => {
    editTask(id, newValue);
    setEditId(null);
  };

  const editTask = (id, newValue) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, value: newValue } : task
      )
    );
  };

  return (
    <div className="container">
      <h1>Tasks for the Week <FontAwesomeIcon icon={faList} /></h1>
      <div className="add-task-container">
        <input
          type="text"
          value={newTask}
          onChange={handleNewTaskChange}
          placeholder="Enter a task"
        />
        <button onClick={createTask}>
          Add Task <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <ul>{taskItems}</ul>
    </div>
  );
}

export default App;
