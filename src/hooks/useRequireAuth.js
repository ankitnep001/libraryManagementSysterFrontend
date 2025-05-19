import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRequireAuth = (allowedRoles = []) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        // Redirect if no token or invalid role
        if (!token || !allowedRoles.includes(role)) {
            navigate('/auth/login');
        }
    }, [navigate, allowedRoles]);
};
