import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import * as path from 'path';

import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [tsConfigPaths(), react()],
  resolve: {
    alias: {
      '/utilities': path.resolve(__dirname, 'src/utilities'),

      '/graphql/mutation': path.resolve(__dirname, 'src/graphql/mutation'),
      '/components/home/upcoming-events': path.resolve(__dirname, 'src/components/home/upcoming-events'),
      '/components/home/deals-chart': path.resolve(__dirname, 'src/components/home/deals-chart'),
      '/components': path.resolve(__dirname, 'src/components'),
      '/graphql/queries': path.resolve(__dirname, 'src/graphql/queries'),
      '/constants': path.resolve(__dirname, 'src/constants'),





    },
  },
});
