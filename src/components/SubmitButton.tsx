import React from "react";

interface SubmitButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      Submit Quiz
    </button>
  );
};

export default SubmitButton;