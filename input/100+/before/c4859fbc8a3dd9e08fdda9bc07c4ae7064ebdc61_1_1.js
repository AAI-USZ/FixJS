function makeFileSummarySelect(dataObject, selected_files, experiment_id, fieldLabel) {
    var dataObject = dataObject.slice(0) || []; //make a shallow copy of dataObject to protect METADATA from splicing later
    var fieldLabel = fieldLabel || 'files'; // can override
    var form_id = form_id || 0;
    var selected_files = selected_files || []

    // Generates the "range graphic" in the cells of the file gridpanel
    function vrange(val, meta, record, rI, cI, store) {
        --cI; //cI (columnIndex) was one too high because of the checkboxes column taking index 0.
        var range = maxvals[cI] - minvals[cI];
        var spl = val.split(',');
        var low = parseFloat(spl[0]);
        var high = parseFloat(spl[1]);
        var roffset = 0;
        var loffset = 0;
        if (range != 0) {
            loffset = ((low - minvals[cI]) / range) * 100 - 1;
            roffset = ((maxvals[cI] - high) / range) * 100 - 1;
        }
        
        if (range != 0 && low != NaN && high != NaN) {
            return '<div class="woot" low=' + low + ' high=' + high + '><div style="margin-right:' + roffset + '%; margin-left:' + loffset + '%;"></div></div>';
        } else {
            return '<div class="woot empty" low=' + low + ' high=' + high + '></div>';
        }
    }

    //Creating store and grid.
    Ext.regModel('fileModel', {
        fields: storeFields
    });
    var storeFields = [];
    var store = Ext.create('Ext.data.Store', { model: 'fileModel'});
    var gridColumns = [];
    var myCheckboxModel = new Ext.selection.CheckboxModel(); //just a reference
    
    var fieldData = dataObject[0]; //First row is the parameters of the data file (e.g. ['X', 'Y', 'Z',...])    
    var maxvals = dataObject[1];   //Second row is the max values of the parameters over all files (used for rendering ranges)
    var minvals = dataObject[2];   //Third row is min values of parameters
    dataObject.splice(0, 3);       //Remove first three rows; the rest is the actual data
    var datalen = dataObject.length;

    //add all files to the store..
    var filerecs=[];
    for (var j = 0; j < datalen; ++j) {
        var filerec={}
        for (var i = 0; i < fieldData.length; ++i) {
            filerec[fieldData[i]] = dataObject[j][i];
        }
        filerecs.push(filerec);
    }

    // the first two columns of checkboxes and "Available Files" are not
    // rendered using the standard renderer
    gridColumns.push({header: fieldData[0], width: 100, sortable: true, dataIndex: fieldData[0]});
    storeFields.push({name: fieldData[0]});

    for (var i = 1; i < fieldData.length; ++i) {
        gridColumns.push({header: fieldData[i], width: 100, renderer: vrange, sortable: true, dataIndex: fieldData[i]});
        storeFields.push({name: fieldData[i]});
    }
   
    store.loadData(filerecs);

    // Pre selecting the rows that were previously submitted.
    // NOTE: API functions, such as .selectAll(), .select(), .doSelect(), etc. all threw unexplained
    //       errors and frequently failed to do what they should do. Introduced hack of adding
    //       directly to supposedly read-only .selected field.
    if (selected_files.length === datalen) {
        // if all are selected, no need to search for individual files, just select them all one by one.
        Ext.each(store.getRange(), function(record, i){
            myCheckboxModel.selected.add(record);
        });
    } else {
        Ext.each(selected_files, function(afile, index) {
            Ext.each(store.getRange(), function(record, i){
                if (record.get('Available Files') === afile) {
                    myCheckboxModel.selected.add(record);
                    return false; //break out of Ext.each when function returns false
                }
            });
        });
    }

    
    /* GridPanel that displays the data. Filled with empty columns since they are populated with update() */
    var filesummarygrid = new Ext.grid.GridPanel({
        store: store,
        selModel: myCheckboxModel, //new Ext.selection.CheckboxModel(),
        columns: gridColumns,
        stripeRows: true,
        fieldLabel: fieldLabel,
        height: 300,
        autoWidth: true,
        title: 'Select the files to run reductions on:',
        bbar: [],
        reverse_lookup_id: form_id,
    });

    // For more information on tooltips, see Ext.tip.Tooltip documentation
    filesummarygrid.getView().on('render', function(view) {
        view.tip = Ext.create('Ext.tip.ToolTip', {
            target: view.el,                // The overall target element.
            delegate: view.cellSelector,    // Each grid cell causes its own seperate show and hide.
                                            // NOTE: To do each grid row ==> view.itemSelector
            trackMouse: true,               // Moving within the row should not hide the tip.
            listeners: {
                // Change content dynamically depending on which element triggered the show.
                beforeshow: function updateTipBody(tip) {
                    try {
                        // the divs (constructed in vrange function) have 'low' and 'high' attributes.
                        var lowtxt = tip.triggerElement.firstChild.firstChild.getAttribute('low');
                        var hightxt = tip.triggerElement.firstChild.firstChild.getAttribute('high');
                        if (lowtxt == null || hightxt == null) {
                            //both lowtxt and hightxt are null for the checkbox column
                            tip.update('Clicking a row will deselect other rows. Checking a checkbox will not');
                        } else {
                            // display value range tooltip for applicable cells
                            tip.update('Range: [' + lowtxt + ', ' + hightxt + ']');
                        }
                    } catch (err) {
                        tip.update('Mouse over a cell to view its numeric range.');
                    }
                }
            }
        });
    });


    //NOTE: below code commented because the update was asynchronous, so METADATA is simply loaded
    //      into editor.html on pageload.

    /* After data is retrieved from server, we have to reinitiallize the Store reconfigure the grid
    so that the new data is displayed on the page */
    /*
    function reload_data(){
        var fieldData = dataObject[0]; //First row is the parameters of the data file (e.g. ['X', 'Y', 'Z', 'Temp'])    
        maxvals = dataObject[1];       //Second row is the max values of the parameters over all files (used for rendering ranges)
        minvals = dataObject[2];       //Third row is min values of parameters
        dataObject.splice(0, 3);       //Remove first three rows; the rest is the actual data

        //add all files to the store..
        var filerecs=[];
	    for (var j = 0; j < dataObject.length; ++j) {
	        var filerec={}
	        for (var i = 0; i < fieldData.length; ++i) {
		        filerec[fieldData[i]] = dataObject[j][i];
	        }
	        filerecs.push(filerec);
	    }

        if (!table_is_created) {
            storeFields = [];
            var gridColumns = [];

            // the first two columns of checkboxes and "Available Files" are not
            // rendered using the standard renderer
            gridColumns.push({header: fieldData[0], width: 100, sortable: true, dataIndex: fieldData[0]});
            storeFields.push({name: fieldData[0]});

            for (var i = 1; i < fieldData.length; ++i) {
                gridColumns.push({header: fieldData[i], width: 100, renderer: vrange, sortable: true, dataIndex: fieldData[i]});
                storeFields.push({name: fieldData[i]});
            }

            Ext.regModel('fileModel', {
                fields: storeFields
            });
            //var store = Ext.create('Ext.data.Store', { model: 'fileModel'});
            filesummarygrid.columns = gridColumns;
            
            store.loadData(filerecs);
            //filesummarygrid.store = store;

            filesummarygrid.getView().refresh();

            table_is_created = true;
        } else {
            filesummarygrid.store.loadData(filerecs);
            filesummarygrid.getView().refresh();
        }
        
    };
    


    //Retrieve data in json format via a GET request to the server. This is used
    //anytime there is new data, and initially to populate the table.
    function update() {
        var conn = new Ext.data.Connection();
        conn.request({
            url: '/metadatajson/',
            method: 'GET',
            params: {'experiment_id': experiment_id},
            success: function(responseObject) {
                dataObject = Ext.decode(responseObject.responseText); //decodes the response
                reload_data();                                      //resets the store and grids
                
            },
            failure: function() {
                alert("failure with GET!");
            }
        });
	    
    }
    update();
    */

    return filesummarygrid;
}