/*CMD
  command: @
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

const BASE_ENERGY = 1000;

class GameUser {
  constructor(user) {
    Object.assign(this, user); // copy all user properties to this object
    this._loadAllResources();
    this._initializeGeneralData();
    this.energy = this.energyRes.value();
  }

  toJSON() {
    const { energyRes, ...jsonObject } = this;
    return jsonObject;
  }

  addBalance(amount) {
    this._setBalance(this.balance + amount);
  }

  // Save new balance to user and energy
  trackTapWork(params) {
    if (params.energy > this.energy) {
      return { error: "Not enough energy. You have only: " + this.energy };
    }
    if (params.balance <= 0) {
      return { error: "Balance can't be negative" };
    }
    if (params.balance < user.balance) {
      return { error: "Balance can't be decreased on TapWork" };
    }
    // Can't be more than energy * level
    if (params.balance > this.energy * this.level) {
      return { error: "Balance can't be more than energy * level" };
    }
    this._setBalance(params.balance);
    this._setEnergy(params.energy);
    return { success: true };
  }

  // Delete all user data
  reset() {
    User.deleteProp("generalData");
    User.deleteProp("balance");

    const balanceRes = Libs.ResourcesLib.userRes("balance");
    balanceRes.set(0);
    balanceRes.growth.remove();
    this.balance = 0;

    this.setEnergyGrowth();
  }

  private

  // We save TapWork once at 20 times so we can have small slip
  _balance_slip() {
    return this.level * 20;
  }

  _setBalance(balance) {
    this.balance = balance;
    Libs.ResourcesLib.userRes("balance").set(balance);
  }

  _setEnergy(energy) {
    this.energy = energy;
    this.energyRes.set(energy);
  }

  _loadAllResources() {
    const balanceRes = Libs.ResourcesLib.userRes("balance");
    this.balanceGrowth = balanceRes.growth.info();
    this.balance = balanceRes.value();
    this.energyRes = Libs.ResourcesLib.userRes("energy");
  }

  _initializeGeneralData() {
    let generalData = User.getProp("generalData") || this._createDefaultGeneralData();
    if (generalData.justStarted) {
      delete generalData.justStarted;
      User.setProp("generalData", generalData);
    }
    Object.assign(this, generalData);
  }

  _createDefaultGeneralData() {
    return {
      level: 1,
      energyGrowth: this.setEnergyGrowth(),
      completedTasks: {},
      justStarted: true
    };
  }

  setEnergyGrowth() {
    const maxValue = BASE_ENERGY * (this.level || 1);
    this.energyRes.set(maxValue);
    const energyPerSecond = maxValue / (60 * 60);
    this.energyRes.growth.add({ value: energyPerSecond, interval: 1, max: maxValue });
    return this.energyRes.growth.info();
  }

  _saveGeneralData() {
    User.setProp("generalData", {
      level: this.level,
      energyGrowth: this.energyRes.growth.info(),
      completedTasks: this.completedTasks
    });
  }
}
