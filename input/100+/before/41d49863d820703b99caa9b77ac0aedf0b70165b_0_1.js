function() {
// For DataTables and Bootstrap
	$('.datatable').dataTable({
	  "sDom": "<'row'<'span4'l><'span5'f>r>t<'row'<'span3'i><'span6'p>>",
	  "sPaginationType": "bootstrap",
		"sScrollX": "100%",
		"aoColumnDefs": [
		      { "bSortable": false, "aTargets": [ "no_sort" ] }
		    ]
	});
	
	$('.history_table').dataTable({
	  "sDom": "<'row'<l><f>r>t<'row'<'span3'i><p>>",
		"bLengthChange": false,
	  "sPaginationType": "bootstrap",
		"aoColumnDefs": [
		      { "bSortable": false, "aTargets": [ "no_sort" ] }
		    ]
	});

// For fading out flash notices
	$(".alert .close").click( function() {
	     $(this).parent().addClass("fade");
	});

// make the sidebar follow you down the page
	$("#sidebarbottom").sticky({topSpacing: 50, bottomSpacing: 200});

// perform truncate, which is also defined outside of document ready
// it needs to be both places due to a webkit bug not loading named 
// JS functions in (document).ready() until AFTER displaying all the things
	$(".caption_cat").dotdotdot({
		height: 126,
		after: ".more_info",
		watch: 'window',
		});

	$(".equipment_title").dotdotdot({
		height: 54, // must match .equipment_title height
		watch: 'window'
	});

	$(".equipment_title").each(function(){
		$(this).trigger("isTruncated", function( isTruncated ) {
		  if ( isTruncated ) {
		   	$(this).children(".equipment_title_link").tooltip();
		  }
		});
	});

	$(".btn#modal").tooltip();
	
	// Equipment Model - show - progress bar
	
  $('.progress .bar').each(function() {
      var me = $(this);
      var perc = me.attr("data-percentage");
      var current_perc = 0;

      var progress = setInterval(function() {
          if (current_perc>=perc) {
              clearInterval(progress);
          } else {
              current_perc = perc;
              me.css('width', (current_perc)+'%');
          }
      }, 100);
  });

	$('.associated_em_box img').popover({ placement: 'bottom' });
	$("#my_reservations .dropdown-menu a").popover({ placement: 'bottom' });

	// fix sub nav on scroll
	var $win = $(window)
	  , $nav = $('.subnav')
	  , navTop = $('.subnav').length && $('.subnav').offset().top - 40
	  , isFixed = 0
		, $hiddenName = $('.subnav .hide')

	processScroll()

	// hack sad times - holdover until rewrite for 2.1
	$nav.on('click', function () {
	  if (!isFixed) setTimeout(function () {  $win.scrollTop($win.scrollTop() - 47) }, 10)
	})

	$win.on('scroll', processScroll)

	function processScroll() {
	  var i, scrollTop = $win.scrollTop()
	  if (scrollTop >= navTop && !isFixed) {
	    isFixed = 1
	    $nav.addClass('subnav-fixed')
			$hiddenName.removeClass('hide')
			if (!$('.subnav li').hasClass('active')) {
				$('.subnav li:eq(1)').addClass('active')
			}
	  } else if (scrollTop <= navTop && isFixed) {
	    isFixed = 0
	    $nav.removeClass('subnav-fixed')
			$hiddenName.addClass('hide')
			$('.subnav li').removeClass('active')
	  }
	}

  $('#modal').click(function() {
    $('#userModal div.modal-body').load(new_user, {from_cart : true }); // new_user defined in variables.js.erb
  });

}