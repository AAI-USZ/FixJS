function makeFileSummarySelect(dataObject, selected_files, experiment_id, fieldLabel) {
    var dataObject = dataObject.slice(0) || []; //make a shallow copy of dataObject to protect METADATA from splicing later
    var fieldLabel = fieldLabel || 'files'; // can override
    var form_id = form_id || 0;
    //var table_is_created = false;

    // Generates the "range graphic" in the cells of the file gridpanel
    function vrange(val, meta, record, rI, cI, store) {
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
        var ret = high + low;
        if (range != 0 && low != NaN && high != NaN) {
            return '<div class="woot"><div style="margin-right:' + roffset + '%; margin-left:' + loffset + '%;"></div></div>';
        } else {
            return '<div class="woot empty"></div>';
        }
    }

    //Creating store and grid.
    Ext.regModel('fileModel', {
        fields: storeFields
    });
    var storeFields = [];
    var store = Ext.create('Ext.data.Store', { model: 'fileModel'});
    var gridColumns = [];
    //var selectedfiles = [];
    /*
    var myCheckboxModel = new Ext.selection.CheckboxModel({
        //checkOnly: true,
        listeners: {
            selectionchange: function (selectionModel, selected, options) {
                // Must refresh the view after every selection
                selectionModel.view.refresh();
            }
        }
    });
    */
    var fieldData = dataObject[0]; //First row is the parameters of the data file (e.g. ['X', 'Y', 'Z',...])    
    var maxvals = dataObject[1];   //Second row is the max values of the parameters over all files (used for rendering ranges)
    var minvals = dataObject[2];   //Third row is min values of parameters
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

    // the first two columns of checkboxes and "Available Files" are not
    // rendered using the standard renderer
    gridColumns.push({header: fieldData[0], width: 100, sortable: true, dataIndex: fieldData[0]});
    storeFields.push({name: fieldData[0]});

    for (var i = 1; i < fieldData.length; ++i) {
        gridColumns.push({header: fieldData[i], width: 100, renderer: vrange, sortable: true, dataIndex: fieldData[i]});
        storeFields.push({name: fieldData[i]});
    }
   
    store.loadData(filerecs);



    /* GridPanel that displays the data. Filled with empty columns since they are populated with update() */
    var filesummarygrid = new Ext.grid.GridPanel({
        store: store,
        selModel: new Ext.selection.CheckboxModel(),
        columns: gridColumns,
        stripeRows: true,
        fieldLabel: fieldLabel,
        height: 300,
        autoWidth: true,
        title: 'Select the files to run reductions on:',
        bbar: [],
        reverse_lookup_id: form_id,
        getValue: function (){
            
        }
    });

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

    //NOTE: above commented because we decided to have the table in editor.html

    return filesummarygrid;
}