```bash
# assume your swagger spec is in 01.api.yaml

curl localhost:3000/doc \
  -X POST \
  -H "content-type: text/yaml" \
  --data-binary  "@01.api.yaml"
```
