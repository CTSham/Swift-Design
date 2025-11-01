// next.config.mjs
import createMDX from '@next/mdx'

const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [import('remark-gfm')],
    },
})

/** @type {import('next').NextConfig} */
const baseConfig = {
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    experimental: {
        reactCompiler: true, // you enabled React Compiler
    },
}

export default withMDX(baseConfig)
