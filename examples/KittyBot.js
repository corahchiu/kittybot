/*
  KittyBot
  Shows random Kitty pictures and gifs.
*/

const TeleBot = require('../');
const bot = new TeleBot('397572431:AAFQNPtB2mJam80OwAMkeZ5IoNFrkV-Xoxk');

// Great API for this bot
const API = 'https://thecatapi.com/api/images/get?format=src&type=';
// const API = 'http://thedogapi.co.uk/api/v1/dog?limit=1';
// const dog = API.data;

// Command keyboard
const replyMarkup = bot.keyboard([
    ['/kitty', '/kittygif']
], {resize: true, once: false});

// Log every text message
bot.on('text', function (msg) {
    console.log(`[text] ${ msg.chat.id } ${ msg.text }`);
});

// On command "start" or "help"
bot.on(['/start', '/help'], function (msg) {

    return bot.sendMessage(msg.chat.id,
        '😺 Looking at cat pictures does wonders. Research says that looking at cat pictures or videos on the internet boosts energy and positive emotions. So when you are feeling blue, generate a random cat picture or gif with this bot by typing /kitty or /kittygif and cheer up!', {replyMarkup}
    );

});

// On command "about"
bot.on('/about', function (msg) {

    let text = '😽 This bot is powered by TeleBot library ' +
        'https://github.com/kosmodrey/telebot Go check the source code!';

    return bot.sendMessage(msg.chat.id, text);

});

// On command "kitty" or "kittygif"
bot.on(['/kitty', '/kittygif'], function (msg) {

    let promise;
    let id = msg.chat.id;
    let cmd = msg.text.split(' ')[0];

    // Photo or gif?
    if (cmd == '/kitty') {
        // promise = bot.sendMessage(id, JSON.stringify(API))
        promise = bot.sendPhoto(id, API + 'jpg', {
            fileName: 'kitty.jpg',
            serverDownload: true
        });
        promise.then(console.log(API))
    } else {
        promise = bot.sendDocument(id, API + 'gif#', {
            fileName: 'kitty.gif',
            serverDownload: true
        });
    }

    // Send "uploading photo" action
    bot.sendAction(id, 'upload_photo');

    return promise.catch(error => {
        console.log('[error]', error);
        // Send an error
        bot.sendMessage(id, `😿 An error ${ error } occurred, try again.`);
    });

});

// Start getting updates
bot.start();
