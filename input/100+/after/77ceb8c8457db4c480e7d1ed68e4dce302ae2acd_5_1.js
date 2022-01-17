function OfflineBarPartial($parent) {
  this.e = $('<div></div>').addClass('offline_bar').appendTo($parent);
  this.offline = false;
  this.renderIntervalId = undefined;
  this.retryTimeoutId = undefined;
  this.render();

  BUS.on('rpc.connectionerror', this.switchOffline, this);
  BUS.on('api.notification', this.switchOnline, this);
}