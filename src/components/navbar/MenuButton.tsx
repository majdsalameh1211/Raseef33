type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function MenuButton({ isOpen, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 8,
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "flex-end",
        gap: 5,
        position: "relative" as const,
        zIndex: 10,
      }}
    >
      <span
        style={{
          display: "block",
          width: 20,
          height: "0.5px",
          background: "#EDE8DF",
          opacity: 0.7,
          transformOrigin: "center",
          transform: isOpen ? "translateY(5.5px) rotate(45deg)" : "none",
          transition: "transform 320ms ease, opacity 200ms ease",
        }}
      />
      <span
        style={{
          display: "block",
          width: isOpen ? 0 : 13,
          height: "0.5px",
          background: "#EDE8DF",
          opacity: isOpen ? 0 : 0.7,
          transition: "width 280ms ease, opacity 240ms ease",
        }}
      />
      <span
        style={{
          display: "block",
          width: 20,
          height: "0.5px",
          background: "#EDE8DF",
          opacity: 0.7,
          transformOrigin: "center",
          transform: isOpen ? "translateY(-5.5px) rotate(-45deg)" : "none",
          transition: "transform 320ms ease, opacity 200ms ease",
        }}
      />
    </button>
  );
}