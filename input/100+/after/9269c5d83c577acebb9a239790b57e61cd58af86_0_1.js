function(b){if(b.status=="ok"){$(".error").removeClass("error");$("#process-message").html('<i class="icon16 yes"></i>'+$_("Saved")).fadeOut("slow");$("#s-editor-save-button").removeClass("yellow").removeClass("red").addClass("green");a.trigger("response",[b])}else if(b.status=="fail"){if($.isArray(b.errors)){var d=b.errors[0];$(b.errors[1]).addClass("error")}else d=b.errors;$("#process-message").html('<b style="color:red">'+(d?d:$_("An error occurred while saving"))+"</b>");$("#s-editor-save-button").removeClass("yellow").removeClass("green").addClass("red")}}