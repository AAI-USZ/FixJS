function M_RCALapSeverityGrid()
{
	this.ha_level		= 0;

	this.record = new Ext.data.Record.create([
			{ name: 'description' }
		,	{ name: 'id_severity' }
		,	{ name: 'nama_tempat_rca' }
		,	{ name: 'penanggung_jawab_seksi' }
		,	{ name: 'nama_seksi' }
		,	{ name: 'penanggung_jawab_dinas' }
		,	{ name: 'nama_dinas' }
		,	{ name: 'penanggung_jawab_departemen' }
		,	{ name: 'nama_departemen' }
		,	{ name: 'penanggung_jawab_divprosbu' }
		,	{ name: 'nama_divprosbu' }
		,	{ name: 'penanggung_jawab_direktorat' }
		,	{ name: 'nama_direktorat' }
		,	{ name: 'completion_date_target' }
		,	{ name: 'status' }
		,	{ name: 'nama_status' }
		,	{ name: 'note' }
	]);

	this.store = new Ext.ux.data.PagingArrayStore({
			url			: m_rca_lap_severity_d +'data.jsp'
		,	fields		: this.record
		,	idIndex		: 0
		,	autoLoad	: false
	});

	this.store_status = new Ext.data.ArrayStore({
			fields	: ['id','name']
		,	data	: [
				[1,'Open']
			,	[2,'Process']
			,	[3,'Closed']
			]
		,	idIndex	: 0
	});

	this.form_status = new Ext.form.ComboBox({
			store			: this.store_status
		,	valueField		: 'id'
		,	displayField	: 'name'
		,	mode			: 'local'
		,	typeAhead		: true
		,	triggerAction	: 'all'
	});

	this.columns = [
		new Ext.grid.RowNumberer({
			locked		: true
		,	width		: 25
		}),{
			id			: 'description'
		,	header		: 'Deskripsi Severity'
		,	dataIndex	: 'description'
		,	sortable	: true
		,	width		: 300
		},{
			header		: 'Severity'
		,	dataIndex	: 'id_severity'
		,	align		: 'center'
		,	sortable	: true
		,	width		: 70
		},{
			header		: 'Lokasi'
		,	dataIndex	: 'nama_tempat_rca'
		,	sortable	: true
		,	width		: 200
		},{
			header		: 'Direktorat Owner'
		,	dataIndex	: 'nama_direktorat'
		,	sortable	: true
		,	width		: 250
		},{
			header		: 'Divisi/Proyek/SBU Owner'
		,	dataIndex	: 'nama_divprosbu'
		,	sortable	: true
		,	width		: 250
		},{
			header		: 'Departemen Owner'
		,	dataIndex	: 'nama_departemen'
		,	sortable	: true
		,	width		: 250
		},{
			header		: 'Dinas Owner'
		,	dataIndex	: 'nama_dinas'
		,	sortable	: true
		,	width		: 300
		},{
			header		: 'Seksi Owner'
		,	dataIndex	: 'nama_seksi'
		,	sortable	: true
		,	width		: 300
		},{
			header		: 'Target Tindak Lanjut'
		,	dataIndex	: 'completion_date_target'
		,	align		: 'center'
		,	sortable	: true
		,	width		: 100
		},{
			header		: 'Status'
		,	dataIndex	: 'status'
		,	align		: 'center'
		,	sortable	: true
		,	width		: 70
		,	renderer	: combo_renderer(this.form_status)
		},{
			header		: 'Keterangan'
		,	dataIndex	: 'note'
		,	sortable	: true
		,	width		: 200
		}];

	this.panel = new Ext.grid.GridPanel({
			autoScroll	: true
		,	height		: 500
		,	store		: this.store
		,	columns		: this.columns
		,	tbar		: [
				{
					xtype	: 'exportbutton'
				,	store	: this.store
				}
			]
		,	bbar		: new Ext.PagingToolbar({
				store	: this.store
			,	pageSize: 50
			})
	});

	this.do_load = function(id_dir, id_div, id_dep, id_dinas, id_seksi, id_wilayah, id_area, year, month)
	{
		delete this.store.lastParams;
		
		this.store.load({
			scope		: this
		,	params		: {
				id_dir		: id_dir
			,	id_div		: id_div
			,	id_dep		: id_dep
			,	id_dinas	: id_dinas
			,	id_seksi	: id_seksi
			,	id_wilayah	: id_wilayah
			,	id_area		: id_area
			,	year		: year
			,	month		: month
			}
		});
	}
}