function(){
	//user search add friend buttons
	$('.datepicker').datepicker({dateFormat: 'yy-mm-dd'});
	
	
	$('.add_friend_button').bind('ajax:success', function(){
		$(this).closest('tr').find('.btn').val("Pending friend request");
		$(this).closest('tr').find('.btn').addClass("btn btn-warning");
	});
	$('.respond_friend_request').bind('ajax:success', function(){
		$(this).closest('tr').find('.respond_friend_request').fadeOut();
	});
		
	//event planning friend invite buttons
	
	$('.invite_friend_button').bind('ajax:success', function(textstatus, data, jqXHR){
		$(this).closest('tr').find('.btn').val("Uninvite Friend");
		$(this).closest('tr').find('.btn').addClass("btn-warning");
		$(this).removeClass('invite_friend_button').addClass('uninvite_friend_button');
	});
	$('.uninvite_friend_button').bind('ajax:success', function(textstatus, data){
		$(this).closest('tr').find('.btn').val("Invite Friend");
		$(this).closest('tr').find('.btn').removeClass('btn-warning');
		$(this).removeClass('uninvite_friend_button').addClass('invite_friend_button');
	});
}