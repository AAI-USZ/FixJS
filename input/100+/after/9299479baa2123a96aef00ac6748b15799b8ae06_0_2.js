function add_stat_host(host) {
	$("#hosts").append(ich.host({uuid: host}));
	var green = "#eee";
	var yellow = "#ccc";
	var red = "#999";

	var gauge_mem = new Gauge({ 
	    renderTo: host+'-memory',
	    width: 150,
	    height: 150,
	    highlights: [{ from: 20, to: 60, color: green }, 
			 { from: 60, to: 80, color: yellow }, 
			 { from: 80, to: 100, color: red}],
	    valueFormat:{"int": 3, "dec": 0}
	});
	$("#" + host+'-memory').data("gauge",gauge_mem);
	$("#" + host+'-memory').data("first",true);
	gauge_mem.draw();

	gauge_cpu = new Gauge({ 
	    renderTo: host+'-cpu',
	    width: 150,
	    height: 150,
	    highlights: [{ from: 0, to: 30, color: green}, 
			 { from: 30, to: 80, color: yellow}, 
			 { from: 80, to: 100, color: red}],
	    valueFormat:{"int": 3, "dec": 0}
	});
 	$("#" + host+'-cpu').data("gauge",gauge_cpu);
	gauge_cpu.draw();
	var gauge_ioblock = new Gauge({
	    renderTo: host+'-ioblock',
	    width: 150,
	    height: 150,
	    highlights: [{ from: 0, to: 10, color: green}, 
			 { from: 10, to: 50, color: yellow}, 
			 { from: 50, to: 100, color: red}],
	    valueFormat:{"int": 3, "dec": 0}

	}); 
	$("#" + host+'-ioblock').data("gauge",gauge_ioblock);
	gauge_ioblock.draw();

	var gauge_paging = new Gauge({
	    renderTo: host+'-paging',
	    width: 150,
	    height: 150,
	    highlights: [{ from: 0, to: 10, color: green}, 
			 { from: 10, to: 50, color: yellow}, 
			 { from: 50, to: 100, color: red}],
	    valueFormat:{"int": 3, "dec": 0}
	}); 
	$("#" + host+'-paging').data("gauge",gauge_paging);
	gauge_paging.draw();
    }