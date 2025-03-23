export type UserSchema = {
    name: string;
    email: string;
};

export type UserContextType = {
    user: UserSchema | null;
    setUser: React.Dispatch<React.SetStateAction<UserSchema | null>>;
};