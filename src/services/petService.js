import axios from "axios";

export const fetchPets = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/pets", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            alert("Not authorized. Please, login again.");
            localStorage.removeItem("token");
            window.location.href = "/login";
        } else {
            console.error("Failed to get the pets:", error.response || error.message);
            throw error;
        }
    }
};