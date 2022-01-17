function(e) {
			e.preventDefault();

			var curSectionId = $('a[data-section].selected').attr('data-section'),
				curContentId = $('a[data-section].selected').attr('href'),
				sectionId = $(this).attr('data-section'),
				contentId = $(this).attr('href');

			$('a[data-section]').removeClass('selected');
			$(this).addClass('selected');

			if(sectionId === '#common' && curSectionId !== '#common') $(sectionId).attr('data-parent', curSectionId);

			if(curContentId === contentId) return false;

			if(curSectionId === sectionId || sectionId === '#common' || sectionId == $('#common').attr('data-parent')){
				$(curContentId).animate({
					left: leftHide,
					display: 'none'
				}, hideSpeed, function(){
					$(contentId).show().animate({
						left: leftShow
					}, showSpeed);
				});
			} else {
				$('#main').scrollTo(sectionId, scrollSpeed, function(){
					$(sectionId).children(contentId).show().animate({
						left: leftShow
					}, showSpeed, function(){
						$('.section').not(sectionId).children('.content').css({
							left: leftHide,
							display: 'none'
						});

						$('#common')
						.css({
							'left' : - $('.mask').offset().left - 30,
							'top' : - $('.mask').offset().top
						})
						.attr('data-parent', '');
					});
				});
			}
			
			if(clickMode === 'normal')	updateHistory(sectionId, contentId);
			
			clickMode = 'normal';
		}