const Discord = require('discord.js');

const genericError = require('../utils/genericError');
const ErrorEmbed = require('../utils/errorEmbed');
const levels = require('../levels');

const User = require('../models/User');

module.exports = {
  name: 'profile',
  alt: 'p',
  desc: 'Shows your xp and level, mention someone to see their\'s.',
  handler: async (message) => {
    try {

      const mention = message.mentions.users.first()

      // If theres a mention
      if (mention) {

        const mentionUser = await User.findOne({ id: mention.id });

        if (!mentionUser) {
          message.channel.send(new ErrorEmbed('Cant Find User', 'The user you tagged isnt in our db.'));
          return;
        }

        const profile = new Discord.MessageEmbed()
          .setColor('AQUA')
          .setTitle(mentionUser.username)
          .setThumbnail(mention.displayAvatarURL())
          .setDescription(`**${levels[mentionUser.level] - mentionUser.xp}** messages left until next level`)
          .addFields(
            { name: 'Level', value: mentionUser.level },
            { name: 'EXP', value: `${mentionUser.xp}/${levels[mentionUser.level]}` }
          );

        message.channel.send(profile);

        return;

      }

      const user = await User.findOne({ id: message.author.id });
      const embed = new Discord.MessageEmbed()
        .setColor('AQUA')
        .setTitle(user.username)
        .setThumbnail(message.author.avatarURL())
        .setDescription(`**${levels[user.level] - user.xp}** messages left until next level`)
        .addFields(
          { name: 'Level', value: user.level },
          { name: 'EXP', value: `${user.xp}/${levels[user.level]}` }
        );

      message.channel.send(embed);

    } catch (err) {
      console.log(err);
      genericError(message);
    }
  }
}