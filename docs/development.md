## Development

```bash
# assuming you are at the project root

# install deps / you don't need to install deps for sub packages
pnpm

# start client
pnpm start

# test the client
## download a sample API yaml file
curl 'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/uspto.yaml' -o '01.api.yaml'

## by posting the API content to this endpoint
## the websocket server will send the content to it's clients
curl localhost:5173/doc -X POST --data-binary "@01.api.yaml"
```

## Build and Publish

```bash
# build
pnpm --filter=client build
pnpm --filter=coc-swagger build

# testing the plugin
ln -sf $PWD/packages/coc-swagger/lib/index.js ~/.config/nvim/coc-extensions/coc-swagger-dev.js

# publish (requires build)
ls packages/coc-swagger/lib
cd packages/coc-swagger
npm publish --access public
```
