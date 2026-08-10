import AnimatedSection from '../components/AnimatedSection';
import CertificateCard from '../components/CertificateCard';
import { CERTIFICATIONS } from '../data/portfolioData';

export default function Certificates() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <AnimatedSection className="text-center mb-12">
        <h2 className="text-4xl font-extrabold relative inline-block mb-4 after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-gradient-to-r after:from-primary after:to-secondary after:rounded-full">
          Certificates
        </h2>
        <p className="text-lg text-text-muted dark:text-text-darkMuted mt-4">Proof of my learning, skills, and achievements.</p>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CERTIFICATIONS.map((cert, index) => (
          <AnimatedSection key={index} delay={index * 0.1}>
            <CertificateCard {...cert} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
