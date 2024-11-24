import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import GremlinImage from "../components/GremlinImage";
import "../gremlin.css";

const GremlinPage = () => {
    const { petId } = useParams();
    const navigate = useNavigate();
    const [gremlin, setGremlin] = useState(null);
    const [error, setError] = useState(null);
    const [backgroundIndex, setBackgroundIndex] = useState(0); // Controla el fondo actual
    const backgrounds = [
        require("../assets/backgrounds/background-living-lightoff.png"),
        require("../assets/backgrounds/background-living-lighton.png"),
        require("../assets/backgrounds/background-room-lightoff.png"),
        require("../assets/backgrounds/background-room-lighton.png"),
    ];

    useEffect(() => {
        const fetchGremlin = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:8080/pets/${petId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setGremlin(response.data);
            } catch (err) {
                setError("Failure at loading the gremlin.");
            }
        };

        fetchGremlin();

        const interval = setInterval(() => {
                fetchGremlin(); // Llamar al backend cada minuto
            }, 60000); // Cada 60 segundos

            return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
    }, [petId]);

    const interactWithGremlin = async (action) => {
        try {
           if (action === "feed") {
                       // Simular un cambio gradual localmente
                       setGremlin((prevGremlin) => {
                           const newHungerLevel = Math.max(prevGremlin.hungerLevel - 10, 0); // Restar 10 sin bajar de 0
                           return { ...prevGremlin, hungerLevel: newHungerLevel };
                       });
                   }
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `http://localhost:8080/pets/${petId}/update`,
                { action },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setGremlin(response.data); // Actualiza el estado con la respuesta del backend
        } catch (err) {
            alert("Error interacting with the gremlin.");
        }
    };

    // Cambiar entre "living" y "room" manteniendo el estado de la luz
    const toggleBackground = () => {
        setBackgroundIndex((prevIndex) =>
            prevIndex < 2 ? prevIndex + 2 : prevIndex - 2
        );
    };

    // Cambiar el fondo a luz encendida
    const turnOnLight = () => {
        if (backgroundIndex % 2 === 0) {
            setBackgroundIndex((prevIndex) => prevIndex + 1); // Cambiar a versión con luz
        }
        interactWithGremlin("lightOn");
    };

    // Cambiar el fondo a luz apagada
    const turnOffLight = () => {
        if (backgroundIndex % 2 === 1) {
            setBackgroundIndex((prevIndex) => prevIndex - 1); // Cambiar a versión sin luz
        }
        interactWithGremlin("lightOff");
    };

    const deleteGremlin = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8080/pets/${petId}/delete`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Gremlin deleted successfully.");
            navigate("/pets");
        } catch (err) {
            alert("Failed to delete the gremlin.");
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!gremlin) {
        return <div>Loading gremlin details...</div>;
    }

    return (
        <div
            className="gremlin-page"
            style={{
                backgroundImage: `url(${backgrounds[backgroundIndex]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="gremlin-name">{gremlin.name}</div>
            <div className="gremlin-container">
                {/* Tarjeta de estados */}
                <div className="gremlin-status-card">
                    <div className="status-bar">
                        <p className="status-label">Happiness:</p>
                        <div className="bar">
                            <div
                                className="fill happiness"
                                style={{ width: `${gremlin.happinessLevel}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="status-bar">
                        <p className="status-label">Hunger:</p>
                        <div className="bar">
                            <div
                                className="fill hunger"
                                style={{ width: `${gremlin.hungerLevel}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Imagen del gremlin */}
                <div className="gremlin-image-container">
                    <GremlinImage
                        type={gremlin.type.toLowerCase()}
                        color={gremlin.color.toLowerCase()}
                        mood={gremlin.disguised ? "costume" : gremlin.happinessLevel > 50 ? "happy" : "sad"}
                    />
                </div>
            </div>

            {/* Tarjeta de botones */}
            <div className="gremlin-buttons-card">
                <div className="buttons-grid">
                       <button onClick={() => interactWithGremlin("feed")} className="action-button">
                           Feed
                       </button>
                       <button onClick={turnOnLight} className="action-button">
                           Turn On Light
                       </button>
                       <button onClick={turnOffLight} className="action-button">
                           Turn Off Light
                       </button>
                       <button onClick={() => interactWithGremlin("disguise")} className="action-button">
                           Put on Costume
                       </button>
                       <button onClick={() => interactWithGremlin("disguiseOut")} className="action-button">
                           Take Off Costume
                       </button>
                       <button onClick={toggleBackground} className="action-button">
                           Change Background
                       </button>
                       <button onClick={deleteGremlin} className="delete-button">
                           Delete
                       </button>
                   </div>
                </div>
        </div>
    );
};

export default GremlinPage;