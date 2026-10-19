export default function Section({ id, tag, title, subtitle, className = "", children }) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      <div className="section__inner">
        {(tag || title || subtitle) && (
          <div className="section__header">
            {tag && <span className="section__tag">{tag}</span>}
            {title && <h2 className="section__title">{title}</h2>}
            {subtitle && <p className="section__subtitle">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
