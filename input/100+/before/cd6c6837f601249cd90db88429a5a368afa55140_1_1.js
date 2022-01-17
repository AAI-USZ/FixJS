function() {
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
  }