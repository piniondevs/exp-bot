const ErrorEmbed = require('./errorEmbed');

const genericError = (message) => {
  const someRandomErr = new ErrorEmbed(
    'Something Went Wrong',
    'Something went horribly wrong, ping tahlil so that he can check the logs and find out what it is.'
  );
  message.channel.send(someRandomErr);
}

module.exports = genericError;