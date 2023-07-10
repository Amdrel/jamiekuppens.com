+++
Date = "2022-09-07T02:00:00-08:00"
Title = "Git Bisect: the Time Traveling Bug Finder"
AffiliateLink = "https://labs.thisdot.co/blog/git-bisect-the-time-traveling-bug-finder/"
Tags = ["affiliate", "git"]
Categories = ["Development", "Affiliate"]
menu = "main"
+++

I think it’s safe to say that most of us have been in a situation where we pull
down some changes from main and something breaks unexpectedly, or a bug got
introduced in a recent deployment. It might not take long to narrow down which
commit caused the issue if there’s only a couple of new commits, but if you’re a
dozen or more commits behind, it can be a daunting task to determine which one
caused it.

<!--more-->

...
