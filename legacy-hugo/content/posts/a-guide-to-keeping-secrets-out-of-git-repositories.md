+++
Date = "2022-05-30T02:00:00-08:00"
Title = "A Guide to Keeping Secrets out of Git Repositories"
AffiliateLink = "https://labs.thisdot.co/blog/a-guide-to-keeping-secrets-out-of-git-repositories/"
Tags = ["affiliate", "git", "security"]
Categories = ["Security", "Affiliate"]
menu = "main"
+++

If you’ve been a developer for a while, then you hopefully know it is wise to
keep secret information such as passwords and encryption keys outside of source
control. If you didn’t know that, then surprise! Now you know.

Sometimes slip-ups do happen and a password ends up in a default config file or
a new config file was not added to “.gitignore” and that same someone ran “git
add .” and didn’t even notice it got committed. There should be protections in
place no matter how diligent your programmers are since nobody is infallible,
and the peace of mind is well worth it.

<!--more-->

...
