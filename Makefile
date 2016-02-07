BUNDLE = "bundle.tar.gz"

all: build

$(BUNDLE): build
	tar -zcf $(BUNDLE) public/

.PHONY build bundle:

build:
	hugo --theme=billboard

bundle: $(BUNDLE)
