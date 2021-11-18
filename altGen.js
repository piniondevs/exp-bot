const commandIndexGenerator = require('./commandIndexGen');

const altGenenerator = () => {
  try {

    const commands = commandIndexGenerator();
    const keys = Object.keys(commands);

    const alts = keys.map(item => commands[item].alt);
    
    const altIndex = {};
    keys.forEach((item, index) => {
      altIndex[alts[index]] = require(`./commands/${item}.js`);
    });

    return { altIndex: altIndex, alts: alts }

  } catch (err) { 
    console.error(err);
    process.exit(1);
  }
}

module.exports = altGenenerator;