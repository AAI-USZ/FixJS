function(useWholeRow) {
  this.map.pop();
  this.map.unshift(this.generateMapRow(useWholeRow));
}