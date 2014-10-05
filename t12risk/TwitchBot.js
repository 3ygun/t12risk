/*
 *  Modifying a hang_man bot that our friends wrote into our bot for scraping the twitch stream
 *  
 *  See original file at https://github.com/afuhrtrumpet/hangman-bot
 */

var irc = require('irc');
var fs = require('fs');

var file = process.argv[2];

var possibleGuesses = new Map();

var config = {
    channels: "#twitchplaysrisk",
    server: "irc.twitch.tv",
    botName: "RiskBotman",
    password: "oauth:c63mmqbsaev5tqqhnm1rflcaihbld3"
};

var bot = new irc.Client(config.server, config.botName, config.channels, config.password);

var game = {};
var word = {};
var completedWord = {};
var lettersTried = {};
var manState = {};

var count = (function () {
    function count(num) {
        this.numVal = num;
    }
    count.prototype.getNum = function () {
        return this.numVal;
    };

    count.prototype.updateNum = function (num) {
        this.numVal = this.numVal + num;
    };
    return count;
})();

for (var i = 0; i < config.channels.length; i++) {
    var channel = config.channels[i];
    game[channel] = false;
    word[channel] = "";
    completedWord[channel] = "";
    lettersTried[channel] = [];
    manState[channel] = 0;
}

var chooseWord = function (channel) {
    fs.readFile(file, function (err, data) {
        if (err) throw err;
        var lines = data.toString().split('\n');
        index = Math.floor(Math.random() * (lines.length - 1));
        console.log(lines[index]);
        completedWord[channel] = "";
        var words = lines[index].split(' ');
        for (var i = 0; i < words.length; i++) {
            completedWord[channel] += new Array(words[i].length + 1).join('_');
            if (i < words.length - 1) {
                completedWord[channel] += ' ';
            }
        }
        manState[channel] = 0;
        drawHangman(channel);

        bot.say(channel, completedWord[channel].split('').join(' '));
        word[channel] = lines[index].toLowerCase();

        game[channel] = true;
        lettersTried[channel] = [];
    });
};

var drawHangman = function (channel) {
    bot.say(channel, "_________");
    bot.say(channel, "|         |");
    if (manState[channel] > 0) {
        bot.say(channel, "|         0");
    } else {
        bot.say(channel, "|");
    }
    if (manState[channel] > 3) {
        bot.say(channel, "|        /|\\");
    } else if (manState[channel] > 2) {
        bot.say(channel, "|        /|");
    } else if (manState[channel] > 1) {
        bot.say(channel, "|         |");
    } else {
        bot.say(channel, "|");
    }
    if (manState[channel] > 5) {
        bot.say(channel, "|        / \\");
    } else if (manState[channel] > 4) {
        bot.say(channel, "|        /");
    } else {
        bot.say(channel, "|");
    }
}

var wrongGuess = function (channel) {
    manState[channel]++;
    drawHangman(channel);
    if (manState[channel] == 6) {
        bot.say(channel, "You lose! The word was " + word[channel]);
        game[channel] = false;
    }
};

bot.addListener("message", function (from, to, text, message) {
    if (text.toLowerCase().substring(0, 1) == 'a') {
        if (!(this.possibleGuesses.has('a'))) {
            this.possibleGuesses.set('a', count(1));
        } else {
            var cnt = this.possibleGuesses.get('a');
            this.possibleGuesses.delete('a');
            this.possibleGuesses.set('a', count(cnt+1));
        }
    }
});

bot.addListener("message", function (from, to, text, message) {
    if (text.toLowerCase().substring(0, 1) == 'b') {
        if (!(this.possibleGuesses.has('b'))) {
            this.possibleGuesses.set('b', count(1));
        } else {
            var cnt = this.possibleGuesses.get('b');
            this.possibleGuesses.delete('b');
            this.possibleGuesses.set('b', count(cnt + 1));
        }
    }
});

bot.addListener("message", function (from, to, text, message) {
    if (text.toLowerCase().substring(0, 1) == 'c') {
        if (!(this.possibleGuesses.has('c'))) {
            this.possibleGuesses.set('c', count(1));
        } else {
            var cnt = this.possibleGuesses.get('c');
            this.possibleGuesses.delete('c');
            this.possibleGuesses.set('c', count(cnt + 1));
        }
    }
});

bot.addListener("message", function (from, to, text, message) {
    if (text.toLowerCase().substring(0, 1) == 'd') {
        if (!(this.possibleGuesses.has('d'))) {
            this.possibleGuesses.set('d', count(1));
        } else {
            var cnt = this.possibleGuesses.get('d');
            this.possibleGuesses.delete('d');
            this.possibleGuesses.set('d', count(cnt + 1));
        }
    }
});

bot.addListener("message", function (from, to, text, message) {
    if (text.toLowerCase().substring(0, 1) == 'e') {
        if (!(this.possibleGuesses.has('e'))) {
            this.possibleGuesses.set('e', count(1));
        } else {
            var cnt = this.possibleGuesses.get('e');
            this.possibleGuesses.delete('e');
            this.possibleGuesses.set('e', count(cnt + 1));
        }
    }
});

bot.addListener("message", function (from, to, text, message) {
    if (text.toLowerCase().substring(0, 1) == 'f') {
        if (!(this.possibleGuesses.has('f'))) {
            this.possibleGuesses.set('f', count(1));
        } else {
            var cnt = this.possibleGuesses.get('f');
            this.possibleGuesses.delete('f');
            this.possibleGuesses.set('f', count(cnt + 1));
        }
    }
});

bot.addListener("message", function (from, to, text, message) {
    if (text.toLowerCase().substring(0, 1) == 'g') {
        if (!(this.possibleGuesses.has('g'))) {
            this.possibleGuesses.set('g', count(1));
        } else {
            var cnt = this.possibleGuesses.get('g');
            this.possibleGuesses.delete('g');
            this.possibleGuesses.set('g', count(cnt + 1));
        }
    }
});

bot.addListener("message", function (from, to, text, message) {
    if (text.toLowerCase().substring(0, 1) == 'h') {
        if (!(this.possibleGuesses.has('h'))) {
            this.possibleGuesses.set('h', count(1));
        } else {
            var cnt = this.possibleGuesses.get('h');
            this.possibleGuesses.delete('h');
            this.possibleGuesses.set('h', count(cnt + 1));
        }
    }
});

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
};
