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
necessity for successful web applications to be able to serve thousands of users and being reliable,
fast, and secure. People depend on web services in their day-to-day lives much more than they did
during the internet's infancy and it's expected that applications meet user expectations in order to
stay relevant.

<!--more-->

## What is Multitenancy?

*Multitenancy* is a software architecture in which one application serves multiple *tenants*.
Multi-Tenant applications can easily provision access to tenants with minimal effort from the
service provider which makes it ideal for modern applications as the web continues to grow.
Multitenancy is regarded as an important feature of cloud computing.

### Tenants

{{% aside-image aside="right" %}}
*tenants* can refer to an organization, a client, or a user.
{{% /aside-image %}}

A *Tenant* can mean many things, but is typically used to describe either a user, or an
organization. For example an organization on GitHub with it's own set of repositories can be
regarded as a tenant, while a GitHub user may also be considered one. Another example can be of a
SaaS application where the tenant is a *client* and users are owned by the tenant rather than being
the tenant themselves.

### Data Isolation

Each tenant may have private information that they don't want exposed without giving explicit
permission. How data is isolated depends on how data is actually stored. For example if the
developers choose to use one database for all tenants, they would have to tread carefully when
writing queries so data from other tenants is not accidentally leaked. This is known as the *Shared
Schema* approach and is common when dealing with relational data.

Another approach to dealing with data is to create separate databases for each tenant to guarantee
data does not leak, though relationships cannot be made between databases when isolated.

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

### Namespaces

## Let's Build a Team Goal Tracking App
