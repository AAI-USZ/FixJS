function (data, status) {
					    $("#commentsection").append(data);
                        $("#ajax-loader").toggleClass("ui-helper-hidden");
				    }