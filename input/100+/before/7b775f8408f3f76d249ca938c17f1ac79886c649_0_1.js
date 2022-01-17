function(){
     $('#usegraph').click( function(){
        if ($('#grapherror').length>0)
        {
            $('#grapherror').show();
            $('#usegraph').attr('checked',false);
        }
     })
     $('#viewsummaryall').click( function(){
        if ($('#viewsummaryall').attr('checked')==true)
        {
            $('#filterchoices input[type=checkbox]').attr('checked', true);
        }
        else
        {
            $('#filterchoices input[type=checkbox]').attr('checked', false);

        }
     })
     $('#hidefilter').click( function(){
            $('#filterchoices').hide();
            $('#filterchoice_state').val('1');
            $('#vertical_slide2').hide();
     })
     $('#showfilter').click( function(){
            $('#filterchoices').show();
            $('#filterchoice_state').val('');
            $('#vertical_slide2').show();
     })

     if (typeof aGMapData == "object") {
         for (var i in aGMapData) {
     		gMapInit("statisticsmap_" + i, aGMapData[i]);
	     }
	 }

	 if (typeof aStatData == "object") {
	    for (var i in aStatData) {
	        statInit(aStatData[i]);
        }
	 }

	 $(".stats-hidegraph").click (function ()
	 {

        var id = statGetId(this.parentNode);
        if (!id) {
            return;
        }

	    $("#statzone_" + id).html(getWaiter());
        graphQuery(id, 'hidegraph', function (res) {
            if (!res) {
                ajaxError();
                return;
            }

            data = JSON.parse(res);

            if (!data || !data.ok) {
                ajaxError();
                return;
            }

            isWaiting[id] = false;
            aStatData[id].sg = false;
            statInit(aStatData[id]);
        });
	 });

	 $(".stats-showgraph").click(function ()
	 {
        var id = statGetId(this.parentNode);
        if (!id) {
            return;
        }

	    $("#statzone_" + id).html(getWaiter()).show();
	    graphQuery(id, 'showgraph', function (res) {
            if (!res) {
                ajaxError();
                return;
            }
            data = JSON.parse(res);

            if (!data || !data.ok || !data.chartdata) {
                ajaxError();
                return;
            }

            isWaiting[id] = false;
            aStatData[id].sg = true;
            statInit(aStatData[id]);

            $("#statzone_" + id).append("<img border='1' src='" + temppath +"/"+data.chartdata + "' />");

            if (aStatData[id].sm) {
                if (!data.mapdata) {
                    ajaxError();
                    return;
                }

                $("#statzone_" + id).append("<div id=\"statisticsmap_" + id + "\" class=\"statisticsmap\"></div>");
                gMapInit('statisticsmap_' + id, data.mapdata);
            }

            $("#statzone_" + id + " .wait").remove();

	    });
     });

	 $(".stats-hidemap").click (function ()
	 {
        var id = statGetId(this.parentNode);
        if (!id) {
            return;
        }

	    $("#statzone_" + id + ">div").replaceWith(getWaiter());

	    graphQuery(id, 'hidemap', function (res) {
            if (!res) {
                ajaxError();
                return;
            }

            data = JSON.parse(res);

            if (!data || !data.ok) {
                ajaxError();
                return;
            }

            isWaiting[id] = false;
            aStatData[id].sm = false;
            statInit(aStatData[id]);

            $("#statzone_" + id + " .wait").remove();
	    });
	 });

	 $(".stats-showmap").click(function ()
	 {
        var id = statGetId(this.parentNode);
        if (!id) {
            return;
        }

	    $("#statzone_" + id).append(getWaiter());

	    graphQuery(id, 'showmap', function (res) {
            if (!res) {
                ajaxError();
                return;
            }

            data = JSON.parse(res);

            if (!data || !data.ok || !data.mapdata) {
                ajaxError();
                return;
            }

            isWaiting[id] = false;
            aStatData[id].sm = true;
            statInit(aStatData[id]);

            $("#statzone_" + id + " .wait").remove();
            $("#statzone_" + id).append("<div id=\"statisticsmap_" + id + "\" class=\"statisticsmap\"></div>");

            gMapInit('statisticsmap_' + id, data.mapdata);
	    });
	 });

	 $(".stats-showbar").click(function ()
	 {
	    changeGraphType('showbar', this.parentNode);
	 });

	 $(".stats-showpie").click(function ()
	 {
	    changeGraphType('showpie', this.parentNode);
	 });
}