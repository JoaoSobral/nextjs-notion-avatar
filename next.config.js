/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove i18n config as it's not supported in App Router
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en', 'zh'],
  // },
  
  webpack: (config) => {
    // This was auto-installed but needs to be properly configured
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    
    // Add the plugin to the webpack config
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      })
    );
    
    return config;
  },
};

module.exports = nextConfig; 