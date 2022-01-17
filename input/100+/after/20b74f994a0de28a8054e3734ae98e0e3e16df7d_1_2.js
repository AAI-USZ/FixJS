function M_LUK_JBA ()
{
	this.grid_store = new Ext.data.JsonStore ({
				url			: m_luk_d +'data_jba.jsp'
			,	autoLoad	: false
			,	storeId		: 'JBA'
			,	fields		: [
						'dir_id'
					,	'dir_name'
					,	'jan'
					,	'feb'
					,	'mar'
					,	'apr'
					,	'may'
					,	'jun'
					,	'jul'
					,	'aug'
					,	'sep'
					,	'oct'
					,	'nov'
					,	'dec'
				]
			,	idProperty	:'dir_id'
		});

	this.grid_cm = new Ext.grid.ColumnModel ({
			columns	: [{
					header		:'Direktorat'
				,	dataIndex	:'dir_name'
				,	width		:260
				},{
					header		:'Januari'
				,	dataIndex	:'jan'
				},{
					header		:'Februari'
				,	dataIndex	:'feb'
				},{
					header		:'Maret'
				,	dataIndex	:'mar'
				},{
					header		:'April'
				,	dataIndex	:'apr'
				},{
					header		:'Mei'
				,	dataIndex	:'may'
				},{
					header		:'Juni'
				,	dataIndex	:'jun'
				},{
					header		:'Juli'
				,	dataIndex	:'jul'
				},{
					header		:'Agustus'
				,	dataIndex	:'aug'
				},{
					header		:'September'
				,	dataIndex	:'sep'
				},{
					header		:'Oktober'
				,	dataIndex	:'oct'
				},{
					header		:'November'
				,	dataIndex	:'nov'
				},{
					header		:'Desember'
				,	dataIndex	:'dec'
				}]
		});

	this.grid = new Ext.grid.GridPanel ({
		title		: 'Data'
	,	autoHeight	: true
	,	autoScroll	: true
	,	store		: this.grid_store
	,	colModel	: this.grid_cm
	});

	this.chart = new Ext.Panel ({
			title		: 'Grafik'
		,	html		: '<div id="luk_jba_chart"></div>'
		,	view		: {}
		,	chartConfig	: {
				chart		: {
					renderTo			: 'luk_jba_chart'
				,	defaultSeriesType	: 'column'
				}
			,	title	: {
					text		: 'Grafik Jarak Berkendara Aman (KM)'
				}
			,	subtitle: {
					text		: 'Tahun'
				}
			,	xAxis	: {
					categories	: [
						'Jan'
					,	'Feb'
					,	'Mar'
					,	'Apr'
					,	'Mei'
					,	'Jun'
					,	'Jul'
					,	'Agu'
					,	'Sep'
					,	'Okt'
					,	'Nov'
					,	'Des'
					]
				}
			,	yAxis	: {
					title		: {
						text		: ''
					}
				}
			,	legend	: {
					layout		: 'horizontal'
				}
			,	series	: []
			}
		});

	this.form_year = new Ext.form.ComboBox ({
			fieldLabel		: 'Tahun'
		,	store			: new Ext.data.ArrayStore({
				fields			: ['year']
			,	data			: k3pl_create_form_year_data(10)
			})
		,	valueField		: 'year'
		,	displayField	: 'year'
		,	allowBlank		: false
		,	mode			: 'local'
		,	triggerAction	: 'all'
		});

	this.btn_ref = new Ext.Button({
		text	: 'Refresh'
	,	iconCls	: 'refresh16'
	,	scope	: this
	,	handler	: function() {
			this.do_load();
		}
	});

	this.panel = new Ext.Panel ({
		title		: 'Jarak Berkendaraan Aman'
	,	autoScroll	: true
	,	frame		: false
	,	padding		: '6'
	,	tbar		: [
				'Tahun : '
			,	this.form_year
			,	'-'
			,	this.btn_ref
		]
	,	items		: [
				this.grid
			,	this.chart
		]
	});

	this.do_load = function ()
	{
		var year = this.form_year.getValue ();

		this.grid_store.load ({
			scope	: this
		,	params	: {
				year	: year
			}
		,	callback: function (records, options, success) {
				if (! success || records.length <= 0) {
					return;
				}

				/* hide all month columns except for the last four months */
				var d		= new Date();
				var m_end	= d.getMonth() + 1;
				var m_start	= 1;

				if (m_end > 3) {
					m_start = m_end - 3;
				}

				for (var i = 1; i < this.grid_cm.getColumnCount (); i++) {
					if (i < m_start || i > m_end) {
						this.grid_cm.setHidden (i, true);
					} else {
						this.grid_cm.setHidden (i, false);
					}
				}

				this.chart.chartConfig.subtitle.text	= 'Tahun '+ year;
				this.chart.chartConfig.xAxis.min		= m_start - 1;
				this.chart.chartConfig.xAxis.max		= m_end - 1;
				this.chart.chartConfig.series			= this.convert_records_to_series (records);
				this.chart.view = new Highcharts.Chart (this.chart.chartConfig);
			}
		});
	}

	this.convert_records_to_series = function (records)
	{
		var s = [];
		var r;
		for (var i = 0; i < records.length; i++) {
			r			= records[i];
			s[i]		= {};
			s[i].name	= r.get('dir_name');
			s[i].data	= [];
			s[i].data.push (parseInt (r.get('jan')));
			s[i].data.push (parseInt (r.get('feb')));
			s[i].data.push (parseInt (r.get('mar')));
			s[i].data.push (parseInt (r.get('apr')));
			s[i].data.push (parseInt (r.get('may')));
			s[i].data.push (parseInt (r.get('jun')));
			s[i].data.push (parseInt (r.get('jul')));
			s[i].data.push (parseInt (r.get('aug')));
			s[i].data.push (parseInt (r.get('sep')));
			s[i].data.push (parseInt (r.get('oct')));
			s[i].data.push (parseInt (r.get('nov')));
			s[i].data.push (parseInt (r.get('dec')));
		}

		console.log (s);

		return s;
	}
}