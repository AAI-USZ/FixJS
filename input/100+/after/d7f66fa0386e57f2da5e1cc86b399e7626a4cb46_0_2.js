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

	this.btn_print = new Ext.Button({
			text		: 'Print'
		,	iconCls		: 'print16'
		,	scope		: this
		,	handler		: function() {
				this.do_print();
			}
	});

	this.panel = new Ext.grid.GridPanel({
			autoScroll	: true
		,	height		: 500
		,	store		: this.store
		,	columns		: this.columns
		,	tbar		: [ this.btn_print ]
		,	bbar		: new Ext.PagingToolbar({
				store	: this.store
			,	pageSize: 50
			})
	});

	this.do_print = function()
	{
		var form;
		var id_report	= '25';
		var tipe_report	= 'xls';
		var isinorg		= m_rca_lap_severity.form.set_org.isChecked();
		
		if (isinorg){
			is_in_org	= '1'
		} else {
			is_in_org	= '0'
		}
		
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
		hiddenField3.setAttribute('name', 'is_in_org');
        hiddenField3.setAttribute('value', is_in_org);
		
		var hiddenField4 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField4.setAttribute('name', 'year');
        hiddenField4.setAttribute('value', m_rca_lap_severity.form.set_waktu.formTahun.getValue());
		
		var hiddenField5 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField5.setAttribute('name', 'month');
        hiddenField5.setAttribute('value', m_rca_lap_severity.form.set_waktu.formBulan.getValue());

		var hiddenField6 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField6.setAttribute('name', 'id_dir');
        hiddenField6.setAttribute('value', m_rca_lap_severity.form.set_org.formDirektorat.getValue());
		
		var hiddenField7 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField7.setAttribute('name', 'id_div');
        hiddenField7.setAttribute('value', m_rca_lap_severity.form.set_org.formDivProSBU.getValue());
		
		var hiddenField8 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField8.setAttribute('name', 'id_dep');
        hiddenField8.setAttribute('value', m_rca_lap_severity.form.set_org.formDepartemen.getValue());
		
		var hiddenField9 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField9.setAttribute('name', 'id_dinas');
        hiddenField9.setAttribute('value', m_rca_lap_severity.form.set_org.formDinas.getValue());
		
		var hiddenField10 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField10.setAttribute('name', 'id_seksi');
        hiddenField10.setAttribute('value', m_rca_lap_severity.form.set_org.formSeksi.getValue());
		
		var hiddenField11 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField11.setAttribute('name', 'id_wilayah');
        hiddenField11.setAttribute('value', m_rca_lap_severity.form.set_wil.formWilayah.getValue());
		
		var hiddenField12 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField12.setAttribute('name', 'id_area');
        hiddenField12.setAttribute('value', m_rca_lap_severity.form.set_wil.formArea.getValue());
				
		form.appendChild(hiddenField1);
		form.appendChild(hiddenField2);
		form.appendChild(hiddenField3);
		form.appendChild(hiddenField4);
		form.appendChild(hiddenField5);
		form.appendChild(hiddenField6);
		form.appendChild(hiddenField7);
		form.appendChild(hiddenField8);
		form.appendChild(hiddenField9);
		form.appendChild(hiddenField10);
		form.appendChild(hiddenField11);
		form.appendChild(hiddenField12);
		document.body.appendChild(form);
		form.submit();
	}
	
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