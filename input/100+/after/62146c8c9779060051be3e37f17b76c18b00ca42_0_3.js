function($){
	var clickMode = 'normal';

	function resizePanel() {
	// What happens if we resize the window...
	// Get dimensions
	var width = $(window).width(),
		height = $(window).height(),
		mask_width = width * 3;
	// Resize the content
	$('#main, .section').css({width: width, height: height});
	$('#mask').css({width: mask_width, height: height});
	// Keep the current section visible (and don't jump back)
	$('#main').scrollTo($('a[data-section].selected').attr('data-section'), 0);
	}

	function scrollSections() {
		var leftHide = -$('.startup').width() - 30,
			leftShow = parseInt($('.startup').css('left'), 10),
			scrollSpeed = 1700,
			showSpeed = 800,
			hideSpeed = 600,
			prevSectionId, prevContentId, nextSectionId, nextContentId;

		$('a[data-section]').on('click', function(e) {
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
		});
	}

	function updateHistory(sectionId, contentId, title){
		var dataToSave = {
			href : contentId,
			section : sectionId
		};

		history.pushState(dataToSave, dataToSave.section);
	}

	function handleState(){
		$(window).on('popstate', function(e){
			var section = e.originalEvent.state.section,
				content = e.originalEvent.state.href;

			clickMode = 'history';
			$('a[data-section=' + section +'][href=' + content + ']').trigger('click');
			
		});
	}
	

	function setColorboxGroups(){
		var i = 0;
		$('.gallery').each(function(){
			var links = $(this).find('a'),
				group = 'group' + i;

			links.attr('rel', group);
			links.colorbox({
				'rel' : group,
				'scalePhotos' : true,
				'maxHeight' : '100%',
				'maxWidth' : '100%'
			});

			i += 1;
		});

		$('.gallery .frame').on('click', function(){
			$(this).siblings('a').trigger('click');
		});
	}

	$('.gallery-cover').on('click', function(){
		$(this).siblings('figure').first().children('a').trigger('click');
	});

	$(document).ready(function () {
		resizePanel();
		jQuery.easing.def = "easeInOutQuart";
		scrollSections();
		setColorboxGroups();
		// Resize the containers on window resize
		$(window).resize(function() {
			resizePanel();
		});

		$('.scroll-pane').each(function(){
			$(this).jScrollPane({
				showArrows:true,
				autoReinitialise:true
			});
		});

		history.replaceState(
		{
			href : $('a[data-section].selected').attr('href'),
			section : $('a[data-section].selected').attr('data-section')
		},
		$('a[data-section].selected').attr('href')
		);

		handleState();
	});
}