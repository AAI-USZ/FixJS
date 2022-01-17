function(set) {
    var index = this.sets.indexOf(set);
    this.sets = this.sets.splice(index, 1);
}