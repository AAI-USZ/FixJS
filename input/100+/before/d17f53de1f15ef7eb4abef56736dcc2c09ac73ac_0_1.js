function checkDownload() {
			console.log('downloaded');
			if(systemReady == true){			
				clearInterval(tid);
				// Cycle through links to ensure they have been downloaded already
				for(storyIter = 1; storyIter <= 30; storyIter++){
					
					storyBigIter = storyIter;
					
					if(Number(storyBigIter) <= 9) {
						storyBigIter = ('0'+ storyIter);
					};
					pathToFiles = localSystemPath.fullPath.substr(6);
					console.log(pathToFiles);
					
					$.ajax({
						url: pathToFiles +'/OBS-'+ storyBigIter +'-01.jpg',
						type:'HEAD',
						error: function()
						{
							console.log(pathToFiles +'/OBS-'+ storyBigIter +'-01.jpg does not exist.');
						},
						success: function()
						{
							downloadBtn = $('.gallery li a').attr({'rel':'story'+ storyIter , 'data-download': 'download'});
							$(downloadBtn).remove();	
							$('.gallery li a[rel="story'+ storyIter +'"]').parent().find('div.ui-btn-inner').append('<span class="ui-icon ui-icon-check ui-icon-shadow"> </span>');						
						}
					});
				}  
			}
		}