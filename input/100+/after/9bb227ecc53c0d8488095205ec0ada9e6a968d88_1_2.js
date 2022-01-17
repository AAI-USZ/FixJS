function(){
			var json = '{"id":"0", "name":"'+$('input[name*="name"]').val()+'","direct":"'+$('input[name*="direct"]').is(":checked")+'", "ratio":"'+$('input[name*="ratio"]').val()+'", "description":"'+$("#description-field-create").val().replace('\n', "\\n")+'"}';
			$.ajax({
				url:"/admin/expense/type/create",
				data: json,
				type: "POST",
				dataType:"json",
				processData: false,
				contentType: "application/json; charset=utf-8",
				success: function(data){
				  if (data.result == "Ok"){
					  $("#modal_window_expense_type").kernely_dialog("close");
	       			var successHtml = $("#success-message-template").html();
					$.writeMessage("success",successHtml);
					tableView.reload();
				  } else {
                    $.writeMessage("error",data.result);
				  }
				}
			});
		}