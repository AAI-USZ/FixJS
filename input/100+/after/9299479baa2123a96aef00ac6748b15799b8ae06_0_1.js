function update_host_stats(host, stats) {
	var gauge_mem = $("#" + host+'-memory').data("gauge");
	if ($("#" + host+'-memory').data("first")) {
	    gauge_mem.config.maxValue = stats.memory.total/(1024* 1024);
	    gauge_mem.draw();
	    $("#" + host+'-memory').data("false")
	}
	gauge_mem.setValue((stats.memory.total - stats.memory.free)/(1024*1024));
	$("#" + host+'-cpu').data("gauge").setValue(stats.cpu.user + stats.cpu.system);
	$("#" + host+'-ioblock').data("gauge").setValue(stats.kthr.blocked);
	$("#" + host+'-paging').data("gauge").setValue(stats.page.in + stats.page.out);
	var mpstat_chart = $("#" + host+'-mpstat').data("chart");
	if (mpstat_chart) {
	    mpstat_chart.update(stats.cpu.details);
	} else {
	    console.log(stats.cpu);
	    $("#" + host+'-mpstat').data("chart",mpstat.create(host, stats.cpu.details));
	}
	
    }