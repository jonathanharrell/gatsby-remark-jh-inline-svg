# `gatsby-remark-jh-inline-svg`

This plugin is designed for use with the [gatsby-plugin-mdx](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx).

First, install via NPM:

```sh
npm install gatsby-remark-jh-inline-svg
```

Then add to `gatsby-config.js`:

```js
module.exports = {
    plugins: [
        {
            resolve: 'gatsby-plugin-mdx',
            options: {
                gatsbyRemarkPlugins: [
                    {
                        resolve: 'gatsby-remark-jh-inline-svg',
                        options: {
                            colors: {
                                '#fafafa': 'var(--myColor)'
                            }
                        }
                    }
                ]
            }
        }
    ]
}
```
