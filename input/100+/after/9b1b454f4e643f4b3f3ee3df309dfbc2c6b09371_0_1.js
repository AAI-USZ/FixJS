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

// For fading out flash notices
	$(".alert .close").click( function() {
	     $(this).parent().addClass("fade");
	});
	
	$("#sidebarbottom").sticky({topSpacing: 50, bottomSpacing: 200});

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

}