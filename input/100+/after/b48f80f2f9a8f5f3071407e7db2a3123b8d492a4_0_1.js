function(event, ui) {
			var serial = "";
			var artTab = $("section.features article");
			for (var i = 0; i < artTab.length; i++) {
				artTab[i] = $(artTab[i]).attr("id").replace(/(a_feature_)/, "");
				serial += ""+artTab[i]+"="+(artTab.length - i);
				if(i!=artTab.length - 1) serial+= "&";
			};
			//console.log(serial);
			$.ajax({
				type: 'post',
				data: serial,
				url: '/projects/'+$('#project').attr('data-project-id')+'/feature/sort'
			})
        }