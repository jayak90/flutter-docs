import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Flutter Anudha Mart Docs',
  tagline: 'Comprehensive Flutter E-commerce Documentation 🚀',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://flutter-anudha-mart-docs.netlify.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'AnudhaMart', // Usually your GitHub org/user name.
  projectName: 'flutter-anudha-mart', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Removed edit URL for internal docs
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Flutter Development Blog',
          blogDescription: 'Development insights and technical updates',
          postsPerPage: 6,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Removed edit URL for internal docs
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    '@docusaurus/theme-mermaid',
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        disableInDev: false,
      },
    ],
  ],

  markdown: {
    mermaid: true,
  },

  themeConfig: {
    // Replace with your project's social card
    image: 'img/flutter-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Anudha Mart',
      logo: {
        alt: 'Flutter Logo',
        src: 'img/flutter-logo.svg',
        srcDark: 'img/flutter-logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: '📚 Documentation',
        },
        {
          type: 'docSidebar',
          sidebarId: 'architectureSidebar',
          position: 'left',
          label: '🏗️ Architecture',
        },
        {
          type: 'docSidebar',
          sidebarId: 'featuresSidebar',
          position: 'left',
          label: '✨ Features',
        },
        { to: '/blog', label: '📝 Blog', position: 'left' },
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://github.com/your-org/anudha-mart',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'Architecture',
              to: '/docs/COMPREHENSIVE_PROJECT_DOCUMENTATION',
            },
            {
              label: 'Features',
              to: '/docs/category/features',
            },
          ],
        },
        {
          title: 'Development',
          items: [
            {
              label: 'Flutter Official Docs',
              href: 'https://flutter.dev/docs',
            },
            {
              label: 'Dart Language',
              href: 'https://dart.dev/guides',
            },
            {
              label: 'BLoC Pattern',
              href: 'https://bloclibrary.dev/',
            },
          ],
        },
        {
          title: 'Community & Support',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub Issues',
              href: 'https://github.com/your-org/anudha-mart/issues',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/flutter',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Anudha Mart. Built with ❤️ using Flutter & Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['dart', 'yaml', 'json', 'bash'],
    },
    algolia: {
      // Optional: Add Algolia search
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_SEARCH_API_KEY',
      indexName: 'flutter-anudha-mart',
      // Optional: see doc section below
      contextualSearch: true,
      // Optional: Algolia search parameters
      searchParameters: {},
      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
