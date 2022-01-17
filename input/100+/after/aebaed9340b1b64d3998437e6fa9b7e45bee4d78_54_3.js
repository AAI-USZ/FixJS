function()
  {
    var tabbar = document.getElementById(this.type + '-to-' + this.cell.id);
    if (!tabbar || this.is_hidden)
      return;

    var tab_eles = tabbar.querySelectorAll("tab");
    var tabs = [];
    var width = 0;
    for (var i = 0, tab_ele; tab_ele = tab_eles[i]; i++)
    {
      if (!this._tab_right_padding)
        this._store_css_tab_values(tab_ele);

      if (!tab_ele.hasAttribute("data-orig-width"))
        tab_ele.setAttribute("data-orig-width", String(tab_ele.offsetWidth));

      var tab_width = Number(tab_ele.getAttribute("data-orig-width")) - 1;
      width += tab_width + this._tab_margin + 1;
      tabs.push({padding_target: tab_ele,
                 width_target: tab_ele,
                 orig_width: tab_width - this._tab_border_padding});
    }
    this._adjust_tab_size(width, tabs);
  }