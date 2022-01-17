function(){
    // If the data grid has already been built, nothing to do here
    if (this.spreadsheet.datagrid) return this.spreadsheet.datagrid;
    
    var s = this.series,
        datagrid = this.spreadsheet.loadDataGrid(),
        colgroup = ['<colgroup><col />'],
        buttonDownload, buttonSelect, t;
    
    // First row : series' labels
    var html = ['<table class="flotr-datagrid"><tr class="first-row">'];
    html.push('<th>&nbsp;</th>');
    _.each(s, function(serie,i){
      html.push('<th scope="col">'+(serie.label || String.fromCharCode(65+i))+'</th>');
      colgroup.push('<col />');
    });
    html.push('</tr>');
    // Data rows
    _.each(datagrid, function(row){
      html.push('<tr>');
      _.times(s.length+1, function(i){
        var tag = 'td',
            value = row[i],
            // TODO: do we really want to handle problems with floating point
            // precision here?
            content = (!_.isUndefined(value) ? Math.round(value*100000)/100000 : '');
        if (i === 0) {
          tag = 'th';
          var label = getRowLabel.call(this, content);
          if (label) content = label;
        }

        html.push('<'+tag+(tag=='th'?' scope="row"':'')+'>'+content+'</'+tag+'>');
      }, this);
      html.push('</tr>');
    }, this);
    colgroup.push('</colgroup>');
    t = D.node(html.join(''));

    /**
     * @TODO disabled this
    if (!Flotr.isIE || Flotr.isIE == 9) {
      function handleMouseout(){
        t.select('colgroup col.hover, th.hover').invoke('removeClassName', 'hover');
      }
      function handleMouseover(e){
        var td = e.element(),
          siblings = td.previousSiblings();
        t.select('th[scope=col]')[siblings.length-1].addClassName('hover');
        t.select('colgroup col')[siblings.length].addClassName('hover');
      }
      _.each(t.select('td'), function(td) {
        Flotr.EventAdapter.
          observe(td, 'mouseover', handleMouseover).
          observe(td, 'mouseout', handleMouseout);
      });
    }
    */

    buttonDownload = D.node(
      '<button type="button" class="flotr-datagrid-toolbar-button">' +
      this.options.spreadsheet.toolbarDownload +
      '</button>');

    buttonSelect = D.node(
      '<button type="button" class="flotr-datagrid-toolbar-button">' +
      this.options.spreadsheet.toolbarSelectAll+
      '</button>');

    this.
      observe(buttonDownload, 'click', _.bind(this.spreadsheet.downloadCSV, this)).
      observe(buttonSelect, 'click', _.bind(this.spreadsheet.selectAllData, this));

    var toolbar = D.node('<div class="flotr-datagrid-toolbar"></div>');
    D.insert(toolbar, buttonDownload);
    D.insert(toolbar, buttonSelect);

    var containerHeight =this.canvasHeight - D.size(this.spreadsheet.tabsContainer).height-2,
        container = D.node('<div class="flotr-datagrid-container" style="position:absolute;left:0px;top:0px;width:'+
          this.canvasWidth+'px;height:'+containerHeight+'px;overflow:auto;z-index:10"></div>');

    D.insert(container, toolbar);
    D.insert(container, t);
    D.insert(this.el, container);
    this.spreadsheet.datagrid = t;
    this.spreadsheet.container = container;

    return t;
  }