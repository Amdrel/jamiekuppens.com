+++
date = "2016-05-09T11:49:37-07:00"
draft = true
title = "Writing a CHIP-8 Virtual Machine in Rust"
+++

{{< figure src="/post/writing-a-chip-8-virtual-machine-in-rust/pong.png" alt="Pong running in an SDL window." >}}

A few months ago after a tiring day at work, I came across a post on
[/r/programming](https://www.reddit.com/r/programming/) about
[livecoding a N64 emulator in rust](https://www.reddit.com/r/programming/comments/41bo7h/ive_started_livecoding_an_n64_emulator_in_rust/)
and instantly became hooked. That stream piqued my interest in the subject
of emulation, along with giving me that wonderful feeling I had when I first got into programming.
After reading some discussion in the stream comments, I decided the best way to get introduced into
the emulation scene was to write a [CHIP-8 virtual machine](https://en.wikipedia.org/wiki/CHIP-8).

To the uninitiated, CHIP-8 is an interpreted programming language developed by Joseph Weisbecker
in the mid-1970s. The goal of CHIP-8 was to allow video games to be easily programmed and portable
across computers having CHIP-8 implementations. A CHIP-8 virtual machine resembles a very basic computer as it has
addressable memory, registers, opcodes, a stack, and sound.

I also made the decision to use [Rust](https://www.rust-lang.org/) which was used on the stream.
I was interested in Rust at the time and decided using it in this project would be a good excuse to
get introduced to the language, and it seemed adequate for the task. You can find the source code for my virtual machine
on [Github](https://github.com/Reshurum/notch).

<!--more-->

### Brief Overview of CHIP-8

Do note that I may use the terms _emulator_, _interpreter_, and _virtual machine_ interchangeably. In the context of
this article they are the same thing.

CHIP-8 supports 16 keys for input and has 4kB of memory (512 bytes are reserved for the interpreter). For the processor
CHIP-8 supports 35 opcodes which are used meant to be interpreted as instructions for our interpreter to perform.
Opcodes are 2 bytes long and are stored in big-endian; this is important when reading the opcodes
(or else data will appear malformed). CHIP-8 also has 16 8-bit registers labeled V0 through VF which are used for
temporary storage or to be ready by certain instructions. The VF register is a carry flag and is typically used for
collision detection.

There are also 5 important registers that serve very specific purposes listed here:

| Register             | Purpose                                                                       |
| ---------------------|-------------------------------------------------------------------------------|
| Program Counter (pc) | The current location in memory where code is being executed.                  |
| Stack Pointer (sp)   | A pointer to the address of the current subroutine in the call stack.         |
| Index Register (i)   | A 16 bit address typically used for operations involving memory.              |
| Delay Timer (dt)     | A counter that counts down at 60Hz and halts execution until it reaches 0.    |
| Sound Timer (st)     | A counter that counts down at 60Hz and plays a beep sound until it reaches 0. |

Here are some good references to read if you want to learn more about CHIP-8 in detail:

* [Mastering CHIP-8](http://mattmik.com/files/chip8/mastering/chip8.html)
* [Cowgod's CHIP-8 Technical Reference](http://devernay.free.fr/hacks/chip8/C8TECH10.HTM)

### Program Flow

CHIP-8 is very simple, execution is done through a main loop which iterates over opcodes and performs their documented
action. Before starting the loop, fonts are loading into reserved memory for the application to use. Originally
the reserved space was created to store the interpreter's executable code, but for modern programs this is no longer
the case and it's simply used for fonts.

### Summary

CHIP-8 is a great way to get introduced to emulation and I highly recommend implementing your own if this interests you.
You should be able to implement CHIP-8 with any modern programming language, but I recommend using a language that has
a good type system to avoid frustration. Feel free to check out my source code on
[Github](https://github.com/Reshurum/notch), but I highly recommend doing this yourself.

Many thanks to [yupferris](https://github.com/yupferris) for inspiring me to
take on this endeavor and I feel like this project has made me a better engineer.
