function (model, records)
	{
		var list = this.getBerkas_jra_list ();

		if (records.length > 0) {
			this.getBerkas_jra ().down ('#berkas_jra_form').loadRecord (records[0]);
		}
	}