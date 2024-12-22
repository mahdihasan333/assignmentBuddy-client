import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext)

    if(loading) {
        return <Spinner/>
    }

    if(user) {
        return children
    }

    return <Navigate to='/login' state={location.pathname} />
};

export default PrivateRoute;