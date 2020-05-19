```bash
yarn workspace client build

cp -r packages/client/public packages/coc-swagger/

yarn workspace coc-swagger build
ls packages/coc-swagger/lib

cd packages/coc-swagger
npm publish --access public
```
