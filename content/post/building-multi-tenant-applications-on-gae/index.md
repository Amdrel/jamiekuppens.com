+++
date = "2016-10-08T23:57:56-07:00"
draft = true
title = "Building Multi-Tenant Applications on App Engine"
description = "Learn how to use Google App Engine to build hardened Multi-Tenant web applications."
image = "/post/building-multi-tenant-applications-on-gae/text-editor-tilted.jpg"
imagewidth = "2000"
imageheight = "1335"
hero = true
herocolor = "#24242e"
+++

With the rise of cloud computing and the proliferation of new users to the web, it has become a
necessity for successful web applications to be able to serve thousands of users whilst being
reliable, fast, and secure. People depend on web services in their day-to-day lives much more than
they did during the internet's infancy and it's expected that applications meet user expectations in
order to stay relevant.

<!--more-->

## What is Multitenancy?

*Multitenancy* is a software architecture in which one application serves multiple *tenants*.
Multi-Tenant applications can easily provision access to tenants with minimal effort from the
service provider which makes it ideal for modern applications as the web continues to grow.
Multitenancy is regarded as an important feature of cloud computing.

### Tenants

{{% aside-image aside="right" %}}
*A tenant can refer to either a user, a client, or an organization.*
{{% /aside-image %}}

*Tenant* is loosely defined, but it's typically used to describe either a **user**, a **client**, or
an **organization**.  For example an organization on GitHub with it's own set of repositories can be
regarded as a tenant, while a GitHub user may also be considered one. Another example can be of a
SaaS application where the tenant is a *client* and users are owned by the tenant rather than being
the tenant themselves.

### Data Isolation

Each tenant may have private information that they don't want exposed without giving **explicit
permission**. How data is isolated depends on how data is actually stored. For example if the
developers choose to use one database for all tenants, they would have to tread carefully when
writing queries so data from other tenants is not accidentally leaked. This is known as the *Shared
Schema* approach and is common when dealing with relational data.

Another approach to dealing with data is to create **separate databases for each tenant** to
guarantee data does not leak, though relationships cannot be made between databases when isolated.

Each of these approaches have their use case and it's not one or the other, in fact a mixture of
both approaches can be used. For example if your application is a simple public facing web service
where the tenants are users, then you may only need to isolate private user data that would never be
shared into separate databases, but store user credentials and relational data in a single database
for quick access.

### Availability

Since a multi-tenant application is just one application serving multiple tenants, if the
application goes down all tenants will be denied service. This differs from a single-tenant approach
where the application is provisioned individually for each tenant, in which case if the application
stops working it affects only the one tenant.

## App Engine makes Multitenancy Easy

For quite a while now, App Engine has included options with their various APIs that makes
implementing Multi-Tenant applications easy. Multitenancy in App Engine revolves around the use of
[Namespace](https://cloud.google.com/appengine/docs/python/multitenancy/) enabled APIs.

### Namespaces

*Namespaces* allow you to separate data into their own isolated silos through a nice simple to use
API which can be used with minimal effort. Namespaces can be used by passing a *namespace id* are
created implicitly without having to create them yourself. For example, if I try to store a file in
blobstore with the namespace `profile_pictures` and it does not exist, App Engine will happily
create it for me and place my file in with no questions asked.

{{< highlight python >}}
print("I'm python code that does absolutely nothing!")
{{< /highlight >}}

One thing to note is that when you use a namespace enabled API under App Engine without specifying a
namespace, resources are stored and retrieved from a default unnamed namespace.

## Let's Build a Team Goal Tracking App

I've created a Goal tracking application that showcases using namespace enabled APIs effectively to
implement multi-tenancy. You can try the demo [here](https://github.com/Reshurum) if you want to see
the final result before continuing (note that data is wiped on a weekly basis). This application
allows users to sign up through a public signup interface and from there they can create teams and
invite other users to them.
