const {Client, Collection} = require("discord.js");
const fs = require("fs");
const path = require("path");



class SimplifiedBot extends Client {
    /**
     * @param {string} token Your Bot's Token. 
     */
    constructor(token) {
        if(!typeof token == "string") throw new SyntaxError(`Token must be a string. Recieved ${typeof token}.`)
        super()
        this.login(token)
    }

    /**
     * 
     * @param {string}   path The Path to load all the commands. 
     * @example 
     * const simplified = require("discord.js-simpler")
     * const client = new simplified.bot("your-token")
     * 
     * client.handleCommands("./commands")
     */
    handleCommands(Path) {
        try {
        const cmdFiles = fs.readdirSync(path.join(__dirname, Path)).filter(file => file.endsWith(".js" || ".ts"))
        cmdFiles.map((file) => {
            const command = require(path.join(__dirname, file));
            this.commands.set(command.name, command)
            
                command.aliases.map((alias) => {
                    this.aliases.set(alias, command.name)
                })
            }) 
        }   catch(e){
                console.error(e);
                    }           
    }; 
    /**
     * @param {string} path The Path to Load all the Events
     * @example 
     * const simplified = require("discord.js-simpler")
     * const client = new simplified.bot("your-token")
     * 
     * client.handleCommands("./events")
     */
    handleEvents(Path) {
        const eFiles = fs.readdir(path.join(__dirname, Path), (err, files) => {
            if(err) return console.error(err);
            files.map((file) => {
                const eFile = require(path.join(__dirname, file))
                this.events.set(eFile.name, eFile)
                this.on(eFile.name, (...args) => {
                    eFile.run(this, ...args);
                })
            })
        })
    }

    commands = new Collection();
    events = new Collection();
    aliases = new Collection();
}

exports.bot = SimplifiedBot;