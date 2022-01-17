function M_RCAGrafikPerformance()
{
	this.graf_perf_partisipasi 		= new M_RCAGrafikPerformancePartisipasi();
	this.graf_perf_severity 		= new M_RCAGrafikPerformanceSeverity();
	this.graf_perf_tindak_lanjut 	= new M_RCAGrafikPerformanceTindakLanjut();

	this.panel = new Ext.TabPanel({
		id			: 'rca_grafik_performance_panel'
	,	activeTab	: 0
	,	frame		: false
	,	items		: [
			this.graf_perf_partisipasi.panel
		,	this.graf_perf_severity.panel
		,	this.graf_perf_tindak_lanjut.panel
		]
	});

	this.do_refresh = function(ha_level)
	{
		this.ha_level = ha_level;

		this.graf_perf_partisipasi.do_refresh(ha_level);
		this.graf_perf_severity.do_refresh(ha_level);
		this.graf_perf_tindak_lanjut.do_refresh(ha_level);
	}
}