/*CMD
  command: balance
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

let gameUser = new GameUser(user);
Bot.sendMessage("Your balance: " + gameUser.balance);
