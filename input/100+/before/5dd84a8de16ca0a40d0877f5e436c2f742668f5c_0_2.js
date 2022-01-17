function () {
    /* 

     */

    //The following line is evil and worse, it is impolite.    We should try to replace it!!
      
    var aField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'a',
        labelPad:'2',
        labelWidth:'19',
        labelAlign:'left',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 50
    });

    var bField = Ext.create('Ext.form.field.Number',{
        fieldLabel: '__b',
        labelPad:'2',
        labelWidth:'30',
        labelAlign:'left',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 90
    });

    var cField = Ext.create('Ext.form.field.Number',{
        fieldLabel: '__c',
        labelPad:'2',
        labelWidth:'19',
        labelAlign:'left',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 80
    });

    var alphaField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'α',
        labelPad:'2',
        labelWidth:'19',
        labelAlign:'left',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 80
    });

    var betaField = Ext.create('Ext.form.field.Number',{
        fieldLabel: '__β',
        labelPad:'2',
        labelWidth:'19',
        labelAlign:'left',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '1',
        hideTrigger: true,
	maxWidth: 90
    });

    var gammaField = Ext.create('Ext.form.field.Number',{
        fieldLabel: '__γ',
        labelPad:'2',
        labelWidth:'19',
        labelAlign:'left',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 80
    });

    var spaceGroupField = Ext.create('Ext.form.field.Number',{
        fieldLabel: 'Space Group',
        labelPad:'2',
        labelWidth:'2',
        labelAlign:'top',
        allowBlank: false,
        decimalPrecision: 7,
        anchor: '-1',
        hideTrigger: true,
	maxWidth: 80
    });




    // ********* START - Setting up lattice constants GUI  *********
     Ext.regModel('deviceModel', {
        fields:[
            {name:'Symbol', type:'string'},
            'Element',
            {name:'Wyckoff Position', type:'string'},
	    {name:'X', type:'string'},
            'Y',
            {name:'Z', type:'string'},
	    {name:'Occupancy', type:'string'},
	    {name:'B', type: 'string'}
        ]
    });



    Ext.regModel('resultsModel', {
        fields:[
            {name:'2Ѳ', type:'number'},
            {name:'h', type:'number'},
            {name:'k', type:'number'},
            {name:'l', type:'number'},
            {name:'|F|', type:'number'}
        ]
    });
    
    
    var myData = [
        ['Ag', 'Silver', '2a' , 0.5, 0.25, 0.25, 4, 6], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ], ['', '', '', , , , , ],
    ];
    
    var store = Ext.create('Ext.data.Store', { model:'deviceModel', data: myData});



    var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    });

    var resultColumns = [];
    resultColumns.push({header: '2Ѳ', width:70, sortable:true, dataIndex:'2Ѳ'});
    resultColumns.push({header: 'h', width:70, sortable:true, dataIndex:'h'});
    resultColumns.push({header: 'k', width:70, sortable:true, dataIndex:'k'});
    resultColumns.push({header: 'l', width:70, sortable:true, dataIndex:'l'});
    resultColumns.push({header: '|F|', width:70, sortable:true, dataIndex:'|F|'});


    var myResults= [1, 2, 3, 4, 5]
    var resultsStore = Ext.create('Ext.data.Store', { model:'resultsModel', data: myResults});


    var result = new Ext.grid.GridPanel({
      store:resultsStore,
      columns:resultColumns,
      stripeRows:true,
      height:350,
      width:350,
      plugins: [cellEditing],
      title:'Result Calculations',
      collapsible: true,
      animCollapse: false
    });

    //result.render('resulttest');

    var gridColumns = [];

    gridColumns.push({header:'Symbol', width:120, sortable:true, dataIndex:'Symbol', editor: new Ext.form.field.ComboBox({
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: [
		    ['Ag', 'Ag'], 
		    ['Al', 'Al'],
		    ['Am', 'Am']
                ],
            })});
    gridColumns.push({header:'Element', width:120, hidden:false, sortable:true, dataIndex:'Element', editor: new Ext.form.field.ComboBox({
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: [
		    ['Silver', 'Silver'], 
		    ['Aluminum', 'Aluminum'],
		    ['Americium', 'Americium']
                ],
            })});
    gridColumns.push({header:'Wyckoff Position', width:120, hidden:false, sortable:true, dataIndex:'Wyckoff Position', editor: {
                xtype: 'textfield',
                allowBlank: false}})
    gridColumns.push({header:'X', width:120, sortable:true, dataIndex:'X', editor: {
                xtype: 'numberfield',
                allowBlank: false,
            }});
    gridColumns.push({header:'Y', width:120, hidden:false, sortable:true, dataIndex:'Y', editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 0,
                maxValue: 100000
            }});
    gridColumns.push({header:'Z', width:120, hidden:false, sortable:true, dataIndex:'Z', editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 0,
                maxValue: 100000
            }});
    gridColumns.push({header:'Occupancy', width:120, sortable:true, dataIndex:'Occupancy', editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 0,
                maxValue: 100000
            }});
    gridColumns.push({header:'B', width:120, hidden:false, sortable:true, dataIndex:'B', editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 0,
                maxValue: 100000
            }});
   
    /*GridPanel that displays the data*/
    var grid = new Ext.grid.GridPanel({
        store:store,
        columns:gridColumns,
        stripeRows:true,
        height:350,
        width:950,
        plugins: [cellEditing],
        title:'Element Information',
        collapsible: true,
        animCollapse: false
	
    });

    //grid.render('gridtest');



   
    var latticeFieldSetTop = {
        xtype       : 'fieldset',
        border      : false,
        defaultType : 'textfield',
        layout: { type: 'hbox',
                  pack: 'start'
        },
        defaults    : {allowBlank : false,
                       decimalPrecision: 10,
                       labelPad:'2',
                       labelWidth:'2',
                       labelAlign:'left',
                       anchor: '100%',
                       hideTrigger: true,
                       style: {'margin': '0px 5px 5px 0px',
                               'border':0,
                               'paddingRight':15
                       },
                       flex:1
                      },
        items: [{fieldLabel: 'a',
                 name: 'a'
                 },
                {fieldLabel: 'b',
                 name: 'b'
                },
                {fieldLabel: 'c',
                 name: 'c'
                }
               ]
        };

    var latticeFieldSetMiddle = {
        xtype       : 'fieldset',
        border      : false,
        defaultType : 'textfield',
        layout: { type: 'hbox',
            pack: 'start'
        },
        defaults    : {allowBlank : false,
            decimalPrecision: 10,
            labelPad:'2',
            labelWidth:'2',
            labelAlign:'left',
            anchor: '100%',
            hideTrigger: true,
            style: {'margin': '0px 5px 5px 0px',
                'border':0,
                'paddingRight':15
            },
            flex:1
        },
        items: [{fieldLabel: 'α',
            name: 'alpha'
        },
            {fieldLabel: 'β',
                name: 'beta'
            },
            {fieldLabel: 'γ',
                name: 'gamma'
            }
        ]
    };


    var spaceGroups = Ext.create('Ext.data.Store', {
        fields: ['number', 'name'],
        store : [
            {"abbr":"1", "name":"P 1"},
            {"abbr":"2", "name":"P -1"},
            {"abbr":"3", "name":"P 2"}
            //...
        ]
    });

    var spaceGroupCombo= Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Choose Space Group',
        store: spaceGroups,
        queryMode: 'local',
        displayField: 'name',
        valueField: 'abbr'
    });


    var spaceGroupSetting = Ext.create('Ext.data.Store', {
        fields: ['number', 'name'],
        data : [
            {"abbr":"1", "name":"1"},
            {"abbr":"2", "name":"2"},
            {"abbr":"3", "name":"3"}
            //...
        ]
    });


    var spaceGroupSettingCombo= Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Space Group Setting',
        store: spaceGroupSetting,
        queryMode: 'local',
        displayField: 'name',
        valueField: 'abbr'
    });

    var innerRightTopPanel = {
        xtype       : 'form',
        border      : false,
        title: 'LatticeParameters',
        labelWidth: '2',
        labelAlign: 'left',
        labelPad: '5',
        frame: true,
	height: 350,
        defaultMargin : {top: 0, right: 5, bottom: 0, left: 5},
        padding: '0 5 0 5',
        //columnWidth: 0.5,
        //anchor: '85%',
        layout: {
                type:'anchor'
                },
        items: [latticeFieldSetTop,latticeFieldSetMiddle,spaceGroupCombo, spaceGroupSettingCombo]
    }

    var TopPanel = new Ext.Panel({
        layout: 'table',
         width: 1100,
        layoutConfig: {
            columns: 2
        },
        items: [innerRightTopPanel, result]
    });

    var button =  new Ext.Button({applyTo:'button-div',text:'CALCULATE!', minWidth: 130, handler: calculateHandler});
    var conn = new Ext.data.Connection();

    function successFunction(responseObject) {
        idealdata = Ext.decode(responseObject.responseText);

        //Updating desired data table
        var counter = 0;
        changes = ['twotheta', 'theta', 'omega', 'chi', 'phi'];
        for (var i = 0; i < idealDataStore.getCount(); i++){
            var record = resultsStore.getAt(i);

            if (record.data['h'] != 0 || record.data['k'] != 0 || record.data['l'] != 0){
                //if it's not a (0,0,0) vector, update its calculated angles
                if (idealdata[counter] === 'Error') {
                    //setting up the error message
                    record.set('twotheta', 'Invalid');
                    record.set('theta', 'Vector!');
                    record.set('omega', 'Not in');
                    record.set('chi', 'Scattering');
                    record.set('phi', 'Plane.');
                }
                else{
                    for (var c in changes) {
                        var fieldName = changes[c];
                        record.set(fieldName, idealdata[counter][fieldName]);
                    }

                }
                counter = counter+1;
            }
        }

        resultsStore.commitChanges();
    }

    function calculateHandler(button, event) {


        params = {'observations': [] };
        params.lattice=[];
        params.lattice.push({
            'a': aField.getValue(),
            'b': bField.getValue(),
            'c': cField.getValue(),
            'alpha': alphaField.getValue(),
            'beta': betaField.getValue(),
            'gamma': gammaField.getValue()
        });

        //only sends the observations that aren't (0,0,0)
//        for (var i = 0; i < store.getCount(); i++) {
//            var record = store.getAt(i)
//            if (record.data['h'] != 0 || record.data['k'] != 0 || record.data['l'] != 0){
//                params['data'].push(record.data);
//            }
//        };
        var data=Ext.JSON.encode(params);
        $.ajax({
            url: '/nuclear_scattering',
            type: 'POST',
            data: {'data' : data},
            success: function(response, a, b, c) {
                //projectid is not in scope here; calling another function that has it.
                successFunction();
            }
        });


//        conn.request({
//            url: '/nuclear_scattering/',
//            method: 'POST',
//            params: Ext.encode(params),
//            success: successFunction,
//            failure: function () {
//                Ext.Msg.alert('Error: Failed calculation of nuclear structure factors');
//            }
//        });
    }

    var BottomPanel = new Ext.Panel({
	layout: 'table',
	width: 1100,
	layoutConfig: {
	    columns: 2
	},
	items: [grid, button]
    });

    var TotalPanel = {
        xtype       : 'fieldset',
        border      : false,
        defaultType : 'textfield',
        layout: { type: 'vbox',
            pack: 'start'
        },
        //defaultMargin : {top: 0, right: 5, bottom: 0, left: 5},
        //padding: '0 5 0 5',
        defaults    : {allowBlank : false,
            decimalPrecision: 10,
            labelPad:'2',
            labelWidth:'2',
            labelAlign:'left',
            anchor: '100%',
            hideTrigger: true,
            style: {'margin': '0px 5px 5px 0px',
                'border':0,
                'paddingRight':15
            },
            flex:1
        },
        items: [BottomPanel, TopPanel]
    };
    
    var myTabs = new Ext.TabPanel({
        resizeTabs: true, // turn on tab resizing
        minTabWidth: 115,
        tabWidth: 135,
        enableTabScroll: true,
        width: 1150,
        height: 765,
        activeItem: 'webrefinetab', //Making the calculator tab selected first
        defaults: {autoScroll:true},
        items: [
            {
                title: 'WebRefine',
                id: 'webrefinetab',
                iconCls: '/static/img/silk/calculator.png',
                items: [TotalPanel]
            }, {
                title: 'Help Manual',
                id: 'helpmanualtab',
                padding: 5,
                iconCls: '/static/img/silk/help.png',
		        html: '<h1>Hi</h1>'
                    
            }
        ]
    });

// ************************** END - Setting up the tabs  **************************
    myTabs.render('tabs');
}