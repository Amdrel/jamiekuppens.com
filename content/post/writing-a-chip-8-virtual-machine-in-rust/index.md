+++
date = "2016-05-11T11:49:37-07:00"
draft = false
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
addressable memory, an instruction set, and basic input and output.

I also made the decision to use [Rust](https://www.rust-lang.org/) which was used on the stream.
I was interested in Rust at the time and decided using it in this project would be a good excuse to
get introduced to the language, and it seemed adequate for the task. You can find the source code for my virtual machine
on [Github](https://github.com/Reshurum/notch).

<!--more-->

### Brief Overview of CHIP-8

Note that I use the terms _emulator_, _interpreter_, and _virtual machine_ interchangeably. In the context of
this article they are the same thing.

CHIP-8 supports 16 keys for input and has 4kB of memory (512 bytes are reserved for the interpreter). For the processor
CHIP-8 supports 35 opcodes which are meant to be interpreted as instructions for the interpreter to perform.
Word size is 2 bytes long and stored in big-endian; this is important when reading the opcodes
or else data will appear malformed. CHIP-8 also has 16 8-bit registers labeled V0 through VF which are used for
temporary storage or to be read by certain instructions. The VF register is a carry flag and is typically used for
collision detection.

There are also 5 important registers that serve very specific purposes listed here:

| Register             | Purpose                                                                       |
| ---------------------|-------------------------------------------------------------------------------|
| Program Counter (pc) | The current location in memory where code is being executed.                  |
| Stack Pointer (sp)   | A pointer to the address that called the current subroutine.                  |
| Index Register (i)   | A 16 bit address typically used for operations involving memory.              |
| Delay Timer (dt)     | A counter that counts down at 60Hz and halts execution until it reaches 0.    |
| Sound Timer (st)     | A counter that counts down at 60Hz and plays a beep sound until it reaches 0. |

Here are some good references to read if you want to learn more about CHIP-8 in detail:

* [Mastering CHIP-8](http://mattmik.com/files/chip8/mastering/chip8.html)
* [Cowgod's CHIP-8 Technical Reference](http://devernay.free.fr/hacks/chip8/C8TECH10.HTM)

### Program Flow

Execution of a CHIP-8 program is done through a main loop which iterates over words where the program counter is
currently at, extracts the opcode, and performs it's documented action. Before starting the loop, fonts are loading
into reserved memory for the application to use. Originally the reserved space was created to store the interpreter's
executable code, but for modern interpreters this is no longer the case so it's only used for fonts.

Here is a snippet from my code that demonstrates all the functions a main loop has to perform:

{{< highlight rust >}}
/// Execute instructions from ram.
pub fn run(&mut self) {
    loop {
        // Interconnect can signal the emulator to halt.
        // This is because interconnect works with the native window system
        // and handles close events.
        if self.interconnect.halt {
            break
        }

        // Read a word from ram where the program counter currently points
        // to execute.
        let word = self.interconnect.read_word(self.pc);

        // Execute until the subroutine ends if we are in one.
        if self.execute_instruction(word) {
            break
        }

        // Poll for input and set the input state.
        self.interconnect.handle_input();
    }
}

...

/// Reads a 16 bit word from ram. This function is used mainly to read and
/// execute instructions.
#[inline(always)]
pub fn read_word(&self, addr: u16) -> u16 {
    BigEndian::read_u16(&self.ram[addr as usize..])
}
{{< /highlight >}}

In my interpreter I use the [byteorder](https://crates.io/crates/byteorder) crate to read the big-endian words
from ram. The loop reads instructions from ram and calls an execution function that checks the opcodes
and performs their tasks. Most of the work that went into the project was implementing the opcodes and interfacing
with the operating system for input, sound, and display.

### Implementing an Opcode

Before processing, the opcode is extracted from the first 4 bits of the current word being read. After that the opcode
is compared in a switch case to determine how to parse the last 12 bits and perform that opcode's function.

{{< highlight rust >}}
// The opcode is the first 4-bit value in the word
let opcode = (instr >> 12) as u8;

match opcode {
    ...

    0x7 => {
        // 7XNN - ADD VX, NN
        //
        // Adds NN to VX.

        let regx = ((instr << 4) >> 12) as u8; // VX
        let byte = ((instr << 8) >> 8) as u8;  // NN
        let result = self.get_reg(regx).wrapping_add(byte);
        self.set_reg(regx, result);
    },

    ...
}
{{< /highlight >}}

In order to parse the word, bitwise operations must be used. This specific opcode gets an 8-bit value stored in the
last 8 bits of the word (NN) and adds it to the value of the register specified 4 bits to the left (X). The result then
overwrites the previous value in the register that was used for the initial addition. One interesting thing to note is
the `wrapping_add` call; this is there since Rust will panic in debug builds if it catches an
[integer overflow](https://en.wikipedia.org/wiki/Integer_overflow). This is not a problem for CHIP-8 applications as
integers are expected to wrap when they overflow/underflow.

### Summary

CHIP-8 is a great way to get introduced to emulation and I highly recommend implementing your own interpreter if this
interests you. The project took me a week to complete in my free time and I learned a lot during this journey.
You should be able to implement CHIP-8 with any modern programming language, but I recommend using a
language that has a good type system to avoid frustration. Feel free to check out my source code on
[Github](https://github.com/Reshurum/notch), but I highly recommend doing this yourself.

Many thanks to [yupferris](https://github.com/yupferris) and his [stream](https://www.twitch.tv/ferrisstreamsstuff) for
inspiring me to take on this endeavor as I feel this has made me a better engineer.
