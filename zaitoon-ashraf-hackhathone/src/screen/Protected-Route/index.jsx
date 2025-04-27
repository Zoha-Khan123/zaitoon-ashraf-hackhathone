import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../../Firebase/firebaseConfig";
import Loader from "../../components/Loader/loader";

const ProtectedRoute = ({ children, reverse = false }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user){
        console.log(user.uid);
        localStorage.setItem("userId",user.uid)
      }
      
      
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center text-lg"><Loader/></div>;
  }

  if (reverse) {
    // reverse === true => jab login/signup pe ho aur already logged in ho
    return currentUser ? <Navigate to="/dashboard" replace /> : children;
  } else {
    // normal protected route
    return currentUser ? children : <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
