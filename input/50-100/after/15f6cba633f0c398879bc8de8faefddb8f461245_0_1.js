function(ha_level)
	{
		this.ha_level	= ha_level;

		if (ha_level < 1) {
			Ext.MessageBox.alert('Hak Akses'
			, 'Maaf, Anda tidak memiliki hak akses untuk melihat Safety Metrics!');
			this.panel.setDisabled(true);
			return;
		} else {
			this.panel.setDisabled(false);
			
			this.do_load();
		}
	}