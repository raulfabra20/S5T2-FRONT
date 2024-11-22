import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GremlinPage = () => {
    const { petId } = useParams();
    const [gremlin, setGremlin] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGremlin = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:8080/pets/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setGremlin(response.data);
            } catch (err) {
                setError("No se pudo cargar el gremlin.");
            }
        };

        fetchGremlin();
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!gremlin) {
        return <div>Cargando detalles del gremlin...</div>;
    }

    return (
        <div>
            <h1>Detalles del Gremlin</h1>
            <p>Nombre: {gremlin.name}</p>
            <p>Tipo: {gremlin.type}</p>
            <p>Felicidad: {gremlin.happinessLevel}</p>
            <p>Hambre: {gremlin.hungerLevel}</p>
        </div>
    );
};

export default GremlinPage;