function() { 

$("#editpages").tablesorter({	
	widgets: ['zebra'],
	sortList: [[0,0]],
})

.tablesorterPager({container: $("#pager")})

	// setup the toggles for Inputfields and the animations that occur between opening and closing
	$(".fields > li > label.ui-widget-header").addClass("fieldStateToggle")
		.prepend("<span class='ui-icon ui-icon-triangle-1-s'></span>")
		.click(function() {
			var $li = $(this).parent('li'); 	
			$li.toggleClass('InputfieldStateCollapsed', 100);
			$(this).children('span.ui-icon').toggleClass('ui-icon-triangle-1-e ui-icon-triangle-1-s'); 
			$li.children('.ui-widget-header').effect('highlight', {}, 300);
			$li.children('.ui-widget-content').toggle(); 
			return false;
		})

	// use different icon for open and closed
	$(".fields .fieldStateCollapsed > label.ui-widget-header span.ui-icon")
		.removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-e'); 

$('.askconfirm').jConfirmAction();

//$('#nav_DM_Matrix').insertAfter($('#nav_pages'));

$("button.form_submit").on("click", function(){
		errors=false;
		$('.required').each(function(index) { 
			if ($(this).removeClass('formerror'));
			if ($(this).val()=="") {
				$(this).addClass('formerror');
				errors=true;
			}
		})
		if (errors==false){
			$(this).closest('form').submit();
		}
		return false;
	});	

$('select#post-type').on("change",function() {
	fieldtype=$(this).val();
	switch (fieldtype){
		case 'dropdown':
			$('#fieldoptions').html($('#field-dropdown').html());
			$('#post-table').on("change",function() {
				fields = $('#post-table option:selected').attr('data-fields');
				$('#post-rows').find('option').remove().end();
				 var fieldArray = fields.split(',');
			    for(var i=0;i<fieldArray.length-1;i++){
			        $('#post-row').append('<option value="' + fieldArray[i] + '" >'+ fieldArray[i]  + '</option>');
			    }
			})
			break; 
		default: 
			$('#fieldoptions').html('');
			break; 
	}
})





$('#dm_addnew').on("click", function(){
	$('#DM_addnew_row').stop().slideUp();
	$(this).next().stop().slideToggle();
	return false;	
})
	
	
$('#addfield').on("click", function(){
	errors=false;
		$('.required').each(function(index) { 
			if ($(this).removeClass('error'));
			if ($(this).val()=="") {
				$(this).addClass('error');
				errors=true;
			}
		})
		if (errors==false){
			$(this).closest('form').submit();
		}
})


  $('.mtrx_but').button();
  $('.mtrx_but_add').button({icons:{primary: "mtrx_dbadd"}});


}