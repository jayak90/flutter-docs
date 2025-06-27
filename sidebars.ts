import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Main documentation sidebar
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '🚀 Getting Started',
      items: [
        'tutorial-basics/create-a-document',
        'tutorial-basics/create-a-page',
        'tutorial-basics/create-a-blog-post',
        'tutorial-basics/markdown-features',
        'tutorial-basics/deploy-your-site',
        'tutorial-basics/congratulations',
      ],
    },
    {
      type: 'category',
      label: '⚙️ Advanced Configuration',
      items: [
        'tutorial-extras/manage-docs-versions',
        'tutorial-extras/translate-your-site',
      ],
    },
  ],

  // Architecture-focused sidebar
  architectureSidebar: [
    'COMPREHENSIVE_PROJECT_DOCUMENTATION',
    'ARCHITECTURE_IMPROVEMENTS',
    'ARCHITECTURE_FIXES',
    'BID_ARCHITECTURE_REFACTOR',
    'COMPANY_REGISTRATION_ARCHITECTURE',
    'REFACTORING_SUMMARY',
    'REFACTORING_DOCUMENTATION',
  ],

  // Features-focused sidebar
  featuresSidebar: [
    {
      type: 'category',
      label: '🔐 Authentication & KYC',
      items: [
        'AUTHENTICATION_REFACTORING_SUMMARY',
        'AADHAAR_VERIFICATION_IMPLEMENTATION',
        'AADHAAR_VERIFICATION_FIX',
        'KYC_AUTO_POPULATION_IMPLEMENTATION',
        'KYC_AUTO_SAVE_IMPLEMENTATION',
      ],
    },
    {
      type: 'category',
      label: '📝 Registration & Onboarding',
      items: [
        'REGISTRATION_PROGRESS_IMPLEMENTATION',
        'INCOMPLETE_REGISTRATION_HANDLING',
      ],
    },
    {
      type: 'category',
      label: '💼 Business Features',
      items: [
        'Deals Feature -  Bid Management System READMD',
      ],
    },
  ],
};

export default sidebars;
