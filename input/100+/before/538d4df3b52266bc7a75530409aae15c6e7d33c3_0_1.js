function (userId,stage) {
    var finalState = {};
    if(this.states_[this.stateIndex_].indexOf('heat') > 0) {
        finalState = this.categorisedUsers_[this.states_[4]];
        finalState[userId] = this.userData_[userId];
    } else if (this.states_[this.stateIndex_].indexOf('finals') > 0) {
        finalState = this.categorisedUsers_[this.states_[5]];
        finalState[userId] = this.userData_[userId];
    }
}