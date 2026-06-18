export default function ContactHeader() {
  return (
    <header className="contact-header">
      <p className="section-eyebrow">Find Us</p>
      <h2 className="section-title">Come to the Table</h2>
      <div className="section-rule" />

      <style jsx>{`
        .contact-header {
          text-align: center;
          margin-bottom: 52px;
        }
      `}</style>
    </header>
  );
}