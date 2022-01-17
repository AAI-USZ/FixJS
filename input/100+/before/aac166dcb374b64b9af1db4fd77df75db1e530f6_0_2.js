function() {
			// prepopulate the thingies
			$(".definitions_url").val("http://"+document.location.host+[basepath,'tests','rooms-and-buildings.rdf'].join('/'));
			$(".url").val("http://"+document.location.host+ [basepath,'tests','events-diary.rdf'].join('/'));
			
			var buildings = new Source({	name: "Buildings", url: $("#definitions_url").val() });
			var events = new Source({ name: "Events", url: $('#url').val() });
			var sbv = new SidebarView({
				sources: [buildings, events],
				el : $('.slidepanel')[0]
			});
		
			$("#mainpanel").click(function(){
				sbv.slideIn();
			});
			console.log('calling render');
			sbv.render();
			console.log(' done rendering ');
			sbv.slideOut();
			// sbv._new_group();
		}