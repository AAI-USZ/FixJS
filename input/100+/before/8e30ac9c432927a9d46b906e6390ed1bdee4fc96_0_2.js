function initFilteredColumn(oSettings, iColumn, bSplitOnComma) {
  if (!oSettings.aoColumns[iColumn].filterSelect) {

    var deDupedOptions = {};
    for (var iRow = 0; iRow < oSettings.aoData.length; ++iRow) {
      var value = oSettings.aoData[iRow]._aData[iColumn];

      // some columns, like the title, don't need to split on comma
      var values = bSplitOnComma ? value.split(',') : [value];

      for (var i = 0; i < values.length; ++i) {
        // normalize - remove whitespace and lowercase
        var value = values[i];
        key = value.replace(/^\s+|\s+$/g,"").toLowerCase();
        deDupedOptions[key] = {value: value, 
                               key: key};
      }
    }
    var options = [];
    for (var key in deDupedOptions) {
      options.push(deDupedOptions[key]);
    }
    options.sort(function(a, b) {
        return a.value > b.value ? 1 : ( a.value === b.value ? 0 : -1 );
    });
    
    var colNameVar = oSettings.aoColumns[iColumn]['input'].replace(' ', '_').toLowerCase();

    var select = $('#filtered_' + colNameVar);
    // If there is no select, then create one - else use existing
    if (select.length == 0) {
      console.error('Could not find #filtered_' + colNameVar + ', creating');
      select = $('<select multiple="multiple" />');
      var container = $('<div class="ui-multiselect"/>');
      container.append(select);
      $(oSettings.aoColumns[iColumn].nTh).append(container);
    }

    for (var i = 0 ; i < options.length; ++i) {
      select.append(new Option(options[i].value, options[i].key));
    }

    // register redrawing
    select.change(function() { oSettings.oInstance.fnDraw(); });
 
    // styling and behavior for the multiselect plugin
    select.select2({
                   placeholder: oSettings.aoColumns[iColumn]['sTitle']
          });

    // This tells the filter which select to use
    oSettings.aoColumns[iColumn].filterSelect = select;

  }
}