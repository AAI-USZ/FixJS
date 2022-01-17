function()
						{
							downloadBtn = $('.gallery li a').attr({'rel':'story'+ storyIter , 'data-download': 'download'});
							$(downloadBtn).remove();	
							$('.gallery li a[rel="story'+ storyIter +'"]').parent().find('div.ui-btn-inner').append('<span class="ui-icon ui-icon-check ui-icon-shadow"> </span>');						
						}