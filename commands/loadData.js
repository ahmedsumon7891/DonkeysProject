/*CMD
  command: loadData
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

const apiMethods = [
  "trackTapWork", // adding balance on tapping
];

// Build URLs for API methods
const apiUrls = apiMethods.reduce((acc, method) => {
  acc[method] = Libs.Webhooks.getUrlFor({ command: method, user_id: user.id });
  return acc;
}, {});

let gameUser = new GameUser(user);

let result = {
  user: gameUser.toJSON(),
  urls: apiUrls
};

// Render result
WebApp.render({
  content: result,
  mime_type: "application/json"
});
