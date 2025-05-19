import { Outlet } from 'react-router-dom';
import { useRequireAuth } from '../../../hooks/useRequireAuth';

const AdminTemplate = () => {
    useRequireAuth(['ADMIN']); // only 'admin' role allowed

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AdminTemplate
