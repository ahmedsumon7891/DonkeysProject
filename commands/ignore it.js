/*CMD
  command: ignore it
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

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to $DONKEY</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            text-align: center;
            margin-top: 50px;
        }
        .welcome-container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            width: 300px;
            margin: 0 auto;
        }
        .bonus {
            font-size: 24px;
            color: #4caf50;
        }
        .logo {
            width: 100px;
            margin: 20px auto;
        }
    </style>
</head>
<body>

    <div class="welcome-container">
        <img src="https://i.ibb.co/KKgHs4T/25ed379c-f4a2-4150-aada-b5c885291e7c.webp" class="logo" alt="$DONKEY Logo">
        <h1>Welcome to $DONKEY!</h1>
        <p>You're about to munch some crypto carrots 🥕</p>
        <div id="bonus" class="bonus">
            Calculating your bonus...
        </div>
    </div>

    <script>
        // Simulate fetching Telegram user data
        let telegramUserID = User.chatId;  // This would come from the bot's user info

        // Function to estimate account creation year
        function estimateAccountCreationYear(userID) {
            if (userID < 50000000) {
                return 2015;
            } else if (userID < 100000000) {
                return 2017;
            } else {
                return 2019;
            }
        }

        // Function to calculate bonus
        function calculateBonus(userID) {
            let creationYear = estimateAccountCreationYear(userID);
            let currentYear = new Date().getFullYear();
            let accountAge = currentYear - creationYear;

            if (accountAge > 5) {
                return 10000;
            } else if (accountAge > 2) {
                return 5000;
            } else {
                return 1000;
            }
        }

        // Display the bonus dynamically
        function displayBonus() {
            let bonus = calculateBonus(telegramUserID);
            document.getElementById("bonus").innerText = `Your bonus: ${bonus} Lions`;
        }

        // Call function to display bonus
        displayBonus();
    </script>

</body>
</html>
