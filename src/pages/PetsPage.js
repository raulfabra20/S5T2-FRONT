import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchPets } from "../services/petService";
import { Link } from "react-router-dom";

const PetsPage = () => {
    const [pets, setPets] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPets = async () => {
            try {
                const token = localStorage.getItem("token"); // Recuperar el token de localStorage
                const response = await axios.get("http://localhost:8080/pets", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
                    },
                });
                setPets(response.data);
            } catch (err) {
                setError("Gremlins cannot be loaded.");
            }
        };

        loadPets();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>My Gremlins</h1>
            {pets.length === 0 ? (
                <p>No gremlins yet. Create a new one!</p>
            ) : (
                <ul>
                    {pets.map((pet) => (
                        <li key={pet.id}>
                            <Link to={`/pets/${pet.id}`}>
                                {pet.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PetsPage;