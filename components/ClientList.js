import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function ClientList() {
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchClients() {
            setIsLoading(true);
            try {
                const response = await axios.get(`${BACKEND_URL}/clients`);
                setClients(response.data);
            } catch (error) {
                console.error("Failed to fetch clients:", error);
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchClients();
    }, []);

    return (
        <div>
            <h2>Client List</h2>
            {isLoading ? (
                <p>Loading clients...</p>
            ) : (
                <ul>
                    {clients.map(client => (
                        <li key={client.id}>
                            {client.name} - {client.email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ClientList;