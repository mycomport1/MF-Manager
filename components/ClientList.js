// ClientsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ClientsContext = createContext();

export const useClients = () => useContext(ClientsContext);

export const ClientsProvider = ({ children }) => {
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // Added state to store error information

    useEffect(() => {
        const fetchClients = async () => {
            setIsLoading(true);
            try {
                const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
                const response = await axios.get(`${BACKEND_URL}/clients`);
                setClients(response.data);
            } catch (error) {
                console.error("Failed to fetch clients:", error);
                setError(error); // Storing error to display or use later
            } finally {
                setIsLoading(false);
            }
        };
        fetchClients();
    }, []);

    // Passing the error state through the context
    return (
        <ClientsContext.Provider value={{ clients, isLoading, error }}>
            {children}
        </ClientsContext.Provider>
    );
};
```
```jsx
// ClientList.js
import React from 'react';
import { useClients } from './ClientsContext';

function ClientList() {
    const { clients, isLoading, error } = useClients();

    return (
        <div>
            <h2>Client List</h2>
            {isLoading ? (
                <p>Loading clients...</p>
            ) : error ? ( // Handling error display
                <p>Could not load clients: {error.message}</p>
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