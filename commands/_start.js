/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var logo = "https://i.ibb.co/KKgHs4T/25ed379c-f4a2-4150-aada-b5c885291e7c.webp";

let loadUrl = Libs.Webhooks.getUrlFor({
  command: "loadData",
  // it is personal for user
  user_id: user.id
});

var first = user.first_name;
var last = user.last_name;
var username = user.username;
var fullname = first + " " + last; // Add a space between first and last name

let web = WebApp.getUrl({
  command: "index",
  options: {
    loadUrl: loadUrl
  }
});

// Send photo with a button that leads to the web app
Api.sendPhoto({
  photo: logo,
  caption: "*How cool are you, Donkey? Let's find out 😼*\n_Get ready to munch on some crypto carrots with $DONKEY!_",
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      [{ text: "LET'S GO", web_app: { url: web }}]
    ]
  }
});


