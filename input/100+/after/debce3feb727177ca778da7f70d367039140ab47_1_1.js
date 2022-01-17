function () {
        this.items = [{
            xtype: 'form',
            layout: 'column',
            border: false,
            style: 'background-color: #fff;',

            items: [{
                xtype: 'panel',
                layout: 'form',
                border: false,
                bodyPadding: 10,
                autoHeight: true,
                columnWidth: 1,
                preventHeader: true,

                items: [{
                    xtype: 'textfield',
                    name: 'ChildrenKey',
                    fieldLabel: 'Children Key',
                    hidden: true
                }, {
                    xtype: 'checkbox',
                    name: 'Active',
                    fieldLabel: 'Active'
                }, {
                    itemId: 'fistInput',
                    xtype: 'combo',
                    name: 'NeighborhoodKey',
                    fieldLabel: 'Neighborhood',
                    emptyText: 'Type first letters of Neig...',
                    store: 'NeighborhoodsCombo',
                    displayField: 'NeighborhoodDisplay',
                    valueField: 'NeighborhoodKey',
                    queryMode: 'remote',
                    minChars: 2,
                    hideTrigger: true,
                    forceSelection: true,
                    selectOnFocus: true,
                    typeAhead: true
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'First/Last Name',
                    layout: 'hbox',
                    items: [{
                        xtype: 'textfield',
                        name: 'FirstName',
                        width: 150
                    }, {
                        xtype: 'splitter'
                    }, {
                        xtype: 'textfield',
                        name: 'LastName',
                        flex: 1
                    }]
                }, {
                    xtype: 'textfield',
                    name: 'Address1',
                    fieldLabel: 'Address 1'
                }, {
                    xtype: 'textfield',
                    name: 'Address2',
                    fieldLabel: 'Address 2'
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldLabel: 'City/ST/Zip',
                    items: [{
                        xtype: 'textfield',
                        width: 150,
                        name: 'City'
                    }, {
                        xtype: 'splitter'
                    }, {
                        xtype: 'textfield',
                        width: 30,
                        name: 'State'

                    }, {
                        xtype: 'splitter'
                    }, {
                        xtype: 'textfield',
                        name: 'Zip',
                        flex: 1
                    }]
                }, {
                    xtype: 'textfield',
                    name: 'Parent',
                    fieldLabel: 'Parent/Gardian'
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [{
                        xtype: 'combo',
                        name: 'GradeCompleted',
                        fieldLabel: 'Grade Completed',
                        emptyText: 'Please select...',
                        store: new KCCVBS.store.GradesCompleted(),
                        displayField: 'value',
                        valueField: 'value',
                        forceSelection: true,
                        queryMode: 'local',
                        typeAhead: true,
                        minChars: 2
                    }, {
                        xtype: 'splitter'
                    }, {
                        xtype: 'textfield',
                        labelWidth: 50,
                        name: 'Phone',
                        fieldLabel: 'Phone'
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [{
                        xtype: 'textfield',
                        name: 'Age',
                        fieldLabel: 'Age'
                    }, {
                        xtype: 'splitter'
                    }, {
                        xtype: 'combo',
                        name: 'AgeKey',
                        fieldLabel: 'Age Group',
                        labelWidth: 75,
                        emptyText: 'Please select...',
                        store: 'Ages',
                        displayField: 'Age',
                        valueField: 'AgeKey',
                        forceSelection: true,
                        queryMode: 'local',
                        width: 175
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [{
                        xtype: 'textfield',
                        name: 'Mobile',
                        fieldLabel: 'Mobile'
                    }, {
                        xtype: 'splitter'
                    }, {
                        xtype: 'textfield',
                        name: 'Email',
                        fieldLabel: 'Email',
                        labelWidth: 75,
                        vtype: 'email'
                    }]
                }, {
                    xtype: 'textareafield',
                    name: 'SpecialNeeds',
                    fieldLabel: 'Special Needs',
                    grow: true,
                    anchor: '99%',
                    style: 'color:red'
                }, {
                    xtype: 'textareafield',
                    name: 'Notes',
                    fieldLabel: 'Notes',
                    grow: true,
                    anchor: '99%'
                }]
            }, {
                xtype: 'panel',
                layout: 'form',
                border: false,
                bodyPadding: 10,
                preventHeader: true,
                width: 150,
                items: [{
                    xtype: 'label',
                    text: 'Attendance'
                }, {
                    xtype: 'checkbox',
                    name: 'Monday',
                    boxLabel: 'Monday'
                }, {
                    xtype: 'checkbox',
                    name: 'Tuesday',
                    boxLabel: 'Tuesday'
                }, {
                    xtype: 'checkbox',
                    name: 'Wednesday',
                    boxLabel: 'Wednesday'
                }, {
                    xtype: 'checkbox',
                    name: 'Thursday',
                    boxLabel: 'Thursday'
                }, {
                    xtype: 'checkbox',
                    name: 'Friday',
                    boxLabel: 'Friday'
                }, {
                    xtype: 'checkbox',
                    name: 'Saturday',
                    boxLabel: 'Saturday'
                }, {
                    xtype: 'checkbox',
                    name: 'Sunday',
                    boxLabel: 'Sunday'
                }]
            }]
        }];

        this.buttons = [{
            text: 'New',
            action: 'newFromEdit'
        }, {
            xtype: 'tbfill'
        }, {
            text: 'Save',
            action: 'save'
        }, {
            text: 'Cancel',
            scope: this,
            handler: this.close
        }];

        this.callParent(arguments);
    }