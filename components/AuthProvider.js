import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../db';
import { getDocs, addDoc, collection } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accountData, setAccountData] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'users'));
                const tabledata = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setUsers(tabledata);
            } catch (error) {
                console.log(error);
            }
        };
        getUsers();
    }, []);

    const addUser = async (user) => {
        try {
            await addDoc(collection(db, 'users'), user);
            setUsers(prev => ([...prev, user]));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider value={{ accountData, setAccountData, users, addUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);