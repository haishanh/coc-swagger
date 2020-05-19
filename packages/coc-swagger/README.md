## Install

```vim
:CocInstall coc-swagger
```

## Usage

```vim
" when you are editing a Swagger/OpenAPI specification file
:CocCommand swagger.render

" tip: add a (slightly) short command
command -nargs=0 Swagger :CocCommand swagger.render
```
