function(type){
				$('#home-pill, #admin-pill').removeClass('active');
				$('#' + type + '-pill').addClass('active');
			}