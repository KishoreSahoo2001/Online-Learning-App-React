import React from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps {
  type: string;
  placeholder: string;
  ariaLabel: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  imgSrc: string;
  isPasswordField?: boolean;
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  ariaLabel,
  value,
  onChange,
  imgSrc,
  isPasswordField = false,
  showPassword,
  togglePasswordVisibility
}) => {
  return (
    <div className="input-container">
      <img id="logo" src={imgSrc} alt={ariaLabel} />
      <input
        type={isPasswordField && showPassword ? "text" : type}
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={value}
        onChange={onChange}
        required
      />
      {isPasswordField && togglePasswordVisibility && (
  <button 
    type="button" 
    className="eye-icon" 
    onClick={togglePasswordVisibility}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>
)}
    </div>
  );
};

export default InputField;