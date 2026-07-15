export interface FeatureCardProps {
  marker: string;
  title: string;
  description: string;
  status: string;
}

export function FeatureCard({
  marker,
  title,
  description,
  status,
}: FeatureCardProps) {
  return (
    <article className="ui.feature.card">
      <div className="ui.feature.meta">
        <span>{marker}</span>
        <span>{status}</span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
