+++
date = "2016-01-21T10:32:47-08:00"
draft = false
title = "Projects"
description = "This is an aggregated list of many open source programs I've written, although most of them are one-offs."
+++

This is an aggregated list of many open source programs I've worked on, however most of them are one-offs.

{{< projectheader href="https://github.com/Reshurum/lorewalker-cho" license-badge="https://img.shields.io/badge/license-GPLv3-blue.svg" license-link="https://github.com/Reshurum/lorewalker-cho/blob/master/COPYING" >}}
    Lorewalker Cho
{{< /projectheader >}}

[Lorewalker Cho](https://github.com/Reshurum/lorewalker-cho) is a fully functional Discord bot that plays games where it asks trivia questions related to the game World of Warcraft. The bot is written in Python 3 and uses the wonderful [discord.py](https://discordpy.readthedocs.io/en/latest/) library and uses PostgreSQL as a backend for storing Discord server configurations and scoreboards.

Features:

* Allows setting custom trivia channels and prefixes (admin only).
* Is able to error correct misspelled words in answers.
* Keeps track of player scores in the Discord server.

Coming Soon:

* Limiting selected questions to a specific topic.
* On occasion say random blurbs when answering questions.

Want to add questions to Lorewalker Cho? [Create an issue on GitHub](https://github.com/Reshurum/lorewalker-cho/issues/new) and use the `question-request` label. Include your question text, answer and topic of the question being submitted.

[Click here to add the bot to your server.](https://discordapp.com/api/oauth2/authorize?client_id=378721268515602443&permissions=3136&scope=bot)

{{< projectheader href="https://github.com/Reshurum/nes-rs" travis="https://travis-ci.org/Reshurum/nes-rs" license-badge="https://img.shields.io/badge/license-MIT%2FApache--2.0-blue.svg" license-link="https://github.com/Reshurum/nes-rs/blob/master/CONTRIBUTING.md" >}}
    nes-rs
{{< /projectheader >}}

[nes-rs](https://github.com/Reshurum/nes-rs) is a work in progress NES emulator written in Rust. The name is subject to change and I aim to eventually deliver a full featured emulator.

This is a list of my long term goals for the project that I do not expect to be done for a long time.

* Make the emulator as accurate as possible
* Automated testing of the CPU with existing test roms
* Automated testing of the PPU (frame by frame compare)
* RPC-like api to allow external scripts change the emulator state (e.g. making a player AI using machine learning)
* Full featured debugger accessible through a command-line interface

{{< projectheader href="https://github.com/Reshurum/notch" travis="https://travis-ci.org/Reshurum/notch" >}}
    Notch
{{< /projectheader >}}

[Notch](https://github.com/Reshurum/notch) is a CHIP-8 virtual machine written in Rust. I wrote it after getting interested in emulation from the [Ferris Makes Emulators stream](https://www.twitch.tv/ferrisstreamsstuff).  It has worked with all games I threw at it so far, but can use a little polishing and refactoring.

{{< projectheader href="https://github.com/StickmanVentures/lol-csv" >}}
    LoL CSV
{{< /projectheader >}}

LoL CSV was a simple web application for League of Legends players wishing to track their match stats. Given a summoner name, a spreadsheet is generated with match data from the previous 10 matches. You can find the LoL CSV source code on [GitHub](https://github.com/StickmanVentures/lol-csv).

{{< projectheader href="https://github.com/StickmanVentures/inquiry-bot">}}
    Inquiry Bot
{{< /projectheader >}}

Inquiry Bot is a slackbot using Slack's webhook api that I created for the wonderful people at [Stickman Ventures](https://www.stickmanventures.com/). It's purpose is to instantly post contact information from the website directly to one of our slack channels through [Firebase](https://www.firebase.com/). You can find Inquiry Bot on [GitHub](https://github.com/StickmanVentures/inquiry-bot).
