const {Client, Collection} = require("discord.js");
const fs = require("fs");
const path = require("path");



class SimplifiedBot extends Client {
    /**
     * @param {string} token Your Bot's Token. 
     */
    constructor(token) {
        super()
        this.login(token)
    }

    /**
     * 
     * @param {string}   path The Path to load all the commands. 
     */
    handleCommands(pat) {
        try {
        const cmdFiles = fs.readdirSync(pat).filter(file => file.endsWith(".js" || ".ts"))
        cmdFiles.map((file) => {
            const command = require(path.join(__dirname, pat));
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
     */
    handleEvents(pat) {
        const eFiles = fs.readdir(pat, (err, files) => {
            if(err) return console.error(err);
            files.map((file) => {
                const eFile = require(path.join(__dirname, pat))
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