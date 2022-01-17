function TableViewCell(reuseIdentifier) {
  var reuseIdentifier =  this._reuseIdentifier = reuseIdentifier || this._reuseIdentifier;
  var $element = this.$element = $('<li data-reuse-identifier="' + reuseIdentifier + '"/>');
  var element = this.element = $element[0];
  
  element.tableViewCell = this;
}