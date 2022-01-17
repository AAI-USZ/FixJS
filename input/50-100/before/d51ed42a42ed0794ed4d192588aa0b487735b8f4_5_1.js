function(id, name, container_class)
  {
    this.requierd_services = ["ecmascript-debugger"];
    this._highlighter = new VirtualTextSearch();
    this._highlight_style = this._highlighter.get_match_style('highlight');
    this.init(id, name, container_class, '', 'clear-search-hit');
    var clear_search_hit = this._onscroll.bind(this);
    eventHandlers.scroll['clear-search-hit'] = clear_search_hit;
    window.messages.addListener("panel-search-executed", clear_search_hit);
  }