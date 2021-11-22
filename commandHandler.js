require('dotenv').config();

const commandIndexGenerator = require('./commandIndexGen');
const altGenenerator = require('./altGen');

const User = require('./models/User');

const ErrorEmbed = require('./utils/errorEmbed');

const prefix = process.env.PREFIX;

const commandHandler = async (message) => {

  const userId = await User.findOne({ id: message.author.id });
  if (!userId) {
    const newUser = new User({
      id: message.author.id,
      username: message.author.username,
      xp: 0,
      level: 1
    });
    await newUser.save();
  }

  // Bot Stuff
  if (!message.content.startsWith(prefix)) return;

  const baseCommand = message.content.toLowerCase().split(' ')[0].split('');
  baseCommand.shift();

  const command = baseCommand.join('');

  const altInstance = altGenenerator();
  if (altInstance.alts.includes(command)) {
    altInstance.altIndex[command].handler(message);
    return;
  }

  const commandIndex = commandIndexGenerator();
  if (!commandIndex[command]) {
    message.channel.send(new ErrorEmbed(
      'Command Not Found',
      'I don\'t think I have that command chief.'
    ));
    return;
  }

  commandIndex[command].handler(message);

}

module.exports = commandHandler;