function(){
	//Inline project editing
	$('.edit_form .submit').hide();
	$('.edit_form table input,.edit_form textarea,.edit_form select').focus(
		function(){$('.edit_form .submit').fadeIn(300);}
	);
	$('.edit_form table input,.edit_form textarea, .edit_form select').change(
		function(){$(this).addClass('changed');}
	);
	
	//Datepickers in the page
	$('#id_deadline,#id_task-deadline,#id_project-deadline').datepicker({dateFormat: "yy-mm-dd"});
	
	//Tabs and hashtag support
	$('#tabs').tabs({
		select: function(event, ui) { window.location.hash = ui.tab.hash }
	});
	
	//Task status changes
	$('.status a').click(function(e){
		e.preventDefault();
		$.get($(this).attr('href'));
		$(this).siblings().removeClass('current');
		$(this).addClass('current');

		//Change the row's class depending on the new status
		$(this).parents('tr').removeClass();
		if($(this).hasClass('completed')){
			$(this).parents('tr').addClass('status-0');
		}else if($(this).hasClass('hold')){
			$(this).parents('tr').addClass('status-1');
		}else if($(this).hasClass('active')){
			$(this).parents('tr').addClass('status-2');
		}else if($(this).hasClass('important')){
			$(this).parents('tr').addClass('status-3');
		}
	});
	
	//AJAX object deletion
	$('.comment-delete,.contact-delete,.memo-list .delete,.document-list .delete').click(function(e){
		e.preventDefault();
		$.ajax({
			context: this,
			type: "GET",
			url: $(this).attr('href'),
			success: function(data){
				$(this).parents('li,tr').slideUp({duration:300,queue:false}).fadeOut({duration:300,queue:false});
			}
		});
	});
	

	//Contact info delete
	$('.phonenumber .delete').click(function(e){
		e.preventDefault();
		delete_formset_item('phone',$(this));
	});

	$('.emailaddress .delete').click(function(e){
		e.preventDefault();
		delete_formset_item('email',$(this));
	});

	$('.website .delete').click(function(e){
		e.preventDefault();
		delete_formset_item('website',$(this));
	});

	//Removes an item from a formset, submits the AJAX deletion request AND removes it from the formset count
	function delete_formset_item(prefix,element){
		parentForm = element.parents('.formsetfieldwrap');
		//Set the "id_...-DELETE" <input> tag to true. This input replaces Django's delete checkbox.
		parentForm.find('input:hidden[id $= "-DELETE"]').val('on');
		//Make the deletion visible
		parentForm.fadeTo(300,0.3);
		element.fadeOut(300,0);
	}
	
}