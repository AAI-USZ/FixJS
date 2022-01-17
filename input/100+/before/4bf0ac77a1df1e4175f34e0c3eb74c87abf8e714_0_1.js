function makeDialog() {

	$("#dialog:ui-dialog").dialog("destroy");

	var code = $("#code"),

		name = $("#name"),

		last_name = $("#last_name"),

		parent_id = $("#parent_id"),

		allFields = $([]).add(code).add(name).add(last_name).add(parent_id),

		tips = $(".validateTips");

	function updateTips(t) {

		tips.text(t).addClass("ui-state-highlight");

		setTimeout(function(){tips.removeClass( "ui-state-highlight", 1500 );}, 500);

	}

	function check(o, n) {

		if(o.val().length <= 0){

			o.addClass("ui-state-error");

			updateTips("Field "+n+" cannot be empty.");

			return false;

		}

		return true;

	}

	$("#member_form").dialog({

		autoOpen: false,

		height: 300,

		width: 400,

		modal: true,

		buttons: {

			"Save": function() {

				var bValid = true;

				allFields.removeClass("ui-state-error");

				bValid = bValid && check(code, "code");

				bValid = bValid && check(name, "name");

				bValid = bValid && check(last_name, "last name");

				if (bValid) {

					if($("#member_form #id").val()=="0"){

						var parent = active.parents("tr.parent:first");

						var members = active.parents("tr.parent:first").next("tr.members");

						var text = "";

						if(members.html()!="")

							text += "<td class='empty'>&nbsp;</td>";

						text += "<td><table class='circles'><tr class='parent'>"+parent.html()+"</tr><tr class='members'></tr></table></td>";

						var member = $(text);

						var form = $(member).find("div.circle:first");

						var data = form.children("div.data");

						id = "new_0";

						form.attr("id", "member_"+id);

						form.find("span.member").html(name.val()+" "+last_name.val());

						//form.find("span.points").html("300");

						data.children("input.id").val(id);

						data.children("input.code").val(code.val());

						data.children("input.name").val(name.val());

						data.children("input.last_name").val(last_name.val());

						data.children("input.parent_id").val(data.children("input.id").val());

						members.append(member);

						addFlashTitle(form.find('.flash'));

						addCircleAnimation(form);

					}

					else{

						var form = active.parents("div.circle:first");

						var data = form.children("div.data");

						

						form.find("span.member").html(name.val()+" "+last_name.val());

						//form.find("span.points").html("300");

						data.children("input.code").val(code.val());

						data.children("input.name").val(name.val());

						data.children("input.last_name").val(last_name.val());

					}

					$(this).dialog("close");

				}

			},

			Cancel: function() {

				$(this).dialog("close");

			}

		},

		close: function() {

			allFields.val("").removeClass("ui-state-error");

			$("#id").val("0");

			$(".validateTips").show();

			$("#member_form input").removeAttr("disabled");

			$("#member_form").closest("div[aria-labelledby='ui-dialog-title-member_form']").find(".ui-dialog-buttonpane").find("button:last").find(".ui-button-text").html("Cancel");

			$("#member_form").closest("div[aria-labelledby='ui-dialog-title-member_form']").find(".ui-dialog-buttonpane button:first").show();

			active = null;

			center();

			bindMembers();

		}

	});

	

	$("#confirm").dialog({

		autoOpen: false,

		height: 200,

		width: 400,

		modal: true,

		buttons: {

			"Yes, I'm Sure": function() {

				active.parents("table.circles:first").parents("td:first").prev("td.empty").remove();

				active.parents("table.circles:first").parents("td:first").remove();

				active = null;

				center();

				bindMembers();

				$(this).dialog("close");

				$("#confirm p").html(confirmation);

			},

			Cancel: function() {

				$(this).dialog("close");

				$("#confirm p").html(confirmation);

				active = null;

			}

		}

	});

	

}