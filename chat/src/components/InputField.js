import React, { useState } from "react";

const InputField = ({ inputLabel, type, inputValue,updateInput }) => {
  const [focus, changeFocus] = useState(false);

  const handleFocus = (event)=>{
    if(event.target.value===''){
      changeFocus(!focus)
    }
  }

  const handleChange = (event)=>{
    updateInput(event.target.value)
  }

  return (
    <div className="input-field">
      <label htmlFor={`${inputLabel}-input`} className={focus? "input-label label-focus":"input-label"}>
        {inputLabel}
      </label>
      <input
        type={type}
        className="input"
        name={inputLabel}
        id={`${inputLabel}-input`}
        value={inputValue}
        onFocus={(event)=>handleFocus(event)}
        onBlur={(event)=>handleFocus(event)}
        onChange ={(event)=>handleChange(event)}
      />
    </div>
  );
};

export default InputField;
