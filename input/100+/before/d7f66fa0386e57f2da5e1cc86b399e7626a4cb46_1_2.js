function M_TrnMatriks()
{
	this.ha_level = 0;

	this.fields = new Ext.data.Record.create([
		{name:'nipg'}
	,	{name:'nama_pegawai'}
	,	{name:'id_jabatan'}
	,	{name:'nama_jabatan'}
	]);

	this.fields_jab = new Ext.data.Record.create([
		{name:'id'}
	,	{name:'name'}
	]);

	this.reader = new Ext.data.JsonReader(
		{
			id		:'nipg'
		,	root	:'rows'
		}
		, this.fields
	);

	this.store = new Ext.ux.data.PagingStore({
		url		: m_trn_lap_d +'data_peg_pelatihan.jsp'
	,	reader	: this.reader
	,	autoLoad: false
	});

	this.store_jab = new Ext.data.ArrayStore({
		fields	: this.fields_jab
	,	url		: _g_root +'/module/ref_jabatan/data_jabatan.jsp'
	,	autoLoad: false
	,	idIndex	:0
	});

	this.form_jab = new Ext.form.ComboBox({
		store			: this.store_jab
	,	valueField		: 'id'
	,	displayField	: 'name'
	,	mode			: 'local'
	,	editable		: false
	});

	this.columns = [
		new Ext.grid.RowNumberer({
			width		:40
		,	locked		:true
		}),{
			header		:'Nama Pegawai'
		,	dataIndex	:'nama_pegawai'
		,	hideable	:false
		,	width		:260
		,	locked		:true
		,	filterable	:true
		},{
			header		:'Jabatan'
		,	dataIndex	:'id_jabatan'
		,	renderer	:combo_renderer(this.form_jab)
		,	hideable	:false
		,	width		:180
		,	filter		:{
				type		:'list'
			,	labelField	:'name'
			,	store		:this.store_jab
			}
		}
	];

	this.cm = new Ext.ux.grid.LockingColumnModel({
		columns : this.columns
	});

	this.btn_ref = new Ext.Button({
		text	: 'Refresh'
	,	iconCls	: 'refresh16'
	,	scope	: this
	,	handler	: function() {
			this.do_refresh(this.ha_level);
		}
	});

	this.filters = new Ext.ux.grid.GridFilters({
			encode	: true
		,	local	: true
		});

	this.panel = new Ext.grid.GridPanel({
		title		: 'Matriks Pelatihan'
	,	store		: this.store
	,	cm			: this.cm
	,	autoScroll	: true
	,	autoWidth	: true
	,	stripeRows	: true
	,	columnLines	: true
	,	view		: new Ext.ux.grid.LockingGridView({
			syncHeights	:true
		})
	,	plugins		: [this.filters]
	,	tbar		: [
			this.btn_ref
			,	'->'
			,	{
				xtype	: 'exportbutton'
			,	store	: this.store}
		]
	,	bbar		: new Ext.PagingToolbar({
			store		: this.store
		,	pageSize	: 50
		,	plugins		: [this.filters]
		})
	});

	this.create_header = function(col_headers)
	{
		Ext.iterate(col_headers, function(k,v) {
			Ext.each(v, function(col) {
				this.store.addField({
					name		: col.id
				});

				this.columns.push({
					header		: col.name
				,	align		: 'center'
				,	dataIndex	: col.id
				,	xtype		: 'datecolumn'
				,	format		: 'Y-m-d'
				,	filter		:{
						type	:'date'
					,	format	:'Y-m-d'
					}
				});
			}, this);
		}, this);

		this.cm.setConfig(this.columns);
	}

	this.init = function()
	{
		Ext.Ajax.request({
			url	: m_trn_lap_d +'data_column_header.jsp'
		,	waitMsg	: 'Mohon Tunggu ...'
		,	success :
				function (response)
				{
					var msg = Ext.util.JSON.decode(response.responseText);

					if (msg.success == false) {
						Ext.MessageBox.alert('Pesan', msg.info);
					}

					this.create_header(msg);
				}
		,	scope	: this
		});
	}

	this.init();

	this.do_refresh = function(ha_level)
	{
		this.ha_level = ha_level;

		this.store_jab.reload();

		this.store.reload({
			params	: {
				start	: 0
			,	limit	: 50
			}
		});
	}
}