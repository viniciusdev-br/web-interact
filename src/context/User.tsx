import { createContext, ReactNode, useState, useContext } from "react";

interface Props {
    children: ReactNode;
}

interface UserData {
    username: string;
    maxCalls: number;
}

interface UserContextData {
    user: UserData | null;
    setUserDataContext(user: UserData | null): void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC<Props> = ({children}) => {
    const [user, setUser] = useState<UserData | null>(null);

    const setUserDataContext = (user: UserData) => {
        setUser(user);
    }

    return (
        <UserContext.Provider value={{user, setUserDataContext: setUserDataContext}}>
            {children}
        </UserContext.Provider>
    );
};

export default function useUserData() {
    const context = useContext(UserContext);
    return context;
}