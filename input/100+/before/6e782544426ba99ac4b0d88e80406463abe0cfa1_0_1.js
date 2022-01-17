function(){

    var dataSourcesTabs = $('#data_sources');

	/* Emails */
    $('input[name=email_start_date][type=text], input[name=email_end_date][type=text]').datepicker({
		dateFormat: "dd/mm/yy"
	});

	/* Add new */
	$("#start_date, #end_date").datepicker({
		dateFormat: "yy/mm/dd"
	});

	/* Update */
	$("#update_start_date, #update_end_date").datepicker({
		dateFormat: "yy/mm/dd"
	});

    $('input[name=submit][type=submit][value="OK, Send Emails"]').click(function(){
      postData = {token: $('input[name=token]').val(),
                  campaign_id: $('input[name=campaign_id]').val(),
                  submit: 'start'}
      $.post('/admin/send_email', postData);
    });
    $('input[name=submit][type=submit][value="STOP Sending Emails"]').click(function(){
      postData = {token: $('input[name=token]').val(),
                  campaign_id: $('input[name=campaign_id]').val(),
                  submit: 'stop'}
      $.post('/admin/send_email', postData);
    });

    $('.admin tbody tr:odd').css('background-color', '#efefef');

    if(dataSourcesTabs.length) {
        dataSourcesTabs.tabs({
            cookie: {
                expires: 1
            }
        }).show();
    }

    //hide the loader
    $("#loading-bds").hide();
}