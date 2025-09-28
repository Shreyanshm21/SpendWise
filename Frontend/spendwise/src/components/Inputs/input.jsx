import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
    const [showPassword, setShowPassword] = useState(false); // Fixed state variable name

    const toggleShowPassword = () => {
        setShowPassword(!showPassword); // Fixed function logic
    };

    return (
        <div>
            <label className="text-[13px] text-slate-800">{label}</label>

            <div className="input-box">
                <input
                    type={
                        type === "password"
                            ? showPassword
                                ? "text"
                                : "password"
                            : type
                    }
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none"
                    value={value}
                    onChange={(e) => onChange(e)}
                />

                {type === "password" && (
                    <div
                        onClick={toggleShowPassword}
                        className="cursor-pointer"
                    >
                        {showPassword ? (
                            <FaRegEye size={22} className="text-primary" />
                        ) : (
                            <FaRegEyeSlash
                                size={22}
                                className="text-slate-400"
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;
