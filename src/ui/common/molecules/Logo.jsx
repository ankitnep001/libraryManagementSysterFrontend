import { Link } from 'react-router-dom';
import { image } from '../../../config/constant/image';

const Logo = ({ height = 'h-10', width = 'w-10', className = '' }) => {
    return (
        <Link to='/home' className={`${height} ${width} ${className}`}>
            <img
                src={image.logo}
                alt="Logo"
                className={`${height} ${width} object-contain`}
            />
        </Link>
    );
};

export default Logo;