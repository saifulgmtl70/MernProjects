import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../../Firebase/firebase.config";
import axios from "axios";




export const AuthContext = createContext({ auth: null });
// eslint-disable-next-line react-refresh/only-export-components
//  const auth = getAuth(ap);
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();



// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }



    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            // Sign in with Google using a popup window
            await signInWithPopup(auth, googleProvider);
            setLoading(false);
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            setLoading(false);
        }
    };
    

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail };
            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false);
            // if user exists then issue a token
            if (currentUser) {
                axios.post('http://localhost:5000/jwt', loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log('token response', res.data);
                    })
            }
            else {
                axios.post('http://localhost:5000/logout', loggedUser, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data);
                    })
            }
        });
        return () => {
            unSubscribe();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const authInfo = {
        auth,
        user,
        loading,
        createUser,
        signIn,
        logOut,
        signInWithGoogle
    }
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;