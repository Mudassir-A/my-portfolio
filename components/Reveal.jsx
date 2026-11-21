// Render résumé content statically. The shared observer enhances it after load.
export default function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag className={`rv ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
