import React from "react";

const InputField = ({inputLabel, type}) => {
  return (
    <div className='input-field'>
      <input
        type={type}
        className="input"
        name={inputLabel}
        id={`${inputLabel}-input`}
      />
      <label for={`${inputLabel}-input`} className="input-label">
        {inputLabel}
      </label>
    </div>
  );
};

export default InputField