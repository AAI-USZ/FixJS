function() {

		var me = this;

		var store = Ext.create(

				'AM.store.materialDoc.report.MaterialDocItemQuery', {

					autoLoad : false

				});

		Ext.applyIf(me, {



			dockedItems : [{

						xtype : 'form',

						// tpl : Ext.create('Ext.XTemplate', ''),

						layout : {

							type : 'column'

						},

						bodyPadding : 10,

						preventHeader : true,



						region : 'center',

						dock : 'top',

						items : [{

									xtype : 'combo',

									name : 'doc_type_txt',

									fieldLabel : '单据类型',

									store : Ext

											.create('AM.store.MaterialDocTypes'),

									queryMode : 'local',

									displayField : 'docType_txt',

									valueField : 'docType_txt'



								}, {

									xtype : 'textfield',

									fieldLabel : '合同号',

									name : 'contract_no'

								}, {

									xtype : 'textfield',

									fieldLabel : '供应商',

									name : 'supplier'

								}, {

									xtype : 'datefield',

									fieldLabel : '日期从',

									name : 'docDateFrom',

									format : 'Y-m-d'

								}, {

									xtype : 'datefield',

									fieldLabel : '日期到',

									format : 'Y-m-d',

									name : 'docDateTo'

								}, {

									xtype : 'textfield',

									fieldLabel : '仓库',

									name : 'stock_location'

								}, {

									xtype : 'textfield',

									fieldLabel : '仓单号',

									name : 'delivery_note'

								}, {

									xtype : 'textfield',

									fieldLabel : '车号/卡号',

									name : 'plate_num'

								}, {

									xtype : 'textfield',

									fieldLabel : '批次号',

									name : 'batch_no'

								}, {

									xtype : 'textfield',

									fieldLabel : '工作号',

									name : 'working_no'

								}, {

									xtype : 'textfield',

									fieldLabel : '出口发票号',

									name : 'inv_no'

								}, {

									xtype : 'textfield',

									fieldLabel : '规格(合同)',

									name : 'model_contract'

								}, {

									xtype : 'checkbox',

									fieldLabel : '显示出仓记录',

									name : 'showIncoming',

									inputValue : 'true'

								}], // 合同类型 合同号 供应商 付款方式 备注 规格 数量 单价 备注

						buttons : [{

									text : '提交',

									action : 'submit'

								}, {

									text : '取消',

									action : 'cancel',

									scope : this,

									handler : this.close



								}]

					}],

			items : [{

						xtype : 'gridpanel',

						title : '报表清单',

						region : 'center',

						store : store,

						stateful : true,

						stateId : 'materialDocItemQuery',

						// autoHight: true,

						features : [{

									ftype : 'remotesummary',

									remoteRoot : 'remoteSummary'

								}],

						// 合同号 进仓单号 进仓日期 车号/卡号 批次号 规格(合同) 规格(检验后) 净重 仓库

						columns : [{

									xtype : 'gridcolumn',

									dataIndex : 'doc_type_txt',

									text : '单据类型',

									flex : 0

								}, {

									xtype : 'gridcolumn',

									dataIndex : 'cause',

									text : '移动原因',

									flex : 0

								}, {

									xtype : 'gridcolumn',

									dataIndex : 'contract_no',

									text : '合同号'

								}, {

									xtype : 'gridcolumn',

									dataIndex : 'supplier',

									text : '供应商/客户'

								}, {

									xtype : 'gridcolumn',

									dataIndex : 'model_contract',

									text : '规格(合同)'

								}, {

									xtype : 'gridcolumn',

									dataIndex : 'unit_price',

									text : '单价',

									sortable : false

								}, {

									xtype : 'gridcolumn',

									dataIndex : 'gross_weight',

									text : '毛重'

								}, {

									xtype : 'gridcolumn',

									dataIndex : 'net_weight',

									text : '净重',

									summaryType : 'sum'

								}, {

									xtype : 'gridcolumn',

									dataIndex : 'delivery_note_in',

									text : '进仓单号'

								}, {

									xtype : 'datecolumn',

									dataIndex : 'doc_date_in',

									format : 'Y-m-d',

									text : '进仓日期'

								}, {

									xtype : 'gridcolumn',

									dataIndex : 'delivery_note_out',

									text : '出仓单号'

								}, {

									xtype : 'gridcolumn',

									dataIndex : 'inv_no',

									text : '出口发票号'

								}, {

									xtype : 'gridcolumn',

									dataIndex : 'plate_num',

									text : '车号/卡号'

								}, {

									xtype : 'gridcolumn',

									dataIndex : 'batch_no',

									text : '批次号'

								}, {

									xtype : 'gridcolumn',

									dataIndex : 'working_no',

									text : '工作号'

								}, {

									xtype : 'gridcolumn',

									dataIndex : 'purchase_contract_no',

									text : '采购合同号'

								}, {

									xtype : 'gridcolumn',

									dataIndex : 'stock_location',

									text : '仓库'



								}, {

									xtype : 'datecolumn',

									format : 'Y-m-d',

									dataIndex : 'doc_date',

									text : '日期'

								}, {

									xtype : 'numbercolumn',

									dataIndex : 'si',

									width : 60,

									align : 'right',

									text : 'si',



									format : '0.0000'

								}, {

									xtype : 'numbercolumn',

									dataIndex : 'fe',

									width : 51,

									align : 'right',

									text : 'fe',



									format : '0.0000'



								}, {

									xtype : 'numbercolumn',

									dataIndex : 'al',

									width : 51,

									align : 'right',

									text : 'al',



									format : '0.0000'



								}, {

									xtype : 'numbercolumn',

									dataIndex : 'ca',

									width : 51,

									align : 'right',

									text : 'ca',



									format : '0.0000'



								}, {

									xtype : 'numbercolumn',

									dataIndex : 'p',

									width : 51,

									align : 'right',

									text : 'p',



									format : '0.0000'



								}, {

									xtype : 'gridcolumn',

									dataIndex : 'remark',

									text : '检验备注',

									field : 'textfield'

								}],

						viewConfig : {



			}			,

						dockedItems : [{

									xtype : 'pagingtoolbar',

									// width : 360,

									displayInfo : true,

									dock : 'bottom',

									store : store,

									items : [{

												xtype : 'button',

												text : '导出到excel',

												action : 'exportToExcel'

											}]

								}]



					}]

		});



		me.callParent(arguments);

	}