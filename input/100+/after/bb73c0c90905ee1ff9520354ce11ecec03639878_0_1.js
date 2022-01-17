function M_ObsLapPartPegGrid()
{
	this.ha_level = 0;

	this.records = new Ext.data.Record.create([
		{name: 'name'}
	,	{name: 'id_dir'}
	,	{name: 'id_div'}
	,	{name: 'id_dep'}
	,	{name: 'id_dep'}
	,	{name: 'id_dinas'}
	,	{name: 'id_seksi'}
	,	{name: 'jan_target'}
	,	{name: 'feb_target'}
	,	{name: 'mar_target'}
	,	{name: 'apr_target'}
	,	{name: 'may_target'}
	,	{name: 'jun_target'}
	,	{name: 'jul_target'}
	,	{name: 'aug_target'}
	,	{name: 'sep_target'}
	,	{name: 'oct_target'}
	,	{name: 'nov_target'}
	,	{name: 'dec_target'}
	,	{name: 'jan_n'}
	,	{name: 'feb_n'}
	,	{name: 'mar_n'}
	,	{name: 'apr_n'}
	,	{name: 'may_n'}
	,	{name: 'jun_n'}
	,	{name: 'jul_n'}
	,	{name: 'aug_n'}
	,	{name: 'sep_n'}
	,	{name: 'oct_n'}
	,	{name: 'nov_n'}
	,	{name: 'dec_n'}
	,	{name: 'total_target'}
	,	{name: 'total_n'}
	]);

	this.store = new Ext.data.ArrayStore({
		url			: m_obs_lap_partisipasi_d +'data_part_peg.jsp'
	,	fields		: this.records
	,	autoLoad	: false
	});

	this.columns	= [
			new Ext.grid.RowNumberer({locked: true})
		,{
			header		:'Nama'
		,	dataIndex	:'name'
		,	align		:'left'
		,	width		:200
		},{
			header		:'Jan<br/><hr/>Target'
		,	dataIndex	:'jan_target'
		,	hidden		:true
		,	align		:'center'
		},{
			header		:'Jan<br/><hr/>#'
		,	dataIndex	:'jan_n'
		,	id			:'jan_target'
		,	renderer	: cell_renderer
		,	width		:50
		,	align		:'center'
		},{
			header		:'Feb<br/><hr/>Target'
		,	dataIndex	:'feb_target'
		,	hidden		:true
		,	align		:'center'
		},{
			header		:'Feb<br/><hr/>#'
		,	dataIndex	:'feb_n'
		,	id			:'feb_target'
		,	renderer	: cell_renderer
		,	width		:50
		,	align		:'center'
		},{
			header		:'Mar<br/><hr/>Target'
		,	dataIndex	:'mar_target'
		,	hidden		:true
		,	align		:'center'
		},{
			header		:'Mar<br/><hr/>#'
		,	dataIndex	:'mar_n'
		,	id			:'mar_target'
		,	renderer	: cell_renderer
		,	width		:50
		,	align		:'center'
		},{
			header		:'Apr<br/><hr/>Target'
		,	dataIndex	:'apr_target'
		,	hidden		:true
		,	align		:'center'
		},{
			header		:'Apr<br/><hr/>#'
		,	dataIndex	:'apr_n'
		,	id			:'apr_target'
		,	renderer	: cell_renderer
		,	width		:50
		,	align		:'center'
		},{
			header		:'May<br/><hr/>Target'
		,	dataIndex	:'may_target'
		,	hidden		:true
		,	align		:'center'
		},{
			header		:'May<br/><hr/>#'
		,	dataIndex	:'may_n'
		,	id			:'may_target'
		,	renderer	: cell_renderer
		,	width		:50
		,	align		:'center'
		},{
			header		:'Jun<br/><hr/>Target'
		,	dataIndex	:'jun_target'
		,	hidden		:true
		,	align		:'center'
		},{
			header		:'Jun<br/><hr/>#'
		,	dataIndex	:'jun_n'
		,	id			:'jun_target'
		,	renderer	: cell_renderer
		,	width		:50
		,	align		:'center'
		},{
			header		:'Jul<br/><hr/>Target'
		,	dataIndex	:'jul_target'
		,	hidden		:true
		,	align		:'center'
		},{
			header		:'Jul<br/><hr/>#'
		,	dataIndex	:'jul_n'
		,	id			:'jul_target'
		,	renderer	: cell_renderer
		,	width		:50
		,	align		:'center'
		},{
			header		:'Aug<br/><hr/>Target'
		,	dataIndex	:'aug_target'
		,	hidden		:true
		,	align		:'center'
		},{
			header		:'Aug<br/><hr/>#'
		,	dataIndex	:'aug_n'
		,	id			:'aug_target'
		,	renderer	: cell_renderer
		,	width		:50
		,	align		:'center'
		},{
			header		:'Sep<br/><hr/>Target'
		,	dataIndex	:'sep_target'
		,	hidden		:true
		,	align		:'center'
		},{
			header		:'Sep<br/><hr/>#'
		,	dataIndex	:'sep_n'
		,	id			:'sep_target'
		,	renderer	: cell_renderer
		,	width		:50
		,	align		:'center'
		},{
			header		:'Oct<br/><hr/>Target'
		,	dataIndex	:'oct_target'
		,	hidden		:true
		,	align		:'center'
		},{
			header		:'Oct<br/><hr/>#'
		,	dataIndex	:'oct_n'
		,	id			:'oct_target'
		,	renderer	: cell_renderer
		,	width		:50
		,	align		:'center'
		},{
			header		:'Nov<br/><hr/>Target'
		,	dataIndex	:'nov_target'
		,	hidden		:true
		,	align		:'center'
		},{
			header		:'Nov<br/><hr/>#'
		,	dataIndex	:'nov_n'
		,	id			:'nov_target'
		,	renderer	: cell_renderer
		,	width		:50
		,	align		:'center'
		},{
			header		:'Dec<br/><hr/>Target'
		,	dataIndex	:'dec_target'
		,	hidden		:true
		,	align		:'center'
		},{
			header		:'Dec<br/><hr/>#'
		,	dataIndex	:'dec_n'
		,	id			:'dec_target'
		,	renderer	: cell_renderer
		,	width		:50
		,	align		:'center'
		},{
			header		:'Total<br/><hr/>Target'
		,	dataIndex	:'total_target'
		,	hidden		:true
		,	css			:'background-color: #C9DBFF;'
		,	align		:'center'
		},{
			header		:'Total<br/><hr/>#'
		,	dataIndex	:'total_n'
		,	css			:'background-color: #C9DBFF;'
		,	width		: 75
		,	align		:'center'
	}];

	this.panel = new Ext.grid.GridPanel({
			columns		:this.columns
		,	store		:this.store
		,	autoScroll	:true
		,	height		:500
		,	tbar		: [
				{
					xtype	: 'exportbutton'
				,	store	: this.store
				}
			]

	});

	this.count_total = function(records)
	{
		var i;

		for (i = 0; i < records.length; i++) {
			total_target	= records[i].get('jan_target')
					+ records[i].get('feb_target')
					+ records[i].get('mar_target')
					+ records[i].get('apr_target')
					+ records[i].get('may_target')
					+ records[i].get('jun_target')
					+ records[i].get('jul_target')
					+ records[i].get('aug_target')
					+ records[i].get('sep_target')
					+ records[i].get('oct_target')
					+ records[i].get('nov_target')
					+ records[i].get('dec_target');

			total_n		= records[i].get('jan_n')
					+ records[i].get('feb_n')
					+ records[i].get('mar_n')
					+ records[i].get('apr_n')
					+ records[i].get('may_n')
					+ records[i].get('jun_n')
					+ records[i].get('jul_n')
					+ records[i].get('aug_n')
					+ records[i].get('sep_n')
					+ records[i].get('oct_n')
					+ records[i].get('nov_n')
					+ records[i].get('dec_n');

			records[i].set('total_target', total_target);
			records[i].set('total_n', total_n);
		}

		var sum = new this.records;

		sum.set('name', '<center><b>Total :</b></center>');

		var name, keys, k;

		for (i = 0; i < records.length; i++) {
			keys = records[i].fields.keys;
			for (k = 0; k < keys.length; k++) {
				name = keys[k];

				if (name == 'name' || name == 'id_dep'
				||  name == 'id_dinas' || name == 'id_seksi') {
					continue;
				}
				if (sum.get(name) == undefined) {
					sum.set(name, records[i].get(name));
				} else {
					sum.set(name, sum.get(name) + records[i].get(name));
				}
			}
		}

		this.store.add(sum);
	}

	this.do_load = function(id_dir, id_div, id_dep, id_dinas, id_seksi, id_wilayah
				, id_area, year)
	{
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
			}
		,	callback	: function(records,options,success) {
				if (!success) {
					return;
				}
				this.count_total(records);
			}
		});
	}
}