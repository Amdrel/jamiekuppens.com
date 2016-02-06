+++
date = "2016-02-05T18:10:11-08:00"
draft = true
title = "Dependency Management in Go 1.6 is No Longer Painful"
slug = "dependency-management-in-go-is-no-longer-painful"
description = ""
+++

Traditionally, Go has handled dependencies by installing them all in the same directory under
`$GOPATH`. This works fine if you're working on a small application you do not care too much about;
but if the project is large or has lots of developers, version locking dependencies becomes a
must.

### The Problem

Version locking dependencies is typically not too much of a problem for most of the more popular
languages; however since Go used to keep all dependencies in one area, you could not have more than
one version of the same dependency installed. How the community got around this limitation was to
abuse go subpackages to store your dependencies using tools like
[Godep](https://github.com/tools/godep). The problem with this approach is that you end up with
ridiculously long import paths that are a pain to write and make vim scream.

{{< highlight go >}}
package main

import (
	"html/template"
	"net/http"

	// Beautiful imports.
	"github.com/reshurum/really-long-app-name/Godeps/_workspace/src/github.com/gorilla/mux"
	"github.com/reshurum/really-long-app-name/Godeps/_workspace/src/github.com/gorilla/sessions"
	"github.com/reshurum/really-long-app-name/Godeps/_workspace/src/github.com/jinzhu/gorm"
)

func main() {
	...
}
{{< /highlight >}}

## The Solution

With the release of Go 1.5, an experimental environment variable called `GO15VENDOREXPERIMENT` was
added to solve all these problems. The only problem with is it's not enabled by default so you
have to make it clear to contributors it's required.
