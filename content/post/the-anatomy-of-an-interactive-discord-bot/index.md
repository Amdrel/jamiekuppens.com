---
title: "The Anatomy of an Interactive Discord Bot"
description: "I've messed with Discord bots in servers quite a bit and I've always had fun with the various game bots that I've encountered. I've played with complex bots that play Cards Against Humanity, and relatively simple bots that just emulates an 8 ball. All the 8 ball did was respond with 'Yes' or 'No' at random, and even a bot that simple is very fun when played with friends. I wanted to get into the Discord bot creation game to see what it's like."
date: 2019-05-26T22:25:59-07:00
draft: true
image: "/post/the-anatomy-of-an-interactive-discord-bot/chat.jpg"
imagewidth: 1920
imageheight: 1080
imagesize: 179923
imagemimetype: "image/jpeg"
imagefade: 0.2
hero: true
herocolor: "#36393f"
---

I've messed with Discord bots in servers quite a bit and I've always had fun with the various game bots that I've encountered. I've played with complex bots that play Cards Against Humanity, and relatively simple bots that just emulates an 8 ball. All the 8 ball did was respond with 'Yes' or 'No' at random, and even a bot that simple is very fun when played with friends. I wanted to get into the Discord bot creation game to see what it's like.

<!--more-->

## Concurrency

I chose to write the bot in Python 3.5 as this version of python has first-class support for async/await, and it's supported on EL7 which is my operating system of choice when I provision VPS's. Having concurrency in your bot is a _requirement_ if you plan on using the bot in more than one Discord server; and if you don't code with concurrency in mind your users will experience unusual delays and the bot will get slower as it's used in more servers.

There are ways to achieve this much-needed concurrency in earlier versions of python as well, but the async/await primitives in the newer versions are _much_ more convenient to use. The only barrier to entry is the library support for async/await as lots of libraries use blocking calls when communicating over the network, but my bot doesn't need to make external calls anyways, and even if it did, it's not hard to write an API client that uses aiohttp or the new requests 3 library.

## Checking Answers

Answers are compared with the [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) function. This function is able to determine the 'edit distance' between two strings. The reason why I used this was so the bot would allow for error detection in answers as some names in the Warcraft universe can be hard to spell properly. All of this is implemented by the wonderful library [jellyfish](https://pypi.org/project/jellyfish/), but if you're curious on how Levenshtein distance actually works, checkout the source code or the math in the wikipedia page.

In addition to using Levenshtein distance, I also calculate a ratio so longer answers allow for more forgiveness when it comes to misspellings. Trying to spell many elven names properly when in a rush can be a bit of a challenge at times.

{{< highlight python >}}
import jellyfish

...

def levenshtein_ratio(source, target, ignore_case=True):
    """Calculates the levenshtein ratio between two strings.

    The ratio is computed as follows:
        (len(source) + len(target) - distance) / (len(source) + len(target))

    This function has been ported from (MIT license):
        https://github.com/texttheater/golang-levenshtein/blob/4041401c6e7f6a2b49815c4aea652e518ca8e92e/levenshtein/levenshtein.go#L115-L130

    :param str source:
    :param str target:
    :rtype: float
    :return:
    """

    if ignore_case:
        distance = jellyfish.levenshtein_distance(
            source.lower().strip(),
            target.lower().strip()
        )
    else:
        distance = jellyfish.levenshtein_distance(source, target)

    source_len = len(source)
    target_len = len(target)

    return (source_len + target_len - distance) / (source_len + target_len)
{{< /highlight >}}


The allowed ratios may need to be tweaked for certain answers and I plan on adding this option in the future. A good example of this is there's a question whose answer is 'Grond', but 'Gron' will also be allowed as correct even though it's 100% wrong. I chose 80% as a reasonable default, but this isn't reasonable for _all_ answers.

## Game State

Game state is stored in memory and in a SQL database. The reason for storing it in SQL is so that games can be resumed when the bot is restarted. If the bot is shutdown for an update mid-game, it can be confusing to users when the bot stops asking them questions and forgets that a game was even playing. The code to resume games is actually fairly simple as all the active games are stored in a dictionary mapping guild ids to the game state.

{{< highlight python >}}
async def resume_incomplete_games(self):
    """Resumes all inactive games, usually caused by the bot going down."""

    incomplete_games = sql.active_game.get_incomplete_games(self.engine)

    LOGGER.info(
        "Found %d incomplete games that need to be resumed",
        len(incomplete_games))

    for guild_id, active_game_dict in incomplete_games:
        existing_game_state = GameState(
            self.engine,
            guild_id,
            active_game_dict=active_game_dict,
            save_to_db=True)
        self.active_games[guild_id] = existing_game_state

        guild = self.get_guild(guild_id)

        if guild:
            channel = guild.get_channel(existing_game_state.channel_id)
            asyncio.ensure_future(
                self._ask_question(channel, existing_game_state))
{{< /highlight >}}

If you have a watchful eye you might notice that there's no sharding logic in here. This is something I haven't gotten to yet.

## Configuration

The bot also uses the SQL backend to store server-specific configurations. It's able to keep track of custom prefixes and allows administrators to limit the bot to a certain channel so that users in the server can decide to mute game messages.

{{< figure src="/post/the-anatomy-of-an-interactive-discord-bot/angry-ping.gif" >}}

## Problems with the Bot

This bot isn't without its flaws though. Currently it doesn't support running with more than one shard, however discord.py makes this easy to implement so I'm not worried about it right now. The hardest part to change if I decide to add sharding would probably be the incomplete game resumption logic, but it shouldn't be hard to apply the following sharding formula to the SQL query.

{{< highlight cpp >}}
(guild_id >> 22) % num_shards == shard_id
{{< /highlight >}}

If I want to cheat in regards to sharding I can even use [auto sharding](https://discordpy.readthedocs.io/en/latest/migrating.html#sharding) if the instanced is spec'd out and CPU processing power isn't a limiting factor when reaching the connection limit.

## Summary

The experience of creating this bot was a lot of fun and taught me quite a bit. I've never worked with modern python async/await in a serious capacity until I decided to make this bot as most of the python work I've done up to this point has been working with legacy applications written in Python 2 or earlier versions of Python 3. Check out the source code on [GitHub](https://github.com/Reshurum/lorewalker-cho) if you're curious about how this bot works! Just keep in mind that if you want to get it working under Windows you may need to do some additional work as I don't provide instructions for it, but the bot itself should work in Windows.

## References

[https://github.com/texttheater/golang-levenshtein](https://github.com/texttheater/golang-levenshteinlevenshtein.go#L115-L130)<br>
[https://pypi.org/project/jellyfish/](https://pypi.org/project/jellyfish/)<br>
[https://discordpy.readthedocs.io/en/latest/index.html](https://discordpy.readthedocs.io/en/latest/index.html)<br>
[https://en.wikipedia.org/wiki/Levenshtein_distance](https://en.wikipedia.org/wiki/Levenshtein_distance)
