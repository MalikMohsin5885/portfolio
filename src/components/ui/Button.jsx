const Button = ({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  ...props
}) => {
  const base = variant === "secondary" ? "btn-secondary" : "btn-primary";
  const classes = `${base} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
