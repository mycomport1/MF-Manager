// ClientsContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ClientsContext = createContext();

export const useClients = () => useContext(ClientsContext);

export const ClientsProvider = ({ children }) => {
    const [clients, setClients] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchClients = async () => {
            setIsLoading(true);
            try {
                const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
                const response = await axios.get(`${BACKEND_URL}/clients`);
                setClients(response.data);
            } catch (error) {
                console.error("Failed to fetch clients:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchClients();
    }, []);

    return (
        <ClientsContext.Provider value={{ clients, isLoading }}>
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
    const { clients, isLoading } = useClients();

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
```

```jsx
// App.js or similar
import React from 'react';
import { ClientsProvider } from './ClientsContext';
import ClientList from './ClientList';

function App() {
  return (
    <ClientsProvider>
      <div className="App">
        <ClientList />
      </div>
    </ClientsProvider>
  );
}

export default App;