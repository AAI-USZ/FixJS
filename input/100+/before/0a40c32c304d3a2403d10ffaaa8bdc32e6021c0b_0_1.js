function (model, records)
	{
		var berkaslist = this.getBerkaslist ();

		if (records.length > 0) {
			this.getMainview ().down ('#berkas_form').loadRecord (records[0]);
			berkaslist.record	= records[0];
			Earsip.berkas.id	= records[0].get ('id');
			Earsip.berkas.pid	= records[0].get ('pid');
		}

		berkaslist.down ('#del').setDisabled (! records.length);
		berkaslist.down ('#share').setDisabled (! records.length);
	}