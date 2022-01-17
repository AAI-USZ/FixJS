function ()
	{
		this.control ({
				'lap_berkas_jra button[action=print]': {
					click : this.do_print_berkas_jra
				}
			,	'lap_berkas_jra button[itemId=refresh]': {
					click : this.do_refresh
				}
		})
	}