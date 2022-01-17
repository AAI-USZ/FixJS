function() {
		var me = this;
		me.patientPrescriptionStore = Ext.create('App.store.patientfile.PatientsPrescription');
		me.patientsLabsOrdersStore = Ext.create('App.store.patientfile.PatientsLabsOrders');
		
		me.items = [
			me.tabPanel = Ext.create('Ext.tab.Panel', {

				items: [
					{
						title: 'New Lab Order',
						items: [

							{

								xtype  : 'grid',
								margin : 10,
								store  : me.patientsLabsOrdersStore,
								height : 320,
								columns: [

									{
										xtype: 'actioncolumn',
										width: 20,
										items: [
											{
												icon   : 'ui_icons/delete.png',
												tooltip: 'Remove',
												scope  : me,
												handler: me.onRemoveLabs
											}
										]
									},
									{
										header   : 'Lab',
										flex    : 1,
										dataIndex: 'laboratories'
									}

								],

								bbar:{
									xtype     : 'mitos.labstypescombo',
									margin:5,
									fieldLabel:'Add',
									hideLabel:false,
									listeners:{
										scope:me,
										select:me.onAddLabs
									}
								}
							}
						],


						bbar : [
							'->', {
								text   : 'Create',
								scope  : me,
								handler: me.onCreateLabs
							}, {
								text   : 'Cancel',
								scope  : me,
								handler: me.onCancel
							}
						]
					},
					{
						title: 'New X-Ray Order',
						items: [

							{

								xtype  : 'grid',
								margin : 10,
								store  : me.patientPrescriptionStore,
								height : 320,
								columns: [

									{
										xtype: 'actioncolumn',
										width: 20,
										items: [
											{
												icon   : 'ui_icons/delete.png',
												tooltip: 'Remove',
												scope  : me,
												handler: me.onRemove
											}
										]
									},
									{
										header   : 'Medication',
										width    : 100,
										dataIndex: 'medication'
									},
									{
										header   : 'Dispense',
										width    : 100,
										dataIndex: 'dispense'
									},
									{
										header   : 'Refill',
										flex     : 1,
										dataIndex: 'refill'
									}

								],

								bbar:{
								xtype:'textfield',
								margin:5,
								fieldLabel:'Add',
								hideLabel:false,
								listeners:{
									scope:me,
									select:me.addMedications
								}
							}

							}
						],
						bbar : [
							'->', {
								text   : 'Create',
								scope  : me,
								handler: me.Create
							}, {
								text   : 'Cancel',
								scope  : me,
								handler: me.onCancel
							}
						]
					},
					{
						title: 'New Prescription',
						items: [
							{
								xtype     : 'mitos.pharmaciescombo',
								fieldLabel: 'Pharmacies',
								width     : 250,
								labelWidth: 75,
								margin    : '10 0 0 10'

							},
							{

								xtype  : 'grid',
								margin : 10,
								store  : me.patientPrescriptionStore,
								height : 285,
								columns: [

									{
										xtype: 'actioncolumn',
										width: 20,
										items: [
											{
												icon   : 'ui_icons/delete.png',
												tooltip: 'Remove',
												scope  : me,
												handler: me.onRemove
											}
										]
									},
									{
										header   : 'Medication',
										width    : 100,
										dataIndex: 'medication'
									},
									{
										header   : 'Dispense',
										width    : 100,
										dataIndex: 'dispense'
									},
									{
										header   : 'Refill',
										flex     : 1,
										dataIndex: 'refill'
									}

								],

								plugins: Ext.create('App.classes.grid.RowFormEditing', {
									autoCancel  : false,
									errorSummary: false,
									clicksToEdit: 1,
									listeners   :{
										scope   : me,
										edit    : me.onEditPrescription

									},
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
													defaults: { margin: '5 0 5 5' },
													items   : [
														{
															xtype     : 'medicationlivetsearch',
															fieldLabel: 'Medication',
															hideLabel : false,
															action      : 'medication',
															name      : 'medication',
															width     : 350,
															labelWidth: 80,
															listeners : {
																scope : me,
																select: me.addPrescription
															}
														},
														{
															xtype:'textfield',
															hidden:true,
															name:'medication_id',
															action:'idField'
														},
														{
															xtype     : 'numberfield',
															fieldLabel: 'Dose',
															labelWidth: 40,
															action    :'dose',
															name      : 'dose',
															width     : 100,
															value     : 0,
															minValue  : 0
														},
														{
															xtype     : 'textfield',
															fieldLabel: 'Dose mg',
															action    :'dose_mg',
															name      : 'dose_mg',
															hideLabel : true,
															width     : 150
														}
													]

												},
												{
													/**
													 * Line two
													 */
													xtype   : 'fieldcontainer',
													layout  : 'hbox',
													defaults: { margin: '5 0 5 3'},

													items: [
														{
															xtype     : 'numberfield',
															fieldLabel: 'Take',
															margin    : '5 0 5 5',
															name      : 'take_pills',
															width     : 130,
															labelWidth: 80,
															value     : 0,
															minValue  : 0
														},
														{
															xtype     : 'mitos.prescriptiontypes',
															fieldLabel: 'Type',
															hideLabel : true,
															name      : 'type',
															width     : 120
														},
														{
															xtype     : 'mitos.prescriptionhowto',
															fieldLabel: 'route',
															name      : 'route',
															hideLabel : true,
															width     : 100
														},
														{
															xtype: 'mitos.prescriptionoften',
															name : 'prescription_often',
															width: 120
														},
														{
															xtype: 'mitos.prescriptionwhen',
															name : 'prescription_when',
															width: 100
														}
													]

												},
												{
													/**
													 * Line three
													 */
													xtype   : 'fieldcontainer',
													layout  : 'hbox',
													defaults: { margin: '5 0 5 5'},
													items   : [
														{

															fieldLabel: 'Dispense',
															xtype     : 'numberfield',
															name      : 'dispense',
															width     : 130,
															labelWidth: 80,
															value     : 0,
															minValue  : 0
														},
														{
															fieldLabel: 'Refill',
															xtype     : 'numberfield',
															name      : 'refill',
															labelWidth: 35,
															width     : 140,
															value     : 0,
															minValue  : 0
														},
														{
															fieldLabel: 'Begin Date',
															xtype     : 'datefield',
															width     : 190,
															labelWidth: 70,
															format    : 'Y-m-d',
															name      : 'begin_date'

														},
														{
															fieldLabel: 'End Date',
															xtype     : 'datefield',
															width     : 180,
															labelWidth: 60,
															format    : 'Y-m-d',
															name      : 'end_date'
														}
													]

												}

											]

										}


									]
								}),
								tbar   : [
									'->',
									{
										text   : 'New Medication',
										scope  : me,
										handler: me.onAddNewPrescription

									}
								]

							}

						],
						bbar : [
							'->', {
								text   : 'Create',
								scope  : me,
								handler: me.onCreatePrescription
							}, {
								text   : 'Cancel',
								scope  : me,
								handler: me.onCancel
							}
						]

					},
					{
						title: 'New Doctors Note',
						items: [
							{
								xtype     : 'mitos.templatescombo',
								fieldLabel: 'Template',
								width     : 250,
								labelWidth: 75,
								margin    : '10 0 0 10',
								enableKeyEvents: true,
								listeners      : {
									scope   : me,
									select: me.onTemplateTypeSelect
								}
							},
							{

								xtype: 'htmleditor',
								name:'body',
								action:'body',
								itemId:'body',
								height : 285,
								width  : 700,
								margin:5

							}
						],
						bbar : [
							'->', {
								text   : 'Create',
								scope  : me,
								handler: me.onCreateDoctorsNote
							}, {
								text   : 'Cancel',
								scope  : me,
								handler: me.onCancel
							}
						]
					}
				]

			})
		];
		me.listeners = {
			scope: me,
			show : me.onDocumentsWinShow
		};
		me.callParent(arguments);
	}