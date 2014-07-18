BIN:=$(shell npm bin)

readinglist:
	mkdir -p build
	node make.js < my_resources.yaml > build/readinglist.html

iframe:
	mkdir -p build
	$(BIN)/browserify -t ejsify -t browserify-data iframe.js -o build/iframe.js

