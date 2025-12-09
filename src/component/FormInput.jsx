import React from "react";

function FormInput({
  id,
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  onBlur,
  error
}) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
      </label>

      <input 
        id={id}
        type={type}
        className={`form-input ${error ? "form-input--error" : ""}`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />

      {error && <p className="form-error">{error}</p>}
    </div>
  )
}

export default FormInput;