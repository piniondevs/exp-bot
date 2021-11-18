const Discord = require('discord.js');

class InfoEmbed {
  constructor(title, description) {
    this.title = title;
    this.description = description;

    const embed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle(`✅ ${this.title} ✅`)
      .setDescription(this.description);

    return embed;
  }
}

module.exports = InfoEmbed;