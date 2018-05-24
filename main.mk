# main.mk

# This makefile will create a buildable distribution under the 'dist' directory
# that can be deployed to a server.

WEBPACK = ./node_modules/.bin/webpack
dist_path = dist

# webpack now creates the dist folder automatically
dist: bundle.js
	cp -a index.html static $(dist_path)

.PHONY: dist

bundle.js: src
	$(WEBPACK) --mode production

