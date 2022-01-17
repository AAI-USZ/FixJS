function() {
  var BACON_SERVER, bacon, bacon_count, filter_data, get_base_url, old_unload_handler, _base;

  if (!this.g_cpu_history) {
    return;
  }

  BACON_SERVER = 'http://www.atpanel.com/ued.1.1.2?type=9&id=cpuhistory';

  bacon_count = 0;

  bacon = function() {
    var bacon_el, data;
    data = this.g_cpu_history.data;
    if (bacon_count > 0) {
      return;
    }
    if (!data || !data.length) {
      return;
    }
    bacon_el = this["g_cpuhistory_" + (bacon_count++)] = new Image();
    data = (filter_data(data)).join(',');
    return alert("" + (get_base_url()) + "&data=" + data);
  };

  filter_data = function(data) {
    var count_100, count_50, item, _i, _len;
    count_100 = 0;
    count_50 = 0;
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      item = data[_i];
      if (item === 100) {
        count_100++;
      } else if (item >= 50) {
        count_50++;
      }
    }
    return [count_100, count_50];
  };

  get_base_url = function() {
    return "" + BACON_SERVER + "&t=" + (+new Date());
  };

  if (typeof (_base = this.g_cpu_history).init === "function") {
    _base.init();
  }

  old_unload_handler = this.onunload;

  this.onunload = function() {
    if (typeof old_unload_handler === "function") {
      old_unload_handler();
    }
    return bacon();
  };

  setTimeout(bacon, 5000);

}