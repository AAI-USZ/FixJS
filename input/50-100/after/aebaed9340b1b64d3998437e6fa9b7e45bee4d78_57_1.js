function(cell)
{
  this.init(this, arguments);
  this._history = [];
  this.tabs = [];
  this.activeTab = '';
  this.cell = cell;
  window.messages.add_listener("window-controls-created",
                               this._on_window_controls_created.bind(this));
}