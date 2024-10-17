/*CMD
  command: index.html
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
  <title>$DONKEY Web App</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
  <style>
    /* General Styles */
    body, html {
      background-color: #000;
      color: #fff;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    /* Content Wrapper */
    .content {
      flex: 1;
      overflow-y: auto;
    }

    /* Header Section (Profile & Balance) */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      background-color: #1d2733;
      border-radius: 0 0 15px 15px;
    }

    .profile-pic {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #242d39;
    }

    .profile-pic img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    .username {
      font-size: 20px;
      font-weight: bold;
    }

    /* Circle Logo */
    .circle-logo {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      background-color: #242d39;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 40px auto;
      cursor: pointer; /* Make the logo clickable */
    }

    .circle-logo img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    /* Balance Box */
    .balance-box {
      text-align: center;
      margin-top: 20px;
    }

    .balance-amount {
      font-size: 30px;
      font-weight: bold;
      color: #FFD700;
    }

    .energy-level {
      font-size: 18px;
      color: #fff;
    }

    /* Footer Navigation */
    footer {
      background-color: #151e27;
      padding: 20px;
      color: #ffffff;
      position: fixed;
      width: 100%;
      bottom: 0;
      border-radius: 15px 15px 0 0;
    }

    .nav-bar {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .nav-item {
      text-align: center;
      font-size: 14px;
    }

    .nav-item i {
      font-size: 24px;
      display: block;
      color: #FFD700;
    }

    /* Sections for Home, Friends, Tasks */
    .section {
      display: none;
      text-align: center;
    }

    .active {
      display: block;
    }

    .task-item {
      margin: 10px 0;
      background-color: #1e2a35;
      padding: 15px;
      border-radius: 10px;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .task-item p {
      margin: 0;
    }

    .task-item button, .copy-btn {
      background-color: #FFD700;
      border: none;
      color: #000;
      padding: 10px;
      border-radius: 5px;
      margin-top: 10px;
    }
  </style>
</head>
<body>

  <div id="app"> <!-- Bind Vue instance here -->
    <!-- Header with Profile Picture and Balance -->
    <div class="header">
      <div class="profile-pic">
        <img src="https://i.ibb.co/N6LftYz/file-Pf-Hw-Fg-Ipr-Yp-IE016-WXNm-IYK4.webp" alt="profile-pic" id="profile-pic">
      </div>
      <span class="username">{{ user.username }}</span>
    </div>

    <!-- Main Content Sections -->
    <div class="content">

      <!-- Home Section -->
      <div class="section active" id="home-section">
        <div class="circle-logo" @click="tap"> <!-- Call tap method on click -->
          <img src="https://i.ibb.co/KKgHs4T/25ed379c-f4a2-4150-aada-b5c885291e7c.webp" alt="logo">
        </div>
        <div class="balance-box">
          <span class="balance-amount">{{ user.balance }} $DONKEYS</span>
          <div class="energy-level">Energy: {{ user.energyRes }}</div>
        </div>
      </div>

      <!-- Friends Section -->
      <div class="section" id="friends-section">
        <h2>Friends</h2>
        <p>Referral Link: <span id="referral-link">https://t.me/YourBot?start=referral_code</span></p>
        <button class="copy-btn" onclick="copyReferralLink()">Copy Referral Link</button>
        <h3>Referred Friends:</h3>
        <ul id="referred-list">
          <li>John Doe - 0123456789</li>
          <li>Jane Smith - 9876543210</li>
        </ul>
      </div>

      <!-- Tasks Section -->
      <div class="section" id="tasks-section">
        <h2>Tasks</h2>
        <div class="task-item">
          <p>Join our Telegram Group</p>
          <a href="https://t.me/joinchat/GroupLink"><button>Check</button></a>
        </div>
        <div class="task-item">
          <p>Join our Telegram Channel</p>
          <a href="https://t.me/ChannelLink"><button>Check</button></a>
        </div>
      </div>
      
    </div>

    <!-- Footer Navigation -->
    <footer>
      <nav class="nav-bar">
        <div class="nav-item" onclick="showSection('home-section')">
          <i class="icon-home">🏠</i>
          <span>Home</span>
        </div>
        <div class="nav-item" onclick="showSection('friends-section')">
          <i class="icon-friends">👥</i>
          <span>Friends</span>
        </div>
        <div class="nav-item" onclick="showSection('tasks-section')">
          <i class="icon-tasks">⭐</i>
          <span>Tasks</span>
        </div>
      </nav>
    </footer>
  </div>

<script>
  // Vue.js component setup
  new Vue({
  el: '#app',
  data: {
    user: {
      username: '',
      telegramid: '',
      balance: 0,
      energy: 0,
      energyRes: 0,
    },
    loadUrl: new URL(window.location.href).searchParams.get("loadUrl"),
    isStarted: false,
    buildings: [],
    ApiUrls: {},
    totalTapsCount: 0,
    topAlert: {
      enabled: false,
      text: ''
    },
    referredFriends: [],
    referralLink: 'https://t.me/YourBot?start=referral_code',
    tasks: [
      { name: "Join our Telegram Group", url: "https://t.me/joinchat/GroupLink", completed: false },
      { name: "Join our Telegram Channel", url: "https://t.me/ChannelLink", completed: false }
    ],
  },
  mounted() {
    this.loadUserData();
    this.fetchReferredFriends();
  },
  methods: {
    // Fetches user data from the server, including balance and energy
    loadUserData() {
      fetch(this.loadUrl)
        .then(response => response.json())
        .then(data => {
          this.user = data.user;
          this.user.energyRes = initRes(this.user.energy, data.user.energyGrowth);
          this.buildings = data.buildings;
          this.ApiUrls = data.urls;
          this.renderAllRes();
          setInterval(this.renderAllRes, 1000);
          this.isStarted = true;
        })
        .catch(error => {
          this.showAlert({ text: 'Error loading user data: ' + error.message, liveTime: 3000 });
        });
    },
    
    // Periodically updates energy and balance rendering
    renderAllRes() {
      this.user.energy = Math.round(this.user.energyRes.value());
      this.user.maxEnergy = this.user.energyRes.growth.info().max;
    },
    
    // Called when tapping on the logo; increments balance and syncs with the server
    tap() {
      const reward = 1; // Define reward for each tap
      this.user.balance += reward; // Increment balance
      this.totalTapsCount++;

      // Sync balance with the server
      this.syncBalance();
    },
    
    // Sync balance and energy with the server
    syncBalance() {
      fetch(this.ApiUrls.syncBalance, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          balance: this.user.balance, 
          energy: this.user.energy 
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          this.showAlert({ text: 'Error syncing balance: ' + data.error, liveTime: 3000 });
        } else {
          console.log('Balance synced:', this.user.balance);
        }
      })
      .catch(error => {
        this.showAlert({ text: 'Network error: ' + error.message, liveTime: 3000 });
      });
    },

    // Fetch referred friends from the server
    fetchReferredFriends() {
      fetch(this.ApiUrls.getReferredFriends)
        .then(response => response.json())
        .then(data => {
          this.referredFriends = data.friends;
        })
        .catch(error => {
          this.showAlert({ text: 'Error fetching friends: ' + error.message, liveTime: 3000 });
        });
    },

    showAlert(params) {
      this.topAlert = params;
      this.topAlert.enabled = true;
      if (this.topAlert.liveTime) {
        setTimeout(() => {
          this.topAlert.enabled = false;
        }, this.topAlert.liveTime);
      }
    },
  }
});
</script>

</body>
</html>
