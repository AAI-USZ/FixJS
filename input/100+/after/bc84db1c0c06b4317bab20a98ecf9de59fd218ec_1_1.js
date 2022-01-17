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
				eatCookies();
			}