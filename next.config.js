const toc = require('remark-toc');
const slug = require('remark-slug');

const withMDX = require('@next/mdx')({
  options: {
    remarkPlugins: [slug, toc],
    rehypePlugins: [],
  },
});
module.exports = withMDX();

// next.config.js
// const withMDX = require('@next/mdx')({
//   extension: /\.mdx?$/,
// })
// module.exports = withMDX({
//   pageExtensions: ['js', 'jsx', 'mdx'],
// })
