BUNDLE = "bundle.tar.gz"

all: build

$(BUNDLE): build
	tar -zcf $(BUNDLE) public/

.PHONY build bundle serve:

build:
	hugo --theme=billboard

serve:
	hugo server --theme=billboard --buildDrafts -w

bundle: $(BUNDLE)
