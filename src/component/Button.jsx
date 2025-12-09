import React from "react";

function Button({children, variant = "primary", ...props}) {
  return (
    <button
      className={`btn ${variant === "outline" ? "btn-outline" : "btn-primary"}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button