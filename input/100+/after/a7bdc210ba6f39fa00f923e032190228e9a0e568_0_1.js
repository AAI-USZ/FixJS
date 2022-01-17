function () {
        var me = this;

        me.currEncounterStartDate = null;

        me.timerTask = {
            scope:me,
            run:function () {
                me.encounterTimer();
            },
            interval:1000 //1 second
        };
        me.encounterStore = Ext.create('App.store.patientfile.Encounter', {
            listeners:{
                scope:me,
                datachanged:me.updateProgressNote
            }
        });

        me.encounterEventHistoryStore = Ext.create('App.store.patientfile.EncounterEventHistory');



        /**
         * New Encounter Panel this panel is located hidden at
         * the top of the Visit panel and will slide down if
         * the "New Encounter" button is pressed.
         */
        me.newEncounterWindow = Ext.create('Ext.window.Window', {
            title      : 'New Encounter Form',
            closeAction: 'hide',
            modal      : true,
            closable   : false,
            width:660,
            items  : [
                {
                    xtype:'form',
                    border:false,
                    bodyPadding:'10 10 0 10'
                }
            ],
            buttons:[
                {
                    text:'Create Encounter',
                    action:'encounter',
                    scope:me,
                    handler:me.onSave
                },
                {
                    text:'Cancel',
                    handler:me.cancelNewEnc

                }
            ]
        });
	    me.EncounterOrdersStore = Ext.create('App.store.patientfile.EncounterCPTsICDs');
	    me.checkoutAlertArea = Ext.create('App.store.patientfile.CheckoutAlertArea');

        me.checkoutWindow = Ext.create('Ext.window.Window', {
            title:'Checkout and Signing',
            closeAction:'hide',
            modal:true,
            layout:'border',
            width:1000,
            height:660,
            bodyPadding:5,
            items:[
                {
                    xtype:'grid',
                    title:'Services / Diagnostics',
                    region:'center',
	                store: me.EncounterOrdersStore,
                    columns:[
                        {
                            header:'Code',
                            width:60,
                            dataIndex:'code'
                        },
                        {
                            header:'Description',
                            flex:1,
                            dataIndex:'code_text'
                        },
                        {
                            header:'Type',
                            flex:1,
                            dataIndex:'type'
                        }
                    ]
                },
                {
                    xtype:'documentsimplegrid',
                    title:'Documents',
                    region:'east',
                    width:485
                },
                {
                    xtype:'form',
                    title:'Additional Info',
                    region:'south',
                    split:true,
                    height:245,
	                layout:'column',
	                defaults:{
                        xtype:'fieldset',
                        padding:8
                    },
                    items:[
                        {
	                        xtype:'fieldcontainer',
	                        columnWidth:.5,
	                        defaults:{
                                xtype:'fieldset',
                                padding:8
                            },
	                        items:[
                                {
                                    xtype:'fieldset',
                                    margin:'5 1 5 5',
                                    padding:8,
                                    columnWidth:.5,
                                    height:115,
                                    title:'Messages, Notes and Reminders',
                                    items:[
                                        {
                                            xtype:'textfield',
                                            name:'message',
                                            fieldLabel:'Message',
                                            anchor:'100%'
                                        },
                                        {
                                            xtype:'textfield',
                                            name:'reminder',
                                            fieldLabel:'Reminder',
                                            anchor:'100%'
                                        },
                                        {
                                            xtype:'textfield',
                                            grow:true,
                                            name:'note',
                                            fieldLabel:'Note',
                                            anchor:'100%'
                                        }
                                    ]
                                },
		                        {
		                            title:'Follow Up',
			                        margin:'5 1 5 5',
		                            defaults:{
		                                anchor:'100%'
		                            },
		                            items:[
		                                {
		                                    xtype:'mitos.followupcombo',
		                                    fieldLabel:'Time Interval',
			                                name:'followup_time'
		                                },
		                                {
		                                    fieldLabel:'Facility',
		                                    xtype:'mitos.activefacilitiescombo',
			                                name:'followup_facility'
		                                }
		                            ]
		                        }
	                        ]
                        },
                        {
	                        xtype:'fieldset',
                            margin:5,
                            padding:8,
                            columnWidth:.5,
	                        layout:'fit',
                            height:208,
                            title:'Warnings / Alerts',
                            items:[
                                {
			                        xtype:'grid',
			                        hideHeaders: true,
			                        store      : me.checkoutAlertArea,
                                    border:false,
                                    rowLines:false,
                                    header:false,
                                    viewConfig:{
	                                    stripeRows:false,
	                                    disableSelection:true
                                    },
			                        columns    : [
				                        {
					                        dataIndex: 'alertType',
					                        width:30,
					                        renderer:me.alertIconRenderer
				                        },
				                        {
					                        dataIndex: 'alert',
					                        flex: 1
				                        }
			                        ]
                                }
                            ]
                        }
                    ]
                }
            ],
            buttons:[
                {
                    text:'Co-Sign',
                    action:'encounter',
                    scope:me,
                    handler:me.coSignEncounter
                },
                {
                    text:'Sign',
                    action:'encounter',
                    scope:me,
                    handler:me.signEncounter
                },
                {
                    text:'Cancel',
                    handler:me.cancelCheckout

                }
            ],
	        listeners:{
		        scope:me,
		        show:function(){
			        me.EncounterOrdersStore.load({params: {eid: app.currEncounterId}});
			        me.checkoutAlertArea.load({params: {eid: app.currEncounterId}});


			        me.checkoutWindow.query('documentsimplegrid')[0].loadDocs(me.eid);
		        }

	        }
	          
        });


        /**
         * Tap Panel panels and forms
         */
        me.MiscBillingOptionsPanel = Ext.create('Ext.form.Panel', {
            autoScroll:true,
            title:'Misc. Billing Options HCFA',
            html:'<h1>Misc. Billing Options HCFA form placeholder!</h1>'
        });

        me.CurrentProceduralTerminology = Ext.create('App.view.patientfile.encounter.CurrentProceduralTerminology',{
            title:'Current Procedural Terminology'
        });


        me.EncounterEventHistory = Ext.create('App.classes.grid.EventHistory', {
            bodyStyle:0,
            title:'Encounter History',
            store:me.encounterEventHistoryStore
        });


        me.reviewSysPanel = Ext.create('Ext.form.Panel', {
            autoScroll:true,
            action:'encounter',
            title:'Review of Systems',
            fieldDefaults:{ msgTarget:'side' },
            dockedItems:{
                xtype:'toolbar',
                dock:'top',
                items:[
                    {
                        text:'Save',
                        iconCls:'save',
                        action:'reviewOfSystems',
                        scope:me,
                        handler:me.onSave
                    }
                ]
            }
        });
        me.reviewSysCkPanel = Ext.create('Ext.form.Panel', {
            autoScroll:true,
            action:'encounter',
            title:'Review of Systems Checks',
            fieldDefaults:{ msgTarget:'side' },
            dockedItems:{
                xtype:'toolbar',
                dock:'top',
                items:[
                    {
                        text:'Save',
                        iconCls:'save',
                        action:'reviewOfSystemsChecks',
                        scope:me,
                        handler:me.onSave
                    }
                ]
            }
        });
        me.soapPanel = Ext.create('Ext.form.Panel', {
            autoScroll:true,
            title:'SOAP',
            action:'encounter',
            fieldDefaults:{ msgTarget:'side' },
            dockedItems:{
                xtype:'toolbar',
                dock:'top',
                items:[
                    {
                        text:'Save',
                        iconCls:'save',
                        action:'soap',
                        scope:me,
                        handler:me.onSave
                    }
                ]
            }
        });
        me.speechDicPanel = Ext.create('Ext.form.Panel', {
            autoScroll:true,
            title:'Speech Dictation',
            action:'encounter',
            fieldDefaults:{ msgTarget:'side' },
            dockedItems:{
                xtype:'toolbar',
                dock:'top',
                items:[
                    {
                        text:'Save',
                        iconCls:'save',
                        action:'speechDictation',
                        scope:me,
                        handler:me.onSave
                    }
                ]
            }
        });
        me.vitalsPanel = Ext.create('Ext.panel.Panel', {
            title:'Vitals',
            action:'encounter',
            cls:'vitals-panel',
            bodyPadding:'5 10',
	        overflowY: 'auto',
            layout:{
                type:'hbox',
                stretch:true
            },
            items:[
                {
                    xtype:'form',
                    width:313,
	                margin:0,
                    border:false,
                    layout:'anchor',
                    fieldDefaults:{ msgTarget:'side', labelAlign:'right' },
                    buttons:[
                        {
                            text:'Reset',
                            width:40,
                            scope:me,
                            handler:me.resetVitalsForm
                        },
                        {
                            text:'Save',
                            action:'vitals',
                            width:40,
                            scope:me,
                            handler:me.onSave
                        },
                        {
                            text:'Sign',
                            width:40,
	                        disabled:true,
	                        action:'signBtn',
                            scope:me,
                            handler:me.onVitalsSign
                        }

                    ]
                },
                {
                    xtype:'vitalsdataview',
	                flex:1,
	                autoScroll:true,
	                listeners:{
		                scope:me,
		                itemdblclick:me.onVitalsClick
	                }
                }
            ],
            dockedItems:{
                xtype:'toolbar',
                dock:'top',
                items:[
                    '->',
                    {
                        text:'Vector Charts',
                        iconCls:'icoChart',
                        scope:me,
                        handler:me.onChartWindowShow
                    }
                ]
            }

        });


        /**
         * Encounter panel
         */
        me.centerPanel = Ext.create('Ext.tab.Panel', {
            region:'center',
            margin:'1 0 0 0',
            bodyPadding:5,
            items:[
                {
                    xtype:'tabpanel',
                    title:'Encounter',
                    itemId:'encounter',
                    plain:true,
                    activeItem:0,
                    defaults:{
                        bodyStyle:'padding:15px',
                        bodyBorder:true,
                        layout:'fit'
                    },
                    items:[
                        me.vitalsPanel, me.reviewSysPanel, me.reviewSysCkPanel, me.soapPanel, me.speechDicPanel
                    ]
                },
                {
                    xtype:'tabpanel',
                    title:'Administrative',
                    itemId:'administrative',
                    plain:true,
                    activeItem:0,
                    defaults:{
                        bodyStyle:'padding:15px',
                        bodyBorder:true,
                        layout:'fit'
                    },
                    items:[
                        me.MiscBillingOptionsPanel, me.CurrentProceduralTerminology, me.EncounterEventHistory
                    ]
                }
            ],
            listeners:{
                render:function () {
                    this.items.each(function (i) {
                        i.tab.on('click', function () {
                            me.onTapPanelChange(this);
                        });
                    });
                }
            }
        });

        /**
         * Progress Note
         */
        me.progressNote = Ext.create('App.view.patientfile.ProgressNote', {
            title:'Encounter Progress Note',
            region:'east',
            margin:'0 0 0 2',
            bodyStyle:'padding:15px',
            width:500,
            collapsible:true,
            animCollapse:true,
            collapsed:true,
            listeners:{
                scope:this,
                collapse:me.progressNoteCollapseExpand,
                expand:me.progressNoteCollapseExpand
            },
	        tools: [
		        {
	                type: 'print',
			        tooltip:'Print Progress Note',
			        scope:me,
	                handler: function(){
		                var win = window.open('print.html','win','left=20,top=20,width=700,height=700,toolbar=0,resizable=1,location=1,scrollbars=1,menubar=0,directories=0');
		                var dom = me.progressNote.body.dom;
		                var wrap = document.createElement('div');
						var html = wrap.appendChild(dom.cloneNode(true));
		                win.document.write(html.innerHTML);
		                Ext.defer(function(){
			                win.print();
                        }, 1000);

	                }
		        }

	        ]
//            tbar:[
//                {
//                    text:'View (CCD)',
//                    tooltip:'View (Continuity of Care Document)',
//                    handler:function () {
//                        // refresh logic
//                    }
//                },
//                '-',
//                {
//                    text:'Print (CCD)',
//                    tooltip:'Print (Continuity of Care Document)',
//                    handler:function () {
//                        // refresh log
//
//                    }
//                },
//                '->',
//                {
//                    text:'Export (CCD)',
//                    tooltip:'Export (Continuity of Care Document)',
//                    handler:function () {
//                        // refresh log
//
//                    }
//                }
//            ]
        });

        me.pageBody = [ me.centerPanel, me.progressNote ];

        me.listeners = {
            beforerender:me.beforePanelRender
        };
        me.callParent(arguments);

        me.down('panel').addDocked({
            xtype:'toolbar',
            dock:'top',
            defaults:{
                scope:me,
                handler:me.onMedicalWin
            },
            items:[
                {
                    text:'Immunizations ',
                    action:'immunization'
                },
                '-',
                {
                    text:'Allergies ',
                    action:'allergies'
                },
                '-',
                {
                    text:'Active Problems ',
                    action:'issues'
                },
                '-',
                {
                    text:'Surgery ',
                    action:'surgery'
                },
                '-',
                {
                    text:'Dental ',
                    action:'dental'
                },'-',
                {
                    text:'Medications ',
                    action:'medications'
                },'-',
                {
                    text:'Laboratories ',
                    action:'laboratories'
                },'-',
	            {
		            text:'New Lab Order',
		            action:'lab',
		            scope:me,
		            handler:me.newDoc
	            },
	            '-',
	            {
		            text:'New X-Ray Order',
		            action:'xRay',
		            scope:me,
		            handler:me.newDoc
	            },
	            '-',
	            {
		            text:'New Prescription',
		            action:'prescription',
		            scope:me,
		            handler:me.newDoc
	            },
	            '-',
	            {
		            text:'New Doctors Note',
		            action:'notes',
		            scope:me,
		            handler:me.newDoc
	            },
                '->',
                {
                    text:'Checkout',
                    handler:me.onCheckout
                }
            ]
        });

    }