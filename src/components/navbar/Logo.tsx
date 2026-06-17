import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="#home"
      style={{ textDecoration: "none" }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 17,
          fontWeight: 300,
          letterSpacing: "0.34em",
          textTransform: "uppercase" as const,
          color: "#EDE8DF",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        RASEEF 33
      </span>
      <div
        style={{
          width: 28,
          height: "0.5px",
          background: "#B89040",
          opacity: 0.55,
        }}
      />
    </Link>
  );
}