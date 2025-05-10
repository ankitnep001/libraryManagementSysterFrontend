import { useState } from "react";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

const InputField = ({
    name,
    type = 'text',
    placeholder = '',
    autocomplete = 'off',
    disabled = false,
    // value = '',
    onChange
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative">
            <input
                type={showPassword ? 'text' : type}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                autoComplete={autocomplete}
                // value={value}
                onChange={onChange}
                className={`font-poppins w-full text-sm mb-2 pl-10 pr-3 py-2 border-2 border-[#e3e7ea] rounded-md focus:outline-none ${disabled ? 'cursor-not-allowed' : ''
                    }`}
            />
            {type === 'password' && (
                <button
                    type="button"
                    className="absolute right-3 top-[12px] text-[#5b3423]"
                    onClick={togglePassword}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <IoMdEye /> : <IoIosEyeOff />}
                </button>
            )}
        </div>
    );
};

export default InputField;