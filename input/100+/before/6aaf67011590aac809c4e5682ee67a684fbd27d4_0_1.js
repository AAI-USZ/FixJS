function() {
				
				
				 $('#topNavigation .search input').animate({
						paddingLeft: 30
						}, 250, function() {
							 $('#topNavigation .search .cancel').show(100);
					  });
				var str = $('#topNavigation .search input').val().trim();
				var nStr = '';
				
				if(!isNaN(str)) {
					nStr = str;
				}
				
				if(str.length > 0 ) {
					
					$('#topNavigation .search .loader').show(100);
				
					var data = {
							data: {
								searchStr : str,
								searchNumber : nStr
							}
					 };
					
					 var xhr = $.ajax({
						 type: 'POST',
						 url:"\/Products\/search\/",
						 data: data,
						 success:function (data, textStatus) {
								$('#content').html('');
								$('#content').html(data);
								$('#topNavigation .search .loader').hide(100);
								
						 }, 
					 });
				} else {
					$.ajax({
						 url:window.location.pathname,
						 success:function (data, textStatus) {
								$('#content').html('');
								$('#content').html(data);
						 }, 
					 });	
				}
				 
			}