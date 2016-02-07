BUNDLE = "bundle.tar.gz"

$(BUNDLE):
	tar -zcf $(BUNDLE) public/
