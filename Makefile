BUNDLE = "bundle.tar.gz"

all: build serve

$(BUNDLE): build
	tar -zcf $(BUNDLE) public/

.PHONY build bundle:

build:
	hugo --theme=billboard

serve:
	hugo server --theme=billboard --buildDrafts -w

bundle: $(BUNDLE)
