function(){
			var offset = new google.maps.Size(-93, m.title == 'geoMarker' ? -90 : -110);
			var status = "<span style='color:"+(m.status==1 ? 'green' : 'red')+"'>"+(m.status==1 ? 'Status Online' : 'Status Offline')+"</span>";
			$('#map_window #isp').html(m.isp + ' : '+status);
			$('#map_window #time').html('Updated : ' + moment(parseInt(m.time)).fromNow());
			win.setOptions({ pixelOffset : offset });
		//	win.setOptions({ boxClass : (m.special ? 'map_window_gradient': 'map_window_solid') });
			$('#map_window').show(); win.open(map, m); win.show();
		}