import React, { useState } from 'react';
import { IoIosEyeOff, IoMdEye } from 'react-icons/io';

const InputField = React.forwardRef(({
    name,
    type = 'text',
    placeholder = '',
    autocomplete = 'off',
    disabled = false,
    onChange,
    ...rest
}, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(prev => !prev);

    const isPasswordField = type === 'password';
    const inputType = isPasswordField && showPassword ? 'text' : type;

    return (
        <div className="relative">
            <input
                ref={ref}
                name={name}
                type={inputType}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                autoComplete={autocomplete}
                onChange={onChange}
                {...rest}
                className={`font-poppins w-full text-sm mb-2 pl-10 pr-10 py-2 border-2 border-[#e3e7ea] rounded-md focus:outline-none ${disabled ? 'cursor-not-allowed bg-gray-100' : ''
                    }`}
            />
            {isPasswordField && (
                <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-3 top-[12px] text-[#5b3423] focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? <IoMdEye size={18} /> : <IoIosEyeOff size={18} />}
                </button>
            )}
        </div>
    );
});

export default InputField;
