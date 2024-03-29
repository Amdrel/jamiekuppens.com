+++
date = "2016-01-21T10:32:47-08:00"
draft = false
title = "Projects"
description = "This is a list of a few open source programs I've worked on. Most of them are one-offs and aren't actively maintained."
+++

This is a list of a few open source programs I've worked on. Most of them are
one-offs and aren't actively maintained. This list is non-comprehensive and is a
showcase of the projects I consider the most interesting.

## Lorewalker Cho

[Lorewalker Cho](https://github.com/amdrel/lorewalker-cho) is a fully functional
Discord bot that plays games where it asks trivia questions related to the game
World of Warcraft. The bot is written in Python 3 and uses the wonderful
[discord.py](https://discordpy.readthedocs.io/en/latest/) library and uses
PostgreSQL as a backend for storing Discord server configurations and
scoreboards.

Features:

* Allows setting custom trivia channels and prefixes (admin only).
* Is able to error correct misspelled words in answers.
* Keeps track of player scores in the Discord server.

Want to add questions to Lorewalker Cho? [Create an issue on
GitHub](https://github.com/amdrel/lorewalker-cho/issues/new) and use the
`question-request` label. Include your question text, answer and topic of the
question being submitted.

## NES RS

[NES RS](https://github.com/amdrel/nes-rs) is a work in progress NES emulator
written in Rust. The name is subject to change and I aim to eventually deliver a
full featured emulator.

This is a list of my long term goals for the project that I do not expect to be
done for a long time.

* Make the emulator as accurate as possible
* Automated testing of the CPU with existing test roms
* Automated testing of the PPU (frame by frame compare)
* RPC-like api to allow external scripts change the emulator state (e.g. making a player AI using machine learning)
* Full featured debugger accessible through a command-line interface

## Notch

[Notch](https://github.com/amdrel/notch) is a CHIP-8 virtual machine written in
Rust. I wrote it after getting interested in emulation from the [Ferris Makes
Emulators stream](https://www.twitch.tv/ferrisstreamsstuff).  It has worked with
all games I threw at it so far, but can use a little polishing and refactoring.

## MLBF

> "Your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should."
>
> -- Jeff Goldblum's one character from Jurassic Park

[MLBF](https://github.com/amdrel/mlbf) is a Brainfuck interpreter written in C
that supports peephole optimizations. Code is fed through stdin and output
is written to stdout. If you ever wanted to use brainfuck in your scripting
environment this is the right tool for you **_(please don't)_**.

MLBF can also convert brainfuck to C, which can then be passed to a compiler and
turned into native code. Depending on the optimization level used, compilation
may take a while; however when used with programs like mandlebrot.b, performance
increases as much as 6x can be seen at runtime.
