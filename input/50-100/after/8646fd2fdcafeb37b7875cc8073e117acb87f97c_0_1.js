function(state) {
    processPrefix(state, this.prefix);
    var cmds = [];
    var i;
    for(i = 0; i < this.body.length; i++) {
	cmds.push(this.body[i]);
    }
    state.pushManyControls(cmds);
}