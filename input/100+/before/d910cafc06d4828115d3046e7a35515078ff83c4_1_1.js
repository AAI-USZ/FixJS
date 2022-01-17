function(){

	$('#btn-logout').click(function(){
		$.ajax({
			url: '/logout',
			type: "POST",
			success: function(data){
				onLogoutSuccess();
			},
			error: function(jqXHR){
				console.log('error', jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	})
	
	function onLogoutSuccess()
	{
		$('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
		$('.modal-alert .modal-header h3').text('Success!');
		$('.modal-alert .modal-body p').html('You are now logged out.<br>Redirecting you back to the dashboard.');
		$('.modal-alert button').click(function(){window.location.href = '/';})
		$('.modal-alert').modal('show');
		setTimeout(function(){window.location.href = '/';}, 3000);
	}

	$('.brand').text(capitalize(ORG_DATA.name));

}