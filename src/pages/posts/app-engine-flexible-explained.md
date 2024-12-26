---
layout: "../../layouts/post-layout.astro"
title: "App Engine Flexible Explained"
pubDate: 2016-11-18
description: "App Engine is a service by Google that provides hosting for web applications. Depending on how much traffic your application receives, App Engine will dynamically allocate resources to your infrastructure.  App Engine has historically been somewhat limited in functionality when it comes to language support and control over your infrastructure; however this has changed with the advent of App Engine Flexible Environment which is more resemblant to services like Elastic Beanstalk."
author: "Jamie Kuppens"
image:
  url: "/images/google-cloud-console.jpg"
  alt: "A screenshot of the Google Cloud console."
tags: ["development", "app-engine", "cloud"]
---

**⚠️NOTICE: This article was written several years ago and is likely out of date.**

App Engine is a service by Google that provides hosting for web applications. Depending on how much
traffic your application receives, App Engine will dynamically allocate resources to your
infrastructure.  App Engine has historically been somewhat limited in functionality when it comes to
language support and control over your infrastructure; however this has changed with the advent of
[App Engine Flexible Environment](https://cloud.google.com/appengine/docs/flexible/) which is more
resemblant to services like [Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/).

<!--more-->

## Some History on App Engine

App Engine supports two different environments to run your application under, the Standard
Environment and the Flexible Environment. Since App Engine's inception, the default and only
environment was the standard environment. App Engine Standard has one killer feature, it is able to
scale up additional infrastructure in **_milliseconds_** which was unheard of at the time. However
to achieve this, applications must be run in a very constrained environment with very little to no
customization by the developers.

One of the largest limitations is you _cannot_ use libraries/code utilizing native code. This made
the Python environment very limited as a very large number of Python libraries call C APIs to run
performance critical and shared code (some libraries are written in C with bindings to other
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
* Limited language support (Python 2, Java 7, PHP 5, Go 1.6)

## Enter the Flexible Environment

Some applications cannot work within the limited constraints of App Engine Standard, so Google Cloud
launched the Flexible Environment to resolve these issues. Flexible does not have any of the cons
mentioned earlier and has access to all App Engine services just as the standard environment does.

The flexible environment does have some caveats though. When using the flexible environment, it can
take up to a minute to provision an instance compared to App Engine's instant provisioning. There is
also no free tier and it's more expensive since you must have instances running at all times (App
Engine Standard can scale to zero instances since it scales so fast).

## Runtimes

The flexible environment supports many language runtimes out of the box. Here is a version table
taken from the [App Engine Documentation](https://cloud.google.com/appengine/docs).

| Language        | Standard Environment | Flexible Environment |
|-----------------|----------------------|----------------------|
| Python          | Python 2.7           | Python 2.7 / 3.4     |
| Java            | Java 7               | Java 8               |
| PHP             | PHP 5                | —                    |
| Go              | Go 1.6               | Go 1.7               |
| Node            | —                    | Node v6.9.1 LTS      |
| Ruby            | —                    | Ruby 2.3             |
| Custom Runtimes | —                    | Docker               |

One notable thing is that each runtime supported by the flexible environment is a Docker image. This
allows extensive customizability as you are free to modify the provided Docker images, or create
your own. For the uninitiated, Docker allows the creation of reproducible isolated environments to
run your application inside of for both testing and deployment. You don't need to worry about
messing with Docker if you plan on using any of the already supported runtimes.

## Support

At the moment, the flexible environment is currently in beta and is not covered by App Engine's [SLA
Deprecation Policy](https://cloud.google.com/appengine/sla). App Engine Flexible is only supported
in North American regions at this time.

## Pricing

App Engine Flexible currently uses [Compute Engine
pricing](https://cloud.google.com/compute/pricing) as instances provisioned by App Engine run on top
of Compute Engine. Google has stated that pricing may change in the future and should be finalized
by the time flexible is out of beta.

App Engine Flexible also requires that billing be enabled in the Google Cloud Console, however
Google offers $300 of credit and a 60-day trial for testing purposes.

## Learning More

If you want to learn more about App Engine Flexible or try it out, the [App Engine
Documentation](https://cloud.google.com/appengine/docs/flexible/python/) has plenty of examples and
literature to get you started.
