function() {
	       var buildings_url = $("#definitions_url").val();
	       var data_url = $('#url').val();
	       console.log('buildings ', buildings_url);
	       console.log('data ', data_url);
               var buildings = ce.get_rdf_collection(buildings_url);
               window.buildings = buildings;
               buildings.fetch().then(function() {
		   console.log('loaded buildings');
		   v.load(data_url).then(function() {
                       console.log(' loaded events ');
                   });               
	       });
	   }