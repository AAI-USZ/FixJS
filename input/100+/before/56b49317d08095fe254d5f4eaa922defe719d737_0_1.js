function(){
			var status = "<span style='color:"+(m.status==1 ? 'green' : 'red')+"'>"+(m.status==1 ? 'Status Online' : 'Status Offline')+"</span>";
			$('#map_window #isp').html(m.isp + ' : '+status);
			$('#map_window #time').html('Last Updated : ' + moment(parseInt(m.time)).fromNow());
		//	win.setOptions({ boxClass : (m.special ? 'map_window_gradient': 'map_window_solid') });
			win.open(map, m); win.show();
		}