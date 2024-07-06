install:
	npm ci
gendiff: 
	node bin/gendiff.js
publish:
	npm publish --dry-run
lint: 
	npx eslint .
test:
	npx jest