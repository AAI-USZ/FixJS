function M_LapSafetyMetrics()
{
	this.ha_level		= 0;
	this.id_direktorat	= 0;
	this.id_divprosbu	= 0;
	this.prev_tahun		= 0;
	this.prev_bulan		= 0;
	this.tahun			= 0;
	this.bulan			= 0;
	this.year			= (new Date).getFullYear();

	this.store_direktorat = new Ext.data.ArrayStore({
			fields		: ['id', 'name']
		,	url			: _g_root +'/module/ref_organisasi/data_direktorat.jsp'
		,	idIndex		: 0
		,	autoLoad	: false
	});

	this.store_divprosbu = new Ext.data.ArrayStore({
			fields		: ['id_direktorat', 'id', 'name']
		,	url			: _g_root +'/module/ref_organisasi/data_divprosbu.jsp'
		,	idIndex		: 1
		,	autoLoad	: false
	});

	this.form_direktorat = new Ext.form.ComboBox({
			store			: this.store_direktorat
		,	valueField		: 'id'
		,	displayField	: 'name'
		,	fieldLabel		: 'Direktorat'
		,	mode			: 'local'
		,	allowBlank		: false
		,	typeAhead		: true
		,	triggerAction	: 'all'
		,	selectOnFocus	: true
		,	width			: 300
		,	listWidth		: 400
		,	listeners		: {
				scope	: this
			,	select	: function(cb, record, index) {
					this.form_direktorat_on_select(record.get('id'));
				}
			}
	});

	this.form_divprosbu = new Ext.form.ComboBox({
			store			: this.store_divprosbu
		,	valueField		: 'id'
		,	displayField	: 'name'
		,	fieldLabel		: 'Divisi/Proyek/SBU'
		,	mode			: 'local'
		,	allowBlank		: false
		,	typeAhead		: true
		,	triggerAction	: 'all'
		,	selectOnFocus	: true
		,	width			: 300
		,	listWidth		: 400
		,	listeners		: {
				scope	: this
			,	select	: function(cb, record, index) {
					this.id_divprosbu	= record.get('id');
				}
			}
	});
	
	this.store_month = new Ext.data.ArrayStore({
			fields	: ['id', 'name']
		,	data	: [[1,'Januari'],
					   [2,'Februari'],
					   [3,'Maret'],
					   [4,'April'],
					   [5,'Mei'],
					   [6,'Juni'],
					   [7,'Juli'],
					   [8,'Agustus'],
					   [9,'September'],
					   [10,'Oktober'],
					   [11,'November'],
					   [12,'Desember']]
		});

	this.form_month = new Ext.form.ComboBox({
			store			: this.store_month
		,	valueField		: 'id'
		,	displayField	: 'name'
		,	fieldLabel		: 'Bulan'
		,	mode			: 'local'
		,	allowBlank		: false
		,	typeAhead		: true
		,	triggerAction	: 'all'
		,	selectOnFocus	: true
		,	width			: 150
		});

	this.form_month.setValue(this.store_month.getAt(0).data['id']);		

	this.get_form_year_data = function()
	{
		var d			= new Date();
		var cur_year	= d.getFullYear();
		var years		= '[["'+ cur_year +'"]';

		for(var i=1; i<=10; i++) {
			years += ',["'+ (cur_year - i) +'"]';
		}

		years += ']';

		return Ext.util.JSON.decode(years);
	}

	this.store_year = new Ext.data.ArrayStore({
		fields	: ['year']
	,	data	: this.get_form_year_data()
	});

	this.form_year = new Ext.form.ComboBox({
			store			: this.store_year
		,	valueField		: 'year'
		,	displayField	: 'year'
		,	fieldLabel		: 'Tahun'
		,	mode			: 'local'
		,	allowBlank		: false
		,	typeAhead		: true
		,	triggerAction	: 'all'
		,	selectOnFocus	: true
		,	width			: 100
		});

	this.form_year.setValue(this.store_year.getAt(0).data['year']);

	this.btn_print = new Ext.Button({
			text	: 'Print'
		,	iconCls	: 'print16'
		,	scope	: this
		,	handler	: function() {
				this.do_print();
			}
		});

	this.panel_form = new Ext.form.FormPanel({
		autoHeight	: true
	,	buttonAlign	: 'center'
	,	frame		: true
	,	labelWidth	: 150
	,	labelAlign	: 'right'
	,	width		: 500
	,	buttons		: [
			this.btn_print
		]
	,	items		:[
			this.form_direktorat
		,	this.form_divprosbu
		,	this.form_month
		,	this.form_year
		]
	});

	this.panel = new Ext.Panel({
		id			: 'lap_safety_metrics_panel'
	,	title		: 'SAFETY METRICS'
	,	autoScroll	: true
	,	defaults	:{
			style		:{
					marginLeft		: 'auto'
				,	marginRight		: 'auto'
				,	marginBottom	: '8px'
			}
		}
	,	items		: [
			this.panel_form
		]
	});

	this.do_print = function()
	{
		this.tahun	= this.form_year.getValue();
		this.bulan	= this.form_month.getValue();
		
		if (this.bulan == 1){
			this.prev_bulan = 12;
			this.prev_tahun = this.tahun - 1;
		} else {
			this.prev_bulan = this.bulan - 1;
			this.prev_tahun = this.tahun;
		}
		
		var form;
		var id_report	= '17';
		var tipe_report	= 'xls';
		form = document.createElement('form');

		form.setAttribute('method', 'post');
		form.setAttribute('target', '_blank');		
		form.setAttribute('action', _g_root +'/report');
		
		var hiddenField1 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
        hiddenField1.setAttribute('name', 'id');
        hiddenField1.setAttribute('value', id_report);
		
		var hiddenField2 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField2.setAttribute('name', 'type');
        hiddenField2.setAttribute('value', tipe_report);

		var hiddenField3 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField3.setAttribute('name', 'prev_year');
        hiddenField3.setAttribute('value', this.prev_tahun);
		
		var hiddenField4 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField4.setAttribute('name', 'prev_month');
        hiddenField4.setAttribute('value', this.prev_bulan);
		
		var hiddenField5 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField5.setAttribute('name', 'year');
        hiddenField5.setAttribute('value', this.tahun);
		
		var hiddenField6 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField6.setAttribute('name', 'month');
        hiddenField6.setAttribute('value', this.bulan);
		
		var hiddenField7 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField7.setAttribute('name', 'id_dir');
        hiddenField7.setAttribute('value', this.id_direktorat);
		
		var hiddenField8 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField8.setAttribute('name', 'id_div');
        hiddenField8.setAttribute('value', this.id_divprosbu);
				
		form.appendChild(hiddenField1);
		form.appendChild(hiddenField2);
		form.appendChild(hiddenField3);
		form.appendChild(hiddenField4);
		form.appendChild(hiddenField5);
		form.appendChild(hiddenField6);
		form.appendChild(hiddenField7);
		form.appendChild(hiddenField8);
		document.body.appendChild(form);
		form.submit();
	}
	
	this.form_direktorat_on_select = function(id_direktorat)
	{
		this.id_direktorat = id_direktorat;

		this.form_divprosbu.clearFilter(true);
		this.form_divprosbu.filterBy(function (r, id)
		{
			var id_dir	= r.get('id_direktorat');
			var id_div	= r.get('id');

			if (id_dir	== 0
			|| id_div	== 0
			|| id_dir	== this.id_direktorat) {
				return true;
			}
			return false;
		}
		, this);

		this.form_divprosbu.setValue(this.store_divprosbu.getAt(0).get('id'));
	}

	this.do_load = function()
	{
		this.store_direktorat.load({
				scope		: this
			,	callback	: function(){
					var record_all_direktorat = new Ext.data.Record ({
							id		: 0
						,	name	: 'Semua Direktorat'
					});
								
					this.store_direktorat.insert(0, record_all_direktorat);

					if (this.store_direktorat.getTotalCount() > 0) {
						this.form_direktorat.setValue(this.store_direktorat.getAt(0).get('id'));
					}

					this.store_divprosbu.load({
							scope		: this
						,	params		: {
								id_direktorat	: this.id_direktorat
							}
						,	callback	:  function(){
								var record_all_divprosbu = new Ext.data.Record ({
										id_direktorat	: 0
									,	id				: 0
									,	name			: 'Semua Divisi/Proyek/SBU'
								});
											
								this.store_divprosbu.insert(0, record_all_divprosbu);
								
								if (this.store_divprosbu.getTotalCount() > 0) {
									this.form_divprosbu.setValue(this.store_divprosbu.getAt(0).get('id'));
								}
							}
					});
				}
		});		
	}

	this.do_refresh = function(ha_level)
	{
		this.ha_level	= ha_level;

		if (ha_level < 1) {
			Ext.MessageBox.alert('Hak Akses'
			, 'Maaf, Anda tidak memiliki hak akses untuk melihat Safety Metrics!');
			this.panel.setDisabled(true);
			return;
		} else {
			this.panel.setDisabled(false);
			
			this.do_load();
		}
	}
}