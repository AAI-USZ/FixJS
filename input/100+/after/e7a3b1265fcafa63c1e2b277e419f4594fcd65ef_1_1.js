function() {
    var can, vis, _i, _len, _ref1;
    _ref1 = ['#map_canvas', '#timeline_canvas', '#scatter_canvas', '#bar_canvas', '#histogram_canvas', '#table_canvas', '#viscanvas'];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      can = _ref1[_i];
      ($(can)).hide();
    }
    /* Generate tabs
    */

    for (vis in data.relVis) {
      ($('#vis_select')).append('<li class="vis_tab_' + vis + '"><a href="#">' + data.relVis[vis] + '</a></li>');
    }
    ($('#vis_select > li > a')).css('background-color', '#ccc');
    ($('#vis_select > li > a')).css('border-bottom', '1px solid black');
    ($('.vis_tab_0 > a')).css('background-color', '#fff');
    ($('.vis_tab_0 > a')).css('border-bottom', '1px solid white');
    globals.curVis = eval('globals.' + data.relVis[0].toLowerCase());
    ($('#vis_select > li > a')).unbind();
    /* Change vis click handler
    */

    ($('#vis_select')).children().children().click(function() {
      if (global.curVis != null) {
        globals.curVis.end();
      }
      /* Remove old selection
      */

      ($('#vis_select  > li > a')).css('background-color', '#ccc');
      ($('#vis_select  > li > a')).css('border-bottom', '1px solid black');
      globals.curVis = eval('globals.' + this.text.toLowerCase());
      /* Set new selection
      */

      ($(this)).css("background-color", "#ffffff");
      ($(this)).css('border-bottom', '1px solid white');
      return globals.curVis.start();
    });
    return globals.curVis.start();
  }