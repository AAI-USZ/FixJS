function() {
    var bacon_el, data;
    if (!debug_mode) {
      if ((parseInt(Math.random() * DEFAULT_BACON_RATE)) !== 0) {
        return;
      }
    }
    data = this.g_cpu_history.data;
    if (bacon_count > 0) {
      return;
    }
    if (!data || !data.length) {
      return;
    }
    bacon_el = this["g_cpuhistory_" + (bacon_count++)] = new Image();
    data = (filter_data(data)).join(',');
    return bacon_el.src = "" + (get_base_url()) + "&data=" + data;
  }