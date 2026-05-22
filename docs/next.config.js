// @ts-check
const path = require('path');
// use import-sync instead of deasync for synchronized dynamic imports, because
// deasync has a hang bug when dynamic import is used in a module which itself is
// imported from ESM instead of required from CJS, see:
// https://github.com/abbr/deasync/issues/178
const { default: importSync } = require('import-sync');

const { default: remarkSlug } = importSync('remark-slug');
const remarkPlugins = [remarkSlug];

/** @type {import('next').NextConfig} */
module.exports = {
    pageExtensions: ['tsx', 'jsx', 'md', 'mdx'],
    images: {
        disableStaticImages: true,
    },
    /** @param {import('webpack/declarations/WebpackOptions').WebpackOptions} config type from 4.46.0 */
    /** @param {import('webpack').Configuration} config type from 5.106.2 */
    webpack(config, { defaultLoaders }) {
        config.module.rules.push({
            test: /.mdx?$/,
            use: [
                defaultLoaders.babel,
                {
                    loader: '@mdx-js/loader',
                    options: {
                        remarkPlugins,
                    },
                },
                path.join(__dirname, './tools/loaders/md-loader'),
            ],
        });

        config.module.rules.push({
            test: /\.(jpe?g|png|webp)$/i,
            use: [
                {
                    loader: 'responsive-loader',
                    options: {
                        adapter: require('responsive-loader/sharp'),
                        sizes: [320, 640, 960, 1200, 1800, 2400],
                        outputPath: 'static',
                        publicPath: '_next/static',
                    },
                },
            ],
        });

        config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.(js|ts)x?$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};
