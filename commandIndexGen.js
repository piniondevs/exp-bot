const fs = require('fs');

const commandIndexGenerator = () => {
  try {

    const files = fs.readdirSync('./commands');

    const commands = files.map((item) => {
      const deez = item.split('.')
      deez.pop();
      return deez.join('');
    });

    const commandIndex = {};
    commands.forEach((item) => commandIndex[item] = require(`./commands/${item}.js`));

    return commandIndex;

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = commandIndexGenerator;