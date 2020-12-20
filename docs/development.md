## Development

```bash
# assuming you are at the project root

# install deps / you don't need to install deps for sub packages
yarn

# start client
yarn start

# test the client
## download a sample API yaml file
curl 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/uspto.yaml' -o '01.api.yaml'

## by posting the API content to this endpoint
## the websocket server will send the content to it's clients
curl localhost:3000/doc -X POST -H "content-type: text/yaml" --data-binary "@01.api.yaml"

# install deps / examples:
yarn workspace client add react
yarn workspace client add -D webpack
yarn workspace coc-swagger add -D @vercel/ncc
```

## Build and Publish

```bash
# build
yarn workspace client build
yarn workspace coc-swagger build

# testing the plugin
ln -sf $PWD/packages/coc-swagger/lib/index.js ~/.config/nvim/coc-extensions/coc-swagger-dev.js

# publish (requires build)
ls packages/coc-swagger/lib
cd packages/coc-swagger
npm publish --access public
```
