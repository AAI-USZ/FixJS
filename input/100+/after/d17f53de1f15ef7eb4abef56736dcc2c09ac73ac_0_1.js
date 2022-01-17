function checkDownload() {
			console.log('downloaded');
			if(gapSystemReady == true){			
				clearInterval(tid);
				// Cycle through links to ensure they have been downloaded already
				for(var storyIter = 1; storyIter < 31; storyIter++){
					
					var storyBigIter = storyIter;
					
					if(Number(storyBigIter) <= 9) {
						storyBigIter = ('0'+ storyIter);
					};
					pathToFiles = localSystemPath.fullPath.substr(6);
					
					$.ajax({
						url: pathToFiles +'/OBS-'+ storyBigIter +'-01.jpg',
						type:'HEAD',
						error: function()
						{
							console.log(pathToFiles +'/OBS-'+ storyBigIter +'-01.jpg does not exist.');
						},
						success: function()
						{
							console.log(pathToFiles +'/OBS-'+ storyBigIter +'-01.jpg exists.');
							downloadBtn = $('.gallery li a').attr({'rel':'story'+ storyIter , 'data-download': 'download'});
							downloadBtnParent = $(downloadBtn).parent();
							$(downloadBtn).remove();	
							$(downloadBtnParent).find('div.ui-btn-inner').append('<span class="ui-icon ui-icon-check ui-icon-shadow"> </span>');						
						}
					});
				}  
			}
		}