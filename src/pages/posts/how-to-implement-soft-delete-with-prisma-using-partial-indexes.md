+++
Date = "2024-02-02T02:00:00-08:00"
Title = "How to Implement Soft Delete with Prisma using Partial Indexes"
AffiliateLink = "https://www.thisdot.co/blog/how-to-implement-soft-delete-with-prisma-using-partial-indexes"
Tags = ["affiliate", "javascript", "postgresql", "prisma"]
Categories = ["Development", "Affiliate"]
menu = "main"
+++

Most APIs and applications that allow you to manage content have some form of
deletion functionality. Sometimes you may want to make something recoverable
after it’s been deleted, or perform the actual deletion later, and soft
deletion is a way to accomplish this.

Entities in your database may also have unique identifiers such as slugs
associated with them as well, and when you delete things you typically expect
these identifiers to become available for use again. In the case of soft
deletes though your deleted entities will still be in the database! If you’re
using [Postgres](https://www.postgresql.org/) or
[SQLite](https://www.sqlite.org/index.html) you can get the best of both worlds
by using [partial unique indexes](https://www.sqlite.org/partialindex.html),
which will in the case of soft deletes would only add slugs on undeleted
records to the index; however if you’re connecting a partial index compatible
database with [Prisma](https://www.thisdot.co/blog?tags=prisma) then everything
isn’t rainbows and sunshine when it comes to partial indexes.

<!--more-->

...
