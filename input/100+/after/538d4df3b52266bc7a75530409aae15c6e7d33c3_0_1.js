function (userId,stage) {
    var finalState = {};
    if(stage.indexOf('heat') >= 0) {
        finalState = this.categorisedUsers_[this.states_[4]];
        finalState[userId] = this.userData_[userId];
    } else if (stage.indexOf('finals') >= 0) {
        finalState = this.categorisedUsers_[this.states_[5]];
        finalState[userId] = this.userData_[userId];
    }
}