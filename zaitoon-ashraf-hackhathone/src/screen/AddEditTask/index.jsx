import React, { useState, useEffect } from 'react';
import { doc, setDoc, collection, addDoc, updateDoc } from "firebase/firestore"; 
import { db } from '../../Firebase/firebaseConfig';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const AddEditTask = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const localuserId = localStorage.getItem("userId");
    
    const [task, setTask] = useState({
        title: "",
        description: "",
        userId: localuserId,
        selectStatus: "Todo",
    });

    // Check if we're editing an existing task
    useEffect(() => {
        if (location.state?.taskToEdit) {
            setTask(location.state.taskToEdit);
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!task.title || !task.description) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            if (task.id) {
                // Update existing task
                await updateDoc(doc(db, "tasks", task.id), {
                    title: task.title,
                    description: task.description,
                    selectStatus: task.selectStatus,
                    updatedAt: new Date(),
                });
                toast.success("Task updated successfully!");
            } else {
                // Add new task
                await addDoc(collection(db, "tasks"), {
                    ...task,
                    createdAt: new Date(),
                });
                toast.success("Task added successfully!");
            }
            
            navigate('/'); // Redirect back to tasks list
        } catch (error) {
            console.error("Error saving task: ", error);
            toast.error("Failed to save task.");
        }
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
         <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
            
           {/* Back Button with Arrow Icon */}
           <button 
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-black mb-4 transition-colors"
            >
            <FaArrowLeft className="mr-2" />
            Back
            </button>


            <h1 className="text-2xl font-bold text-black mb-6">
                {task.id ? "Edit Task" : "Create Task"}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Enter task title"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Enter task description"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 text-white bg-black rounded-md hover:bg-gray-800 transition duration-200 font-medium"
                >
                    {task.id ? "Update Task" : "Add Task"}
                </button>
            </form>
        </div>
        </div>

    );
};

export default AddEditTask;