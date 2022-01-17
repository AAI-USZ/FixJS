function() {
	
	// this kills the pure CSS hover effect from the dropdown menus so they will
	// only react on DOM events.
	$('html > head').append('<style>.menu li:hover ul { display: none; }</style>');
	// pull down menu handlers
	jQuery('.menu ul').hover(function() {
	}, function() {
		jQuery(this).hide();
	});
	jQuery('.dropmenu').hover(function() {
	}, function() {
		jQuery('#menu_nav ul').hide();
		menu_active = false;
	});
	jQuery('.menu li').hover(function() {
		if (menu_active) {
			jQuery(this).children('ul').show();
		}
	}, function() {
		if (menu_active) {
			jQuery(this).children('ul').hide();
		}
	});
	$('img.resize_1').live('mouseenter', function(event) {
		var resizer = $(this).prev();
		resizer.css({'position':'absolute', 'width': $(this).width(), 'left': $(this).position().left + 3, 'top': $(this).position().top + 3});
		resizer.show();
	});
	$('div.bbc_img_resizer').click(function() {
		var url = $(this).next().attr('src');
		$.prettyPhoto.open(url);
		return(false);
	});
	// bbcode img tag and attachment handlers
	$('a.attach_thumb').prettyPhoto({social_tools:'', deeplinking:false, animation_speed:0});
	// passive share button (for sharing a topic)
	$('.share_this').click(function() {
		$('#share_bar').hide();
		share_popup($(this).attr('data-target'), 700, 400);
		return(false);
	});
	$('.givelike').click(function() {
		giveLike($(this));
		return(false);
	});
	$('table.table_grid td .input_check, table.topic_table td .input_check').change(function() {
		var cbox = this;
		$(this).parent().parent().children('td').each(function() {
			if($(cbox).is(':checked'))
				$(this).addClass('inline_highlight');
			else
				$(this).removeClass('inline_highlight');
		});
		return(false);
	});
	
	$('table.table_grid th .input_check, table.topic_table th .input_check').change(function() {
		var cbox = this;
		$(this).parent().parent().parent().parent().find('tbody').find('input.input_check').each(function() {
			$(this).prop('checked', $(cbox).is(':checked') ? true : false);
			$(this).parent().parent().children('td').each(function() {
				if($(cbox).is(':checked'))
					$(this).addClass('inline_highlight');
				else
					$(this).removeClass('inline_highlight');
			});
		});
		return(false);
	});
	
	// handle the topic preview functionality in MessageIndex
	// fade in the preview link when hovering the subject
	$('span.tpeek').hover(
		function() {
			$('#tpeekresult').remove();
			$(this).append('<a style="display:none;-lineheight:100%;" href="#" onclick="firePreview(' + $(this).attr('data-id') +', $(this)); return(false);" class="tpeek">Preview topic</a>');
			$(this).children('a[class=tpeek]:first').fadeIn();
		},
		function() {
	});
	// fade it out when leaving the table cell
	$('td.subject').hover(
		function() {},
		function() {
			$(this).find('a[class=tpeek]:first').remove();			
	});
	// convert all time stamps to relative 
	
	if(!disableDynamicTime)
		$('abbr.timeago').timeago();
		
	if($('#socialshareprivacy'))
    	$('#socialshareprivacy').socialSharePrivacy();
	
	$('div.spoiler.head').click(function() {
        var content = $(this).next();
		if(content.css('display') != 'none')
			content.hide();
		else
			content.show();
        return(false);
	});
	$('a.bbc_link').each(function() {
		if($(this).html().match(/<img .*>/))
			$(this).css('border', 'none');
	});
	$('#jsconfirm').jqm({overlay: 50, modal: true, trigger: false, center:true});

	$('a.easytip').easyTooltip( {parentData: true} );
	$('div.iconlegend_container').hover(function() {
		$(this).css('opacity', '1.0');
	},
	function() {
		$(this).css('opacity', '0.4');
	});
}