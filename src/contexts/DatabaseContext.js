import React from "react";
import { useUser, useFirestore } from "reactfire";

const DatabaseContext = React.createContext({});

const DatabaseProvider = ({ children }) => {
    
    const user = useUser();
    const store = useFirestore;
    return (
        <DatabaseContext.Provider value={{ store, user }}>
            {children}
        </DatabaseContext.Provider>
    );
}
export { DatabaseContext, DatabaseProvider };