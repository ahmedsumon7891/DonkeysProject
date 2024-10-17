/*CMD
  command: index
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

// JS app file:
var jsApp = WebApp.getUrl({ command: "renderJsApp" })

// command index
WebApp.render({
  template: "index.html",
  // you can pass mime type also:
  // mime_type: "text/html", // html by default
  options: {
    jsApp: jsApp
  }
});
