import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Heading as="h1" className="hero__title">
              {siteConfig.title}
            </Heading>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--lg"
                to="/docs/intro">
                🚀 Get Started
              </Link>
              <Link
                className="button button--outline button--secondary button--lg"
                to="/docs/COMPREHENSIVE_PROJECT_DOCUMENTATION">
                📖 View Architecture
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.flutterLogo}>
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <path d="M50 0L100 50L75 75L25 25L50 0Z" fill="#54C5F8" />
                <path d="M25 75L50 50L75 75L50 100L25 75Z" fill="#01579B" />
                <path d="M50 50L75 25L100 50L75 75L50 50Z" fill="#29B6F6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Flutter E-commerce Documentation`}
      description="Comprehensive documentation for Anudha Mart Flutter e-commerce application with architecture, features, and development guides.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
