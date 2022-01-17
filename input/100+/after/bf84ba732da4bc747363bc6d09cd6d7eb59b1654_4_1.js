function (data) {
						       if (data.result == "ok" || data.result == "warnings") {
						           if (data.warnings) {
						               createGrowl(data.warnings.Value);
						           }
						           $("#comments").load(getposturl,
														function (text, status, request) {
														    var numberofcomments = commentcount + 1;
														    $("#comment.count").text(numberofcomments);
														    $(".bg-button-reply").button({ icons: { primary: "ui-icon-pencil" }, text: false });
														    $("#comment-container").unblock();
														    $("#comment-container #Username").val("");
														    $("#comment-container #Email").val("");
														    $("#comment-container #Web").val("");
														    var comments = parseInt($("#information-buttons :nth-child(4)").first().text());
														    comments++;
														    $("#information-buttons :nth-child(4)").html('<span class="ui-button bg-icon-left ui-icon ui-icon-comment"></span>' + comments.toString());
														    reconnectTooltips();
														});
						       }
						       else {
						           $("#comment-container").unblock();
						           // If validation errors revalidate the form and show errors
						           var validator = $("#comment-container form").validate();
						           errors = {};
						           for (var i = 0; i < data.errors.length; i++) {
						               if (data.errors[i].Key === "akismetkey") {
						                   createGrowl(data.errors[i].Value);
						               }
						               errors[data.errors[i].Key] = data.errors[i].Value;
						           }
						           validator.showErrors(errors);
						           tinyMCE.get("comment-textarea").setContent(message);
						       }
						   }