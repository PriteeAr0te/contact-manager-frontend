import { useContext } from "react"
import AuthContext from "../Context/AuthContext"

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used in AuthProvider");
    }

    const { token, user, loading, isContactCreated, setIsContactCreated, login, logout } = context;
    const isLoggedIn = !!token;

    return {token, user, loading, isContactCreated, setIsContactCreated, isLoggedIn, login, logout}
}