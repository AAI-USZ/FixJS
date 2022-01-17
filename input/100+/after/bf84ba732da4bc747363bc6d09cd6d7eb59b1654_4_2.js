function (data) {
						       if (data.result == "ok" || data.result == "warnings") {
						           tinyMCE.execCommand('mceFocus', false, 'dynamic-textarea');
						           $(".reply .ui-icon").removeClass("ui-icon-cancel").addClass("ui-icon-pencil");
						           if (data.warnings) {
						                createGrowl(data.warnings.Value);
						           }
						           $("#comments").load(getposturl,
														function (text, status, request) {
														    var numberofcomments = commentcount + 1;
														    $("#comment.count").text(numberofcomments);
														    $(".bg-button-reply").button({ icons: { primary: "ui-icon-pencil" }, text: false });
														    $("#newcomment").unblock();
														    $("#comments #Username").val("");
														    $("#comments #Email").val("");
														    $("#comments #Web").val("");
														    var comments = parseInt($("#information-buttons :nth-child(4)").first().text());
														    comments++;
														    $("#information-buttons :nth-child(4)").html('<span class="ui-button bg-icon-left ui-icon ui-icon-comment"></span>' + comments.toString());
														    reconnectTooltips();
														    tinyMCE.execCommand('mceRemoveControl', false, 'dynamic-textarea');
														});
						       }
						       else {
						           $("#newcomment").unblock();
						           // If validation errors revalidate the form and show errors
						           var validator = $("#comments form").validate();
						           errors = {};
						           for (var i = 0; i < data.errors.length; i++) {
						               if (data.errors[i].Key === "akismetkey") {
						                   createGrowl(data.errors[i].Value);
						               }
						               errors[data.errors[i].Key] = data.errors[i].Value;
						           }
						           validator.showErrors(errors);
						           tinyMCE.get("dynamic-textarea").setContent(message);
						       }
						   }