module.exports = {
  name: 'ping',
  alt: 'p',
  desc: 'Pong ?',
  handler: (message) => {
    message.channel.send('pong');
  }
}