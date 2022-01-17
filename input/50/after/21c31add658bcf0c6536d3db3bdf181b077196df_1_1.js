function(params, callback, addData) {
  this.request('GET', '/time_entries.json', params, callback, addData);
}