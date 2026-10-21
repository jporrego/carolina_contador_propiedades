import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  deployment: { appId: 'eqeg3rrwpvpqfo4a1hz16ymg' },
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
});
