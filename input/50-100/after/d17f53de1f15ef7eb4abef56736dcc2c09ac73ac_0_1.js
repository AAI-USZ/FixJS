function()
						{
							console.log(pathToFiles +'/OBS-'+ storyBigIter +'-01.jpg exists.');
							downloadBtn = $('.gallery li a').attr({'rel':'story'+ storyIter , 'data-download': 'download'});
							downloadBtnParent = $(downloadBtn).parent();
							$(downloadBtn).remove();	
							$(downloadBtnParent).find('div.ui-btn-inner').append('<span class="ui-icon ui-icon-check ui-icon-shadow"> </span>');						
						}