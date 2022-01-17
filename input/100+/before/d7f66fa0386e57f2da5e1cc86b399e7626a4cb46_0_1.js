function(id_dir, id_div, id_dep, id_dinas, id_seksi, id_wilayah, id_area, year, month)
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