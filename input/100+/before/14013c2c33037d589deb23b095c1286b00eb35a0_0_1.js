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

// perform truncate, defined below
  truncate();

// For fading out flash notices
	$(".alert .close").click( function() {
	     $(this).parent().addClass("fade");
	});
	
	$("#sidebarbottom").sticky({topSpacing: 50, bottomSpacing: 200});

	$(".btn#modal").tooltip();

}