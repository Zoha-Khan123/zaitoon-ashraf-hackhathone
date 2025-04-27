import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { db } from '../../Firebase/firebaseConfig';
import { toast } from 'react-toastify';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Drag Type constant
const ItemType = {
  TASK: 'task',
};

const TaskCard = ({ task, onDelete, onEdit }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.TASK,
    item: task,   // POORA task pass karo id nahi sirf
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="bg-white p-3 rounded shadow-xs border border-gray-200 cursor-move"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h3 className="font-medium text-black">{task.title}</h3>
      <p className="text-gray-600 text-sm mt-1">{task.description}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-xs px-2 py-1 bg-gray-100 rounded">{task.selectStatus || 'Todo'}</span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const Column = ({ title, status, tasks, onDropTask, children }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType.TASK,
    drop: (item) => {
      if (item.selectStatus !== status) {  // Sirf jab different ho tabhi update karo
        onDropTask(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`bg-gray-50 p-4 rounded-lg border border-gray-200 ${isOver ? 'bg-gray-100' : ''} min-h-[300px]`}
    >
      <h2 className="text-lg font-semibold text-black mb-4 pb-2 border-b border-gray-300">
        {title} ({tasks.length})
      </h2>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};

const ShowData = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const tasks = [];
      const localuserId = localStorage.getItem("userId");
      const q = query(collection(db, "tasks"), where("userId", "==", localuserId));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((docSnap) => {
        tasks.push({ id: docSnap.id, ...docSnap.data() });
      });

      setData(tasks);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete task
  const handleDelete = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      setData((prevData) => prevData.filter((task) => task.id !== taskId));
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task: ", error);
      toast.error("Failed to delete task");
    }
  };

  // Edit task
  const handleEdit = (task) => {
    navigate('/add', { state: { taskToEdit: task } });
  };

  // Update task status after drop
  const handleDropTask = async (taskId, newStatus) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, { selectStatus: newStatus });

      // Local state update
      setData((prevData) =>
        prevData.map((task) =>
          task.id === taskId ? { ...task, selectStatus: newStatus } : task
        )
      );

      toast.success("Task moved successfully!");
    } catch (error) {
      console.error("Error updating task status: ", error);
      toast.error("Failed to update task status");
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-white p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-6 md:mb-8">Task Management</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 w-full">
          {/* Todo Column */}
          <Column
            title="Todo"
            status="Todo"
            tasks={data.filter((task) => task.selectStatus === 'Todo' || !task.selectStatus)}
            onDropTask={handleDropTask}
          >
            {data.filter((task) => task.selectStatus === 'Todo' || !task.selectStatus).map((task) => (
              <TaskCard key={task.id} task={task} onDelete={handleDelete} onEdit={handleEdit} />
            ))}
          </Column>

          {/* In Progress Column */}
          <Column
            title="In Progress"
            status="In Progress"
            tasks={data.filter((task) => task.selectStatus === 'In Progress')}
            onDropTask={handleDropTask}
          >
            {data.filter((task) => task.selectStatus === 'In Progress').map((task) => (
              <TaskCard key={task.id} task={task} onDelete={handleDelete} onEdit={handleEdit} />
            ))}
          </Column>

          {/* Done Column */}
          <Column
            title="Done"
            status="Done"
            tasks={data.filter((task) => task.selectStatus === 'Done')}
            onDropTask={handleDropTask}
          >
            {data.filter((task) => task.selectStatus === 'Done').map((task) => (
              <TaskCard key={task.id} task={task} onDelete={handleDelete} onEdit={handleEdit} />
            ))}
          </Column>
        </div>
      </div>
    </DndProvider>
  );
};

export default ShowData;
