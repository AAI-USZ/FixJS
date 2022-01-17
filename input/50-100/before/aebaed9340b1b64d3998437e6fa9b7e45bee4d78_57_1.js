function(cell)
{
  this.init(this, arguments);
  this._history = [];
  this.tabs = [];
  this.activeTab = '';
  this.cell = cell;
}