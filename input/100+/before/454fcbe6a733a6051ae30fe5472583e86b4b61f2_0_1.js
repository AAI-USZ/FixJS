function() {

        var me = this;


        me.patientImmuListStore = Ext.create('App.store.patientfile.PatientImmunization', {
            groupField: 'immunization_name',
            sorters   : ['immunization_name', 'administered_date'],
	        listeners: {
		        scope     : me,
		        beforesync: me.setDefaults
	        },
            autoSync  : true
        });
        me.patientAllergiesListStore = Ext.create('App.store.patientfile.Allergies', {

            listeners: {
                scope     : me,
                beforesync: me.setDefaults
            },
            autoSync : true
        });
        me.patientMedicalIssuesStore = Ext.create('App.store.patientfile.MedicalIssues', {

            listeners: {
                scope     : me,
                beforesync: me.setDefaults
            },
            autoSync : true
        });
        me.patientSurgeryStore = Ext.create('App.store.patientfile.Surgery', {

            listeners: {
                scope     : me,
                beforesync: me.setDefaults
            },
            autoSync : true
        });
        me.patientDentalStore = Ext.create('App.store.patientfile.Dental', {

            listeners: {
                scope     : me,
                beforesync: me.setDefaults
            },
            autoSync : true
        });
        me.patientMedicationsStore = Ext.create('App.store.patientfile.Medications', {

            listeners: {
                scope     : me,
                beforesync: me.setDefaults
            },
            autoSync : true
        });
        me.labPanelsStore = Ext.create('App.store.patientfile.LaboratoryTypes',{
            autoSync : true
        });

        me.items = [
            {
                xtype   : 'grid',
                action  : 'patientImmuListGrid',
                itemId  : 'patientImmuListGrid',
                store   : me.patientImmuListStore,
                features: Ext.create('Ext.grid.feature.Grouping', {
                    groupHeaderTpl   : 'Immunization: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
                    hideGroupedHeader: true
                }),
                columns : [
                    {
                        header   : 'Immunization Name',
                        width    : 100,
                        dataIndex: 'immunization_name'
                    },
                    {
                        header   : 'Date',
                        width    : 100,
                        dataIndex: 'administered_date'
                    },
                    {
                        header   : 'Lot Number',
                        width    : 100,
                        dataIndex: 'lot_number'
                    },
                    {
                        header   : 'Notes',
                        flex     : 1,
                        dataIndex: 'note'
                    }
                ],

                plugins: Ext.create('App.classes.grid.RowFormEditing', {
	                autoCancel  : false,
                    errorSummary: false,
                    clicksToEdit: 1,
                    formItems   : [

                        {

                            title : 'general',
                            xtype : 'container',
                            layout: 'vbox',
                            items : [
                                {
                                    /**
                                     * Line one
                                     */
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    defaults: { margin: '0 10 3 0', xtype: 'textfield'},
                                    items   : [

                                        {
                                            xtype          : 'immunizationlivesearch',
                                            fieldLabel     : 'Name',
                                            hideLabel      : false,
                                            itemId         : 'immunization_name',
	                                        name           : 'immunization_name',
                                            enableKeyEvents: true,
                                            action         : 'immunizations',
                                            width          : 570,
                                            listeners      : {
                                                scope   : me,
                                                'select': me.onLiveSearchSelect
                                            }
                                        },
	                                    {
		                                    xtype:'textfield',
		                                    hidden:true,
		                                    name:'immunization_id',
		                                    action:'idField'
	                                    },
                                        {
                                            fieldLabel: 'Administrator',
                                            name      : 'administered_by',
	                                        width     : 295,
	                                        labelWidth: 160

                                        }

                                    ]

                                },
                                {
                                    /**
                                     * Line two
                                     */
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    defaults: { margin: '0 10 3 0', xtype: 'textfield' },
                                    items   : [
	                                    {
		                                    fieldLabel: 'Lot Number',
		                                    xtype     : 'textfield',
		                                    width     : 300,
		                                    name      : 'lot_number'

	                                    },
	                                    {

                                            xtype     : 'numberfield',
                                            fieldLabel: 'Dosis Number',
		                                    width     : 260,
                                            name      : 'dosis'
                                        },

	                                    {
		                                    fieldLabel: 'Info. Statement Given',
		                                    width     : 295,
		                                    labelWidth: 160,
		                                    xtype     : 'datefield',
		                                    format    : 'Y-m-d',
		                                    name      : 'education_date'
	                                    }

                                    ]

                                },
                                {
                                    /**
                                     * Line three
                                     */
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    defaults: { margin: '0 10 3 0', xtype: 'textfield' },
                                    items   : [

                                        {
                                            fieldLabel: 'Notes',
                                            xtype     : 'textfield',
                                            width     : 300,
                                            name      : 'note'

                                        },
                                        {
                                            fieldLabel: 'Manufacturer',
                                            xtype     : 'textfield',
                                            width     : 260,

                                            name: 'manufacturer'

                                        },

	                                    {
		                                    fieldLabel: 'Date Administered',
		                                    xtype     : 'datefield',
		                                    width     : 295,
		                                    labelWidth: 160,
		                                    format    : 'Y-m-d',
		                                    name      : 'administered_date'
	                                    }

                                    ]

                                }

                            ]

                        }

                    ]
                }),
	            bbar : [
		            '->', {
			            text   : 'Reviewed',
			            action : 'review',
			            itemId : 'review_immunizations',
			            scope  : me,
			            handler: me.onReviewed
		            }
	            ]
            },

            {
                /**
                 * Allergies Card panel
                 */
                xtype  : 'grid',
                action : 'patientAllergiesListGrid',
                store  : me.patientAllergiesListStore,
                columns: [
                    {
                        header   : 'Type',
                        width    : 100,
                        dataIndex: 'allergy_type'
                    },
                    {
                        header   : 'Name',
                        width    : 100,
                        dataIndex: 'allergy'
                    },
                    {
                        header   : 'Location',
	                    width    : 100,
                        dataIndex: 'location'
                    },
                    {
                        header   : 'Severity',
                        flex     : 1,
                        dataIndex: 'severity'
                    },
	                {
		                text     : 'Active?',
		                width    : 55,
		                dataIndex: 'alert',
		                renderer : me.boolRenderer
	                }
                ],
                plugins: me.rowEditingAllergies = Ext.create('App.classes.grid.RowFormEditing', {
                    autoCancel  : false,
                    errorSummary: false,
                    clicksToEdit: 1,
	                formItems: [

                        {
                            title  : 'general',
                            xtype  : 'container',
                            padding: 10,
                            layout : 'vbox',
                            items  : [
                                {
                                    /**
                                     * Line one
                                     */
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    defaults: { margin: '0 10 5 0' },
                                    items   : [
                                        {
                                            xtype          : 'mitos.allergiestypescombo',
                                            fieldLabel     : 'Type',
	                                        name           : 'allergy_type',
	                                        action           : 'allergy_type',
	                                        allowBlank: false,
	                                        width          : 225,
	                                        labelWidth     : 70,
                                            enableKeyEvents: true,
	                                        listeners      : {
		                                        scope   : me,
		                                        'select': me.onAllergyTypeSelect
	                                        }
                                        },
	                                    {
		                                    xtype          : 'mitos.allergieslocationcombo',
		                                    fieldLabel     : 'Location',
		                                    name           : 'location',
		                                    action           : 'location',
		                                    width          : 225,
		                                    labelWidth     : 70,
		                                    listeners      : {
			                                    scope   : me,
			                                    'select': me.onLocationSelect
		                                    }

	                                    },
	                                    {
		                                    fieldLabel: 'Begin Date',
		                                    xtype     : 'datefield',
		                                    format    : 'Y-m-d',
		                                    name      : 'begin_date'

	                                    }

                                    ]

                                },
                                {
                                    /**
                                     * Line two
                                     */
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    defaults: { margin: '0 10 5 0' },
                                    items   : [
	                                    {
		                                    xtype          : 'mitos.allergiescombo',
		                                    fieldLabel     : 'Allergy',
		                                    id         : 'allergie_name',
		                                    action         : 'allergie_name',
		                                    name           : 'allergy',
		                                    enableKeyEvents: true,
		                                    disabled        : true,
		                                    width          : 225,
		                                    labelWidth     : 70,
		                                    listeners      : {
			                                    scope   : me,
			                                    'select': me.onLiveSearchSelect,
			                                    change  : me.disableFieldLogic
		                                    }
	                                    },
	                                    {
		                                    xtype          : 'medicationlivetsearch',
		                                    fieldLabel     : 'Allergy',
		                                    hideLabel      : false,
		                                    id         : 'drug_name',
		                                    action         : 'drug_name',
		                                    name           : 'allergy',
		                                    hidden         : true,
		                                    disabled       : true,
		                                    enableKeyEvents: true,
		                                    width          : 225,
		                                    labelWidth     : 70,
		                                    listeners      : {
			                                    scope   : me,
			                                    'select': me.onLiveSearchSelect,
			                                    change  : me.disableFieldLogic
		                                    }
	                                    },
                                        {
   		                                    xtype:'textfield',
   		                                    hidden:true,
   		                                    name:'allergy_id',
   		                                    action:'idField'
   	                                    },
	                                    {
		                                    xtype          : 'mitos.allergiesabdominalcombo',
		                                    fieldLabel     : 'Reaction',
		                                    name           : 'reaction',
		                                    id         : 'abdominalreaction',
		                                    disabled       : true,
		                                    width          : 225,
		                                    labelWidth     : 70,
		                                    listeners      : {
			                                    scope   : me,
			                                    change  : me.disableFieldLogic
		                                    }

	                                    },{
		                                    xtype          : 'mitos.allergieslocalcombo',
		                                    fieldLabel     : 'Reaction',
		                                    name           : 'reaction',
		                                    id         : 'localreaction',
		                                    hidden         : true,
		                                    disabled       : true,
		                                    width          : 225,
		                                    labelWidth     : 70,
		                                    listeners      : {
			                                    scope   : me,
			                                    change  : me.disableFieldLogic
		                                    }

	                                    },{
		                                    xtype          : 'mitos.allergiesskincombo',
		                                    fieldLabel     : 'Reaction',
		                                    name           : 'reaction',
		                                    id         : 'skinreaction',
		                                    hidden         : true,
		                                    disabled       : true,
		                                    width          : 225,
		                                    labelWidth     : 70,
		                                    listeners      : {
			                                    scope   : me,
			                                    change  : me.disableFieldLogic
		                                    }

	                                    },{
		                                    xtype          : 'mitos.allergiessystemiccombo',
		                                    fieldLabel     : 'Reaction',
		                                    name           : 'reaction',
		                                    id         : 'systemicreaction',
		                                    hidden         : true,
		                                    disabled       : true,
		                                    width          : 225,
		                                    labelWidth     : 70,
		                                    listeners      : {
			                                    scope   : me,
			                                    change  : me.disableFieldLogic
		                                    }

	                                    },
                                        {
                                            fieldLabel: 'End Date',
                                            xtype     : 'datefield',
                                            format    : 'Y-m-d',
                                            name      : 'end_date'
                                        }

                                    ]

                                },
                                {
                                    /**
                                     * Line three
                                     */
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    defaults: { margin: '0 10 5 0' },
                                    items   : [
	                                    {
		                                    xtype          : 'mitos.allergiesseveritycombo',
		                                    fieldLabel     : 'Severity',
		                                    name           : 'severity',
		                                    width          : 225,
		                                    labelWidth     : 70

	                                    }


                                    ]
                                }
                            ]
                        }
                    ]
                }),
	            bbar : [
		            '->', {
			            text   : 'Reviewed',
			            action : 'review',
			            itemId : 'review_allergies',
			            scope  : me,
			            handler: me.onReviewed
		            }
	            ]
            },
            {
                /**
                 * Active Problem Card panel
                 */

                xtype  : 'grid',
                action : 'patientMedicalListGrid',
                store  : me.patientMedicalIssuesStore,
                columns: [

                    {
                        header   : 'Problem',
                        width    : 100,
                        dataIndex: 'code'
                    },
                    {
                        header   : 'Begin Date',
                        width    : 100,
                        dataIndex: 'begin_date'
                    },
                    {
                        header   : 'End Date',
                        flex     : 1,
                        dataIndex: 'end_date'
                    }

                ],
                plugins: Ext.create('App.classes.grid.RowFormEditing', {
                    autoCancel  : false,
                    errorSummary: false,
                    clicksToEdit: 1,

                    formItems: [
                        {
                            title  : 'general',
                            xtype  : 'container',
                            padding: 10,
                            layout : 'vbox',
                            items  : [
                                {
                                    /**
                                     * Line one
                                     */
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    defaults: { margin: '0 10 5 0' },
                                    items   : [
                                        {
                                            xtype          : 'liveicdxsearch',
                                            fieldLabel     : 'Problem',
                                            name           : 'code',
                                            hideLabel      : false,
                                            itemId         : 'medicalissues',
                                            action         : 'medicalissues',
                                            enableKeyEvents: true,
                                            width          : 510,
                                            labelWidth     : 70,
                                            listeners      : {
                                                scope   : me,
                                                'select': me.onLiveSearchSelect
                                            }
                                        },
                                        {
   		                                    xtype:'textfield',
   		                                    hidden:true,
   		                                    name:'code_text',
   		                                    action:'idField'
   	                                    },


                                        {
                                            fieldLabel: 'Begin Date',
                                            xtype     : 'datefield',
	                                        width     : 200,
	                                        labelWidth: 80,
	                                        format    : 'Y-m-d',
                                            name      : 'begin_date'

                                        }

                                    ]

                                },
                                {
                                    /**
                                     * Line two
                                     */
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    defaults: { margin: '0 10 5 0' },
                                    items   : [

	                                    {
		                                    fieldLabel: 'Ocurrence',
		                                    width     : 250,
		                                    labelWidth: 70,
		                                    xtype     : 'mitos.occurrencecombo',
		                                    name      : 'ocurrence'

	                                    },

	                                    {
		                                    fieldLabel: 'Outcome',
		                                    xtype     : 'mitos.outcome2combo',
		                                    width     : 250,
		                                    labelWidth: 70,
		                                    name      : 'outcome'

	                                    },
	                                    {
		                                    fieldLabel: 'End Date',
		                                    xtype     : 'datefield',
		                                    width     : 200,
		                                    labelWidth: 80,
		                                    format    : 'Y-m-d',
		                                    name      : 'end_date'

	                                    }

                                    ]

                                },
	                            {
		                            /**
		                             * Line three
		                             */
		                            xtype   : 'fieldcontainer',
		                            layout  : 'hbox',
		                            defaults: { margin: '0 10 5 0' },
		                            items   : [

			                            {
				                            xtype     : 'textfield',
				                            width     : 250,
				                            labelWidth: 70,
				                            fieldLabel: 'Referred by',
				                            name      : 'referred_by'
			                            }

		                            ]
	                            }
                            ]
                        }

                    ]
                }),
	            bbar : [
		            '->', {
			            text   : 'Reviewed',
			            action : 'review',
			            itemId : 'review_active_problems',
			            scope  : me,
			            handler: me.onReviewed
		            }
	            ]
            },
            {
                /**
                 * Surgery Card panel
                 */

                xtype  : 'grid',
                action : 'patientSurgeryListGrid',
                store  : me.patientSurgeryStore,
                columns: [
                    {
                        header   : 'Type',
                        width    : 100,
                        dataIndex: 'type'
                    },
                    {
                        header   : 'Begin Date',
                        width    : 100,
                        dataIndex: 'begin_date'
                    },
                    {
                        header   : 'End Date',
                        flex     : 1,
                        dataIndex: 'end_date'
                    }
                ],
                plugins: Ext.create('App.classes.grid.RowFormEditing', {
                    autoCancel  : false,
                    errorSummary: false,
                    clicksToEdit: 1,
                    formItems   : [
                        {
                            title  : 'general',
                            xtype  : 'container',
                            padding: 10,
                            layout : 'vbox',
                            items  : [
                                {
                                    /**
                                     * Line one
                                     */
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    defaults: { margin: '0 10 5 0' },
                                    items   : [
                                        {
                                            fieldLabel     : 'Type',
                                            name           : 'type',
                                            width          : 225,
                                            labelWidth     : 70,
                                            xtype          : 'mitos.surgerycombo',
                                            itemId         : 'surgery',
                                            action         : 'surgery',
                                            enableKeyEvents: true,
                                            listeners      : {
                                                scope   : me,
                                                'select': me.onLiveSearchSelect
                                            }
                                        },
//                                        {
//   		                                    xtype:'textfield',
//   		                                    hidden:true,
//   		                                    name:'immunization_id',
//   		                                    action:'idField'
//   	                                    },
                                        {
                                            fieldLabel: 'Begin Date',
                                            xtype     : 'datefield',
	                                        width     : 200,
	                                        labelWidth: 80,
	                                        format    : 'Y-m-d',
                                            name      : 'begin_date'

                                        },
                                        {
                                            fieldLabel: 'Outcome',
                                            xtype     : 'mitos.outcome2combo',
                                            name      : 'outcome'

                                        }

                                    ]

                                },
                                {
                                    /**
                                     * Line two
                                     */
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    defaults: { margin: '0 10 5 0' },
                                    items   : [

                                        {   xtype     : 'textfield',
                                            width     : 225,
                                            labelWidth: 70,
                                            fieldLabel: 'Title',
                                            action    : 'title',
                                            name      : 'title'
                                        },
                                        {
                                            fieldLabel: 'End Date',
                                            xtype     : 'datefield',
	                                        width     : 200,
	                                        labelWidth: 80,
	                                        format    : 'Y-m-d',
                                            name      : 'end_date'

                                        },

                                        {
                                            xtype     : 'textfield',
                                            width     : 260,
                                            fieldLabel: 'Referred by',
                                            name      : 'referred_by'
                                        }

                                    ]

                                },
                                {
                                    /**
                                     * Line three
                                     */
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    defaults: { margin: '0 10 5 0' },
                                    items   : [

                                        {
                                            fieldLabel: 'Ocurrence',
                                            width     : 225,
                                            labelWidth: 70,
                                            xtype     : 'mitos.occurrencecombo',
                                            name      : 'ocurrence'

                                        }

                                    ]
                                }
                            ]
                        }

                    ]
                }),
	            bbar : [
		            '->', {
			            text   : 'Reviewed',
			            action : 'review',
			            itemId : 'review_surgery',
			            scope  : me,
			            handler: me.onReviewed
		            }
	            ]
            },
            {
                /**
                 * Dental Card panel
                 */

                xtype  : 'grid',
                action : 'patientDentalListGrid',
                store  : me.patientDentalStore,
                columns: [
                    {
                        header   : 'Title',
                        width    : 100,
                        dataIndex: 'title'
                    },
                    {
                        header   : 'Begin Date',
                        width    : 100,
                        dataIndex: 'begin_date'
                    },
                    {
                        header   : 'End Date',
                        flex     : 1,
                        dataIndex: 'end_date'
                    }
                ],
                plugins: Ext.create('App.classes.grid.RowFormEditing', {
                    autoCancel  : false,
                    errorSummary: false,
                    clicksToEdit: 1,
                    formItems   : [
                        {
                            title  : 'general',
                            xtype  : 'container',
                            padding: 10,
                            layout : 'vbox',
                            items  : [
                                {
                                    /**
                                     * Line one
                                     */
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    defaults: { margin: '0 10 5 0' },
                                    items   : [

                                        {   xtype     : 'textfield',
                                            width     : 225,
                                            labelWidth: 70,
                                            fieldLabel: 'Title',
                                            action    : 'dental',
                                            name      : 'title'
                                        },
//                                        {
//   		                                    xtype:'textfield',
//   		                                    hidden:true,
//   		                                    name:'immunization_id',
//   		                                    action:'idField'
//   	                                    },
                                        {
                                            fieldLabel: 'Begin Date',
                                            xtype     : 'datefield',
	                                        width     : 200,
	                                        labelWidth: 80,
	                                        format    : 'Y-m-d',
                                            name      : 'begin_date'

                                        },
                                        {
                                            fieldLabel: 'Outcome',
                                            xtype     : 'mitos.outcome2combo',
	                                        width     : 250,
	                                        labelWidth: 70,
                                            name      : 'outcome'

                                        }

                                    ]

                                },
                                {
                                    /**
                                     * Line two
                                     */
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    defaults: { margin: '0 10 5 0' },
                                    items   : [

                                        {
                                            xtype     : 'textfield',
                                            width     : 225,
                                            labelWidth: 70,
                                            fieldLabel: 'Referred by',
                                            name      : 'referred_by'
                                        },

                                        {
                                            fieldLabel: 'End Date',
                                            xtype     : 'datefield',
	                                        width     : 200,
	                                        labelWidth: 80,
	                                        format    : 'Y-m-d',
                                            name      : 'end_date'

                                        },
                                        {
                                            fieldLabel: 'Ocurrence',
                                            xtype     : 'mitos.occurrencecombo',
	                                        width     : 250,
	                                        labelWidth: 70,
                                            name      : 'ocurrence'

                                        }

                                    ]

                                }
                            ]
                        }

                    ]
                }),
	            bbar : [
		            '->', {
			            text   : 'Reviewed',
			            action : 'review',
			            itemId : 'review_dental',
			            scope  : me,
			            handler: me.onReviewed
		            }
	            ]
            },
            {
                /**
                 * Medications panel
                 */

                xtype  : 'grid',
                action : 'patientMedicationsListGrid',
                store  : me.patientMedicationsStore,
                columns: [
                    {
                        header   : 'Medication',
                        width    : 100,
                        dataIndex: 'medication'
                    },
                    {
                        header   : 'Begin Date',
                        width    : 100,
                        dataIndex: 'begin_date'
                    },
                    {
                        header   : 'End Date',
                        flex     : 1,
                        dataIndex: 'end_date'
                    }
                ],
                plugins: Ext.create('App.classes.grid.RowFormEditing', {
                    autoCancel  : false,
                    errorSummary: false,
                    clicksToEdit: 1,

                    formItems: [
                        {
                            title  : 'general',
                            xtype  : 'container',
                            padding: 10,
                            layout : 'vbox',
                            items  : [
                                {
                                    /**
                                     * Line one
                                     */
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    defaults: { margin: '0 10 5 0' },
                                    items   : [
                                        {
                                            xtype          : 'medicationlivetsearch',
                                            fieldLabel     : 'Medication',
                                            hideLabel      : false,
                                            itemId         : 'medication',
                                            name           : 'medication',
                                            action         : 'medication',
                                            enableKeyEvents: true,
                                            width          : 520,
                                            labelWidth     : 70,
                                            listeners      : {
                                                scope   : me,
                                                'select': me.onLiveSearchSelect
                                            }
                                        },
                                        {
   		                                    xtype:'textfield',
   		                                    hidden:true,
   		                                    name:'medication_id',
   		                                    action:'idField'
   	                                    },

                                        {
                                            fieldLabel: 'Begin Date',
                                            xtype     : 'datefield',
	                                        width     : 200,
	                                        labelWidth: 80,
	                                        format    : 'Y-m-d',
                                            name      : 'begin_date'

                                        }

                                    ]

                                },
                                {
                                    /**
                                     * Line two
                                     */
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    defaults: { margin: '0 10 5 0' },
                                    items   : [
	                                    {
		                                    fieldLabel: 'Outcome',
		                                    xtype     : 'mitos.outcome2combo',
		                                    width     : 250,
		                                    labelWidth: 70,
		                                    name      : 'outcome'
	                                    },
                                        {
                                            xtype     : 'textfield',
                                            width     : 260,
                                            fieldLabel: 'Referred by',
                                            name      : 'referred_by'
                                        },
	                                    {
		                                    fieldLabel: 'End Date',
		                                    xtype     : 'datefield',
		                                    width     : 200,
		                                    labelWidth: 80,
		                                    format    : 'Y-m-d',
		                                    name      : 'end_date'
	                                    }

                                    ]

                                },
                                {
                                    /**
                                     * Line three
                                     */
                                    xtype   : 'fieldcontainer',
                                    layout  : 'hbox',
                                    defaults: { margin: '0 10 5 0' },
                                    items   : [

                                        {
                                            fieldLabel: 'Ocurrence',
	                                        width     : 250,
	                                        labelWidth: 70,
                                            xtype     : 'mitos.occurrencecombo',
                                            name      : 'ocurrence'

                                        }

                                    ]
                                }
                            ]
                        }
                    ]
                }),
	            bbar : [
		            '->', {
			            text   : 'Reviewed',
			            action : 'review',
			            itemId : 'review_medications',
			            scope  : me,
			            handler: me.onReviewed
		            }
	            ]
            },
            {
                /**
                 * Lab panel
                 */
                xtype : 'container',
                action: 'patientLabs',
                layout:'border',
                items:[
                    {
                        xtype:'panel',
                        region:'north',
                        layout:'border',
                        bodyBorder:false,
                        border:false,
                        height:350,
                        split:true,
                        items:[
                            {
                                xtype:'grid',
                                region:'west',
                                width:290,
                                split:true,
                                store:me.labPanelsStore,
                                columns:[
                                    {
                                        header:'Laboratories',
                                        dataIndex:'label',
                                        flex:1
                                    }
                                ],
                                listeners:{
                                    scope:me,
                                    itemclick:me.onLabPanelSelected,
                                    selectionchange:me.onLabPanelSelectionChange
                                }
                            },
                            {
                                xtype:'panel',
                                action:'labPreviewPanel',
                                title:'Laboratory Preview',
                                region:'center',
                                items:[
                                    me.uploadWin = Ext.create('Ext.window.Window',{
                                        draggable :false,
                                        closable:false,
                                        closeAction:'hide',
                                        items:[
                                            {
                                                xtype:'form',
                                                bodyPadding:10,
                                                width:400,
                                                items:[
                                                    {
                                                        xtype: 'filefield',
                                                        name: 'filePath',
                                                        buttonText: 'Select a file...',
                                                        anchor:'100%'
                                                    }
                                                ],
                                             //   url: 'dataProvider/DocumentHandler.php'
                                                api: {
                                                    submit: DocumentHandler.uploadDocument
                                                }
                                            }
                                        ],
                                        buttons:[
                                            {
                                                text:'Cancel',
                                                handler:function(){
                                                    me.uploadWin.close();
                                                }
                                            },
                                            {
                                                text:'Upload',
                                                scope:me,
                                                handler:me.onLabUpload
                                            }
                                        ]
                                    })
                                ]
                            }
                        ],
                        tbar:[
                            '->',
                            {
                                text:'Scan'
                            },
                            '-',
                            {
                                text:'Upload',
                                disabled:true,
                                action:'uploadBtn',
                                scope:me,
                                handler:me.onLabUploadWind
                            }
                        ]
                    },
                    {
                        xtype:'container',
                        region:'center',
                        layout:'border',
                        split:true,
                        items:[
                            {
                                xtype:'form',
                                title:'Laboratory Entry Form',
                                region:'west',
                                width:290,
                                split:true,
                                bodyPadding:5,
                                autoScroll:true,
                                bbar:[
                                    '->',
                                    {
                                        text:'Reset',
                                        scope:me,
                                        handler:me.onLabResultsReset
                                    },
                                    '-',
                                    {
                                        text:'Sign',
                                        scope:me,
                                        handler:me.onLabResultsSign
                                    },
                                    '-',
                                    {
                                        text:'Save',
                                        scope:me,
                                        handler:me.onLabResultsSave
                                    }
                                ]
                            },
                            {
                                xtype:'panel',
                                region:'center',
                                height:300,
                                split:true,
                                items:[
                                    {
                                        xtype:'lalboratoryresultsdataview',
                                        action:'lalboratoryresultsdataview',
                                        store: Ext.create('App.store.patientfile.PatientLabsResults'),
                                        listeners:{
                                            scope:me,
                                            itemclick:me.onLabResultClick
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];

        me.dockedItems = [
            {
                xtype: 'toolbar',
                items: [
                    {

                        text        : 'Immunization',
                        enableToggle: true,
                        toggleGroup : 'medicalWin',
                        pressed     : true,
                        itemId      : 'immunization',
                        action      : 'immunization',
                        scope       : me,
                        handler     : me.cardSwitch
                    },
                    '-',
                    {
                        text        : 'Allergies',
                        enableToggle: true,
                        toggleGroup : 'medicalWin',
                        itemId      : 'allergies',
                        action      : 'allergies',
                        scope       : me,
                        handler     : me.cardSwitch
                    },
                    '-',
                    {
                        text        : 'Active Problems',
                        enableToggle: true,
                        toggleGroup : 'medicalWin',
                        itemId      : 'issues',
                        action      : 'issues',
                        scope       : me,
                        handler     : me.cardSwitch
                    },
                    '-',
                    {
                        text        : 'Surgery',
                        enableToggle: true,
                        toggleGroup : 'medicalWin',
                        itemId      : 'surgery',
                        action      : 'surgery',
                        scope       : me,
                        handler     : me.cardSwitch
                    },
                    '-',
                    {
                        text        : 'Dental',
                        enableToggle: true,
                        toggleGroup : 'medicalWin',
                        itemId      : 'dental',
                        action      : 'dental',
                        scope       : me,
                        handler     : me.cardSwitch
                    },
                    '-',
                    {
                        text        : 'Medications',
                        enableToggle: true,
                        toggleGroup : 'medicalWin',
                        itemId      : 'medications',
                        action      : 'medications',
                        scope       : me,
                        handler     : me.cardSwitch
                    },
                    '-',
                    {
                        text        : 'Laboratories',
                        enableToggle: true,
                        toggleGroup : 'medicalWin',
                        itemId      : 'laboratories',
                        action      : 'laboratories',
                        scope       : me,
                        handler     : me.cardSwitch
                    },
                    '->',
                    {
                        text   : 'Add New',
                        action : 'AddRecord',
                        scope  : me,
                        handler: me.onAddItem
                    }
                ]
            }
        ];
        me.listeners = {
            scope: me,
            show: me.onMedicalWinShow
        };
        me.callParent(arguments);
    }