const {Client, Collection} = require("discord.js");
const fs = require("fs");


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
    handleCommands(path) {
        try {
        const cmdFiles = fs.readdirSync(path).filter(file => file.endsWith(".js" || ".ts"))
        cmdFiles.map((file) => {
            const command = require(`${path}/${file}`);
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
    handleEvents(path) {
        const eFiles = fs.readdir(path, (err, files) => {
            if(err) return console.error(err);
            files.map((file) => {
                const eFile = require(`${path}/${file}`)
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