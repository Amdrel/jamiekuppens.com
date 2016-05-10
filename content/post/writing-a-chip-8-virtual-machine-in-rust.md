+++
date = "2016-05-09T11:49:37-07:00"
draft = true
title = "Writing a CHIP-8 Virtual Machine in Rust"
+++

A few months ago after a tiring day at work, I came across a post on
[/r/programming](https://www.reddit.com/r/programming/) about
[livecoding a N64 emulator in rust](https://www.reddit.com/r/programming/comments/41bo7h/ive_started_livecoding_an_n64_emulator_in_rust/)
and instantly became hooked to the series. That stream piqued my interest in the subject
of emulation, along with giving me that wonderful feeling I had when I first got into programming.
After reading some discussion in the stream comments, I decided the best way to get introduced into
the emulation scene was to write a [CHIP-8 virtual machine](https://en.wikipedia.org/wiki/CHIP-8).

To the uninitiated, CHIP-8 is an interpreted programming language developed by Joseph Weisbecker
in the mid-1970s. The goal of CHIP-8 was to allow video games to be easily programmed and portable
across computers sporting CHIP-8 implementations.

I also made the decision to use [Rust](https://www.rust-lang.org/) which was used on the stream.
I was interested in Rust at the time and decided using it in this project would be a good excuse to
get introduced to the language, and it seemed adequate for the task.

<!--more-->
