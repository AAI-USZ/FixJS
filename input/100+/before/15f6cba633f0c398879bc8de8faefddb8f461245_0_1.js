function M_LapSafetyMetrics()
{
	this.ha_level		= 0;
	this.year		= (new Date).getFullYear();

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
		,	mode			: 'local'
		,	allowBlank		: false
		,	typeAhead		: true
		,	triggerAction	: 'all'
		,	selectOnFocus	: true
		,	width			: 150
		,	listeners		: {
				scope	: this
			,	select	: function(cb, record, index) {
					m_lap_safety_metrics_month = record.get('name');
				}
			}
		});

	this.form_month.setValue(this.store_month.getAt(0).data['id']);		

	this.form_month_label = new Ext.form.Label({
			html	: '&nbsp;&nbsp;Bulan :&nbsp;&nbsp;'
		});
	
	this.get_form_year_data = function()
	{
		var d		= new Date();
		var cur_year	= d.getFullYear();
		var years	= '[["'+ cur_year +'"]';

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
		,	mode			: 'local'
		,	allowBlank		: false
		,	typeAhead		: true
		,	triggerAction	: 'all'
		,	selectOnFocus	: true
		,	width			: 100
		});

	this.form_year.setValue(this.store_year.getAt(0).data['year']);

	this.form_year_label = new Ext.form.Label({
			html	: '&nbsp;&nbsp;Tahun :&nbsp;&nbsp;'
		});

	this.btn_proses = new Ext.Button({
			text	: 'Filter'
		,	iconCls	: 'refresh16'
		,	scope	: this
		,	handler	: function() {
				this.do_proses(this.form_year.getValue(),this.form_month.getValue());
			}
		});

	this.store = new Ext.data.ArrayStore({
			fields	: [
			  'no_urut'
			, 'tipe_item'
			, 'item'
			, 'prev_month'
			, 'operasi_dan_pemeliharaan'
			, 'enjiniring_dan_pembangunan'
			, 'penjualan_dan_layanan'
			, 'logistik_dan_administrasi_umum'
			, 'integritas_jaringan_dan_k3pl'
			, 'keuangan_dan_sdm'
			, 'total_sbu'
			, 'ytd'
			, 'target'
			]
		,	url	: _g_root +'/module/lap_safety_metrics/data.jsp'
		,	autoLoad: false
	});

	this.cm = new Ext.grid.ColumnModel({
		columns	: [
		{
			header		: ''
		,	dataIndex	: 'tipe_item'
		,	width		: 80
		},
		{
			header		: 'ITEM'
		,	dataIndex	: 'item'
		,	width		: 100
		},
		{
			header		: m_lap_safety_metrics_month + ' ' + this.form_year.getValue()
		,	dataIndex	: 'prev_month'
		,	width		: 50
		,	align		: 'center'
		},
		{
			header		: 'Operasi & Pemeliharaan'
		,	dataIndex	: 'operasi_dan_pemeliharaan'
		,	width		: 50
		,	align		: 'center'
		},
		{
			header		: 'Enjiniring & Pembangunan'
		,	dataIndex	: 'enjiniring_dan_pembangunan'
		,	width		: 50
		,	align		: 'center'
		},
		{
			header		: 'Penjualan & Layanan'
		,	dataIndex	: 'penjualan_dan_layanan'
		,	width		: 50
		,	align		: 'center'
		},
		{
			header		: 'Logistik & Administrasi Umum'
		,	dataIndex	: 'logistik_dan_administrasi_umum'
		,	width		: 50
		,	align		: 'center'
		},
		{
			header		: 'Integritas Jaringan & K3PL'
		,	dataIndex	: 'integritas_jaringan_dan_k3pl'
		,	width		: 50
		,	align		: 'center'
		},
		{
			header		: 'Keuangan & SDM'
		,	dataIndex	: 'keuangan_dan_sdm'
		,	width		: 50
		,	align		: 'center'
		},
		{
			header		: 'Total ' + m_lap_safety_metrics_month + ' ' + this.form_year.getValue()
		,	dataIndex	: 'total_sbu'
		,	width		: 50
		,	align		: 'center'
		},
		{
			header		: 'Year To Date (YTD) ' + this.form_year.getValue()
		,	dataIndex	: 'ytd'
		,	width		: 50
		,	align		: 'center'
		},
		{
			header		: 'Target ' + this.form_year.getValue()
		,	dataIndex	: 'target'
		,	width		: 50
		,	align		: 'center'
		}]
	,	defaults : {
			hideable	: false
		}
	});

	this.sm = new Ext.grid.RowSelectionModel({
		singleSelect	: true
	});

	this.grid = new Ext.grid.GridPanel({
		title				: 'SAFETY METRICS'
	,	store				: this.store
	,	cm					: this.cm
	,	autoHeight			: true
	,	autoScroll			: true
	,	stripeRows			: true
	,	autoExpandColumn	: 'item'
	,	viewConfig			: {forceFit: true}
	,	tbar				: [
			this.form_year_label
		,	this.form_year
		,	'-'
		,	this.form_month_label
		,	this.form_month
		,	'-'
		,	this.btn_proses
		,	'->'
		,	{
				xtype	: 'exportbutton'
			,	store	: this.store
			}
		]
	});

	this.panel = new Ext.Container({
		id			: 'lap_safety_metrics_panel'
	,	layout		: 'card'
	,	activeItem	: 0
	,	items		: [
			this.grid
		]
	});

	this.do_proses = function(year, month)
	{
		this.store.load({
			scope	: this
		,	params	: {
				year	: year
			,	month	: month
			}
		});
		
		var id_bulan = 0;
		var id_tahun = 0;
		
		id_bulan = this.form_month.getValue();
		id_tahun = this.form_year.getValue();
		
		if (id_bulan == 1){
			id_bulan = 11;
			id_tahun = id_tahun - 1;
		} else {
			id_bulan = id_bulan - 2;
		}
		
		this.cm.setColumnHeader(2, this.store_month.getAt(id_bulan).data['name'] + ' ' + id_tahun);
		this.cm.setColumnHeader(9, 'Total ' + m_lap_safety_metrics_month + ' ' + this.form_year.getValue());
		this.cm.setColumnHeader(10, 'Year To Data (YTD) ' + this.form_year.getValue());
		this.cm.setColumnHeader(11, 'Target ' + this.form_year.getValue());
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
		}
	}
}