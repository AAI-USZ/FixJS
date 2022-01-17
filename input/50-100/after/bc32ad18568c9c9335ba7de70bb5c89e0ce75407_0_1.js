function(step) {
						    points.value = maps.points[step];
						    var updateReq = new MBB.req('updateround.php', function(response) {
							    //Should not be necessary to update page
							    $('userpick').empty(); //but user picks may have changed
						    });
						    updateReq.post($('roundform'));
						  }