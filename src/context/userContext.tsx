import  { createContext, ReactNode, useContext, useState } from 'react';
import {UserContextType , UserSchema} from "../../utils/types"

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserContextProviderProps = {
    children: ReactNode;
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [user, setUser] = useState<UserSchema | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserContextProvider');
    }
    return context;
};