import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
  link: string;
  badge?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Comprehensive Architecture',
    icon: '🏗️',
    description: (
      <>
        Deep dive into the MVVM + BLoC architecture pattern used in Anudha Mart.
        Learn about modular design, state management, and scalable Flutter architecture.
      </>
    ),
    link: '/docs/COMPREHENSIVE_PROJECT_DOCUMENTATION',
    badge: 'Core',
  },
  {
    title: 'Authentication & KYC',
    icon: '🔐',
    description: (
      <>
        Complete implementation guide for Aadhaar verification, KYC processes,
        auto-population features, and secure authentication flows.
      </>
    ),
    link: '/docs/AUTHENTICATION_REFACTORING_SUMMARY',
    badge: 'Security',
  },
  {
    title: 'Bid Management System',
    icon: '💼',
    description: (
      <>
        Detailed documentation of the deals and bid management system with
        real-time features and business logic implementation.
      </>
    ),
    link: '/docs/Deals Feature -  Bid Management System READMD',
    badge: 'Business',
  },
  {
    title: 'Registration Flow',
    icon: '📝',
    description: (
      <>
        Progressive registration system with incomplete handling,
        step-by-step validation, and user experience optimization.
      </>
    ),
    link: '/docs/REGISTRATION_PROGRESS_IMPLEMENTATION',
    badge: 'UX',
  },
  {
    title: 'Code Refactoring',
    icon: '⚡',
    description: (
      <>
        Best practices for Flutter code refactoring, architecture improvements,
        and maintaining clean, scalable codebase.
      </>
    ),
    link: '/docs/REFACTORING_SUMMARY',
    badge: 'Quality',
  },
  {
    title: 'Development Guide',
    icon: '🚀',
    description: (
      <>
        Step-by-step tutorials, setup guides, and best practices for
        Flutter development with practical examples.
      </>
    ),
    link: '/docs/intro',
    badge: 'Learning',
  },
];

function Feature({ title, icon, description, link, badge }: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <Link to={link} className={styles.featureLink}>
        <div className={styles.featureCard}>
          {badge && <span className={`status-badge status-badge--completed`}>{badge}</span>}
          <div className={styles.featureIcon}>{icon}</div>
          <div className={styles.featureContent}>
            <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
            <p className={styles.featureDescription}>{description}</p>
          </div>
          <div className={styles.featureFooter}>
            <span className={styles.learnMore}>Learn more →</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <>
      <section className={styles.features}>
        <div className="container">
          <div className={styles.featuresHeader}>
            <Heading as="h2" className={styles.featuresTitle}>
              🎯 What You'll Find Here
            </Heading>
            <p className={styles.featuresSubtitle}>
              Comprehensive documentation covering every aspect of the Anudha Mart Flutter application
            </p>
          </div>
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.quickStart}>
        <div className="container">
          <div className={styles.quickStartContent}>
            <div className={styles.quickStartText}>
              <Heading as="h2">🚀 Quick Start</Heading>
              <p>
                Jump right into the documentation and start exploring the Flutter architecture,
                implementation details, and best practices used in Anudha Mart.
              </p>
              <div className={styles.quickStartButtons}>
                <Link
                  className="button button--primary button--lg"
                  to="/docs/intro">
                  📚 Start Reading
                </Link>
                <Link
                  className="button button--outline button--primary button--lg"
                  to="/docs/COMPREHENSIVE_PROJECT_DOCUMENTATION">
                  🔍 View Architecture
                </Link>
              </div>
            </div>
            <div className={styles.quickStartStats}>
              <div className={styles.stat}>
                <div className={styles.statNumber}>15+</div>
                <div className={styles.statLabel}>Documentation Pages</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>MVVM</div>
                <div className={styles.statLabel}>Architecture Pattern</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>BLoC</div>
                <div className={styles.statLabel}>State Management</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNumber}>Flutter</div>
                <div className={styles.statLabel}>Framework</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
