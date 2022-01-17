function M_LUKAll()
{
	this.uk			= new M_LUK();
	this.uk_chart_jka	= new M_LUKChart(
				'Grafik Jam Kerja Aman Kumulatif'
				, 'Jam Kerja'
				, m_luk_d +'data_jka.jsp'
				, 'column', false);

	this.uk_chart_ltif	= new M_LUKChart(
				'Grafik LTIF'
				, ''
				, m_luk_d +'data_ltif.jsp'
				, 'column', true);

	this.uk_chart_tsaf	= new M_LUKChart(
				'Grafik TSAF'
				, ''
				, m_luk_d +'data_tsaf.jsp'
				, 'column', true);

	this.panel = new Ext.TabPanel({
		id		: 'luk_lap_unjuk_kerja_panel'
	,	activeTab	: 0
	,	items		: [
			this.uk.panel
		,	this.uk_chart_jka.panel
		,	this.uk_chart_ltif.panel
		,	this.uk_chart_tsaf.panel
		]
	});

	this.do_refresh = function(ha_level)
	{
		this.uk.do_refresh(ha_level);
		this.uk_chart_jka.do_refresh(ha_level);
		this.uk_chart_ltif.do_refresh(ha_level);
		this.uk_chart_tsaf.do_refresh(ha_level);
	}
}