function(current, next) {
				$(".mainContent:last").hide().fadeIn(3000);
				
				$("div.paginateButtons a.nextLink").attr('href', next.url);
				if (next.url == undefined) {
					$(".loadMore").hide();
				} else {
					$(".loadMore .progress").hide();
					$(".loadMore .buttonTitle").show();
				}
				if ($('.grid_view_bttn.active')[0]) {
					$('.grid_view').show();
					$('.list_view').hide();
				} else {
					$('.grid_view').hide();
					$('.list_view').show();
				}
					
				var a = $('<a href="'+current.url+'"></a>');
			    var url = a.url();
			    var params = url.param();
			    delete params["append"]
			    delete params["loadMore"]
			    params['max'] = parseInt(params['offset'])+1;
			    params['offset'] = 0
			    var History = window.History;
			    History.pushState({state:1}, "Species Portal", '?'+decodeURIComponent($.param(params))); 
				eatCookies();
			}