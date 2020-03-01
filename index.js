const visit = require('unist-util-visit')
const path = require('path')
const fs = require('fs')

const fetchImage = url => {
  return fs.readFileSync(path.join(__dirname, '../..', `/public${url}`), 'utf8')
}

module.exports = ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, 'image', (node) => {
    const { url, alt, title } = node

    if (url.endsWith('.svg')) {
      let html = fetchImage(url)

      if (pluginOptions.colors) {
        Object.entries(pluginOptions.colors).forEach(([color, replacement]) => {
          const re = new RegExp(color, 'g')
          html = html.replace(re, replacement)
        })
      }

      const svgAttrsRe = new RegExp(/<svg(.*)>/)
      const [, svgAttrs] = html.match(svgAttrsRe)
      if (alt) html = html
        .replace(/<title>.*<\/title>/, `<title>${alt}</title>`)
        .replace(svgAttrs, `${svgAttrs} role="img"`)

      if (html) {
        node.type = 'html'
        node.value = `<figure>
          ${html.trim()}
          ${title ? `<figcaption>${title}</figcaption>` : ''}
        </figure>`
      }
    }
  })

  return markdownAST
}
