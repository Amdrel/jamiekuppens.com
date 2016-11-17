+++
date = "2016-11-17T11:17:59-08:00"
draft = true
title = "Introduction to App Engine Flexible"
description = "Temporary description, please replace."
image = "/post/introduction-to-app-engine-flexible/google-cloud-console.png"
imagewidth = "1920"
imageheight = "1200"
hero = true
herocolor = "#FFF"
+++

App Engine is a service by Google that provides hosting for web applications. Depending on how much
traffic your application receives, App Engine will dynamically allocate resources to your
infrastructure.  App Engine has historically been somewhat limited in functionality when it comes to
language support and control over your infrastructure; however this has changed with the advent of
[App Engine Flexible Environment](https://cloud.google.com/appengine/docs/flexible/) which is more
resemblant to services like [Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/).

<!--more-->

## Some History on App Engine

App Engine supports two different environments to run your application under, the Standard
Environment and the Flexible Environment. Since App Engine's incpetion, the default and only
environment was the standard environment. App Engine Standard has one killer feature, it is able to
scale up additional infrastructure in **_milliseconds_** which was unheard of at the time. However
to achive this, appications must be run in a very contrained environment with very little to no
customization by the developers.

One of the largest limitations is you cannot use libraries/code utilizing native code. This made the
Python environment very limited as a very large number of Python libraries utilize CFFI to run
performance critial and shared code (some libraries are written in C with bindings to other
languages).

Here is a quick rundown of some pros and cons of App Engine Standard:

### Pros

* Infrastructure scales almost instantly
* Pricing is very cheap
* Includes a generous free tier

### Cons

* Cannot run native code over FFI (C/C++)
* Can only open TCP sockets to supported services (Cloud SQL)
* Threads are not run in parallel (IO excluded)
* Limited language support (Python 2, Java 8, PHP 5, Go 1.6)

## Enter the Flexible Environment
