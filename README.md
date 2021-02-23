# Discord.JS Simplified

*Discord.JS Simplified is an npm package that will create a basic Discord.JS Client for you.*

## Installation

```
npm install --save discord.js-simplified
```

## Getting Started

First of All, lets handle our commands and events.

**index.js example:**

```js
const simplified = require("discord.js-simpler");
const Discord = require("discord.js");
const client = new simplified.bot('your-bot-token-here')

client.handleCommands('./commands')
client.handleEvents('./events')
```

## Example Event

Events have 2 required properties.

**event-name.js**

```js
module.exports = {
    name: 'event-name',
    run: (client, /* other parameters with the first one always being client */) => {
        
        //code

    }
}
```

## Example Command

Commands have 3 required properties.

**command-name.js**

```js
module.exports = {
    name: 'your command name',
    aliases: ['alias1', 'alias2'] //must be an array
    run: (/* parameters you will pass when you create your message event */)
}
```
## Notes

 -> You have to create all the events including the Message Event.
