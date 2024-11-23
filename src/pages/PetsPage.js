import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchPets } from "../services/petService";
import { Link } from "react-router-dom";
import GremlinImage from "../components/GremlinImage";
import "../petsPage.css";
import { useNavigate } from "react-router-dom";

const PetsPage = () => {
    const [pets, setPets] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadPets = async () => {
            try {
                const token = localStorage.getItem("token"); // Recuperar el token de localStorage
                const response = await axios.get("http://localhost:8080/pets", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado
                    },
                });
                console.log("Pet objects loaded:", response.data);
                setPets(response.data);
            } catch (err) {
                setError("Gremlins cannot be loaded.");
            }
        };

        loadPets();
    }, []);

     const handleCreate = () => {
            navigate('/create');
        };

    if (error) {
        return <div>{error}</div>;
    }

    return (
            <div className="pets-container">
                {pets.length === 0 ? (
                    <div className="no-gremlins-card">
                        <p className="no-gremlins-text">No gremlins yet</p>
                        <p className="no-gremlins-text">Create one!</p>
                        <button onClick={handleCreate} className="create-button">
                            Create Gremlin
                        </button>
                    </div>
                ) : (
                    <div className="pets-grid">
                        {pets.map((pet) => (
                            <div className="pet-card" key={pet.petId}>
                                <Link to={`/pets/${pet.petId}`}>
                                    <GremlinImage
                                        mood="happy"
                                        type={pet.type.toLowerCase()}
                                        color={pet.color.toLowerCase()}
                                        className="pet-image"
                                    />
                                    <p className="pet-name">{pet.name}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };
export default PetsPage;