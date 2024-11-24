import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../create.css";

const CreatePage = () => {
    const [name, setName] = useState("");
    const [color, setColor] = useState("red");
    const [type, setType] = useState("gremlin");
    const [message, setMessage] = useState(""); // Estado para el mensaje de éxito o error
    const navigate = useNavigate();

    const handleCreate = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:8080/pets/create",
                { name, color, type },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessage("Gremlin created successfully!"); // Mensaje de éxito
            setTimeout(() => {
                navigate("/pets"); // Redirige a /pets tras 1.5s
            }, 1500);
        } catch (error) {
            setMessage("Failure at creating the gremlin."); // Mensaje de error
        }
    };

    return (
        <div className="create-container">
               <div className="create-card">
                   <h1 className="create-title">Create a New Gremlin</h1>

                   {/* Campo Name */}
                   <div className="form-group">
                       <label className="form-label" htmlFor="name">Name</label>
                       <input
                           id="name"
                           type="text"
                           placeholder="Enter gremlin's name"
                           className="form-input"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                       />
                   </div>

                   {/* Campo Color */}
                   <div className="form-group">
                       <label className="form-label" htmlFor="color">Color</label>
                       <select
                           id="color"
                           className="form-select"
                           value={color}
                           onChange={(e) => setColor(e.target.value)}
                       >
                           <option value="red">Red</option>
                           <option value="green">Green</option>
                           <option value="brown">Brown</option>
                           <option value="purple">Purple</option>
                       </select>
                   </div>

                   {/* Campo Type */}
                   <div className="form-group">
                       <label className="form-label" htmlFor="type">Type</label>
                       <select
                           id="type"
                           className="form-select"
                           value={type}
                           onChange={(e) => setType(e.target.value)}
                       >
                           <option value="mogwai">Mogwai</option>
                           <option value="gremlin">Gremlin</option>
                       </select>
                   </div>

                   {/* Botón Create */}
                   <button onClick={handleCreate} className="create-button">
                       Create
                   </button>

                   {/* Mensaje dinámico */}
                   {message && <p className="create-message">{message}</p>}
               </div>
           </div>
       );
};

export default CreatePage;