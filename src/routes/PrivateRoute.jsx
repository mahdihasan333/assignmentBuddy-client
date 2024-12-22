import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext)

    if(user) {
        return children
    }

    return <Navigate to='/login' state={location.pathname} />
};

export default PrivateRoute;