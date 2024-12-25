BUNDLE = "bundle.tar.gz"

all: build

$(BUNDLE): build
	tar -zcf $(BUNDLE) public/

.PHONY build bundle serve:

build:
	hugo --theme=poison

serve:
	hugo server --theme=poison --buildDrafts -w

bundle: $(BUNDLE)
