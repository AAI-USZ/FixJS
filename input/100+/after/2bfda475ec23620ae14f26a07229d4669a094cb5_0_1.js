function () {

	var markdown = new MarkdownDeep.Markdown();

	$("#add-goal").click(function () {
		var url = "/" + $("#path-id").val() + "/add-goal";
		var addGoalButton = $(this)
		addGoalButton.addClass("disabled");
		addGoalButton.val("saving");

		$.post(url, { "name": $("#goal-name").val() }, function (data) {


			//data is the path object
			$.get("/Content/js/templates/goal.add.mustache.html", function (template) {
				var template = Mustache.render(template, data);
				$("#goals-list").append(template);
				$("#goal-name").val("");
				$("#goal-name").focus();

				addGoalButton.removeClass("disabled");
				addGoalButton.val("add goal");
			});
		});
	});


	$("#goals-list").sortable({
		stop: function (event, ui) {
			console.log(this);
			var $li = ui.item;
			var newOrder = $li.index()
			var goalId = $li.attr("id").replace("goal-id-", "");

			var url = "/" + $("#path-id").val() + "/goal/" + goalId + "/order/";

			$.post(url, { NewOrder: newOrder }, function (data) {

			});

		}
	}).disableSelection();

	$("a[id^='goal-delete']").live('click', function () {
		var goalId = $(this).attr("id").replace("goal-delete-", "");
		var url = "/" + $("#path-id").val() + "/delete-goal"
		var liToRemove = $(this).parent();

		$.post(url, { goalId: goalId }, function (data, status) {
			liToRemove.remove();
		});

		return false;
	});

	$("a[id^='goal-edit-']").live('click', function () {
		var goalId = $(this).attr("id").replace("goal-edit-", "");

		//liToHide
		var $li = $("#goal-id-" + goalId).addClass("hidden");

		//liToShow
		$("#goal-edit-form-" + goalId).removeClass("hidden");

		var goalName = $("#goal-name-" + goalId).text().trim();
		//set place holder
		$("#goal-edit-text-" + goalId).val(goalName);
		$("#goal-edit-text-" + goalId).focus();

		return false;
	});

	$("input[id^='goal-cancel-button-']").live('click', function () {
		var goalId = $(this).attr("id").replace("goal-cancel-button-", "");

		//liToHide
		$("#goal-edit-form-" + goalId).addClass("hidden");
		//liToShow
		$("#goal-id-" + goalId).removeClass("hidden");

		return false;

	});

	$("input[id^='goal-edit-button-']").live('click', function () {
		var goalId = $(this).attr("id").replace("goal-edit-button-", "");

		var newName = $("#goal-edit-text-" + goalId).val();
		var url = "/" + $("#path-id").val() + "/goal/" + goalId + "/update-name";

		$.post(url, { Name: newName }, function (data, status) {

			$("#goal-name-" + goalId).text(newName);
			$("#goal-cancel-button-" + goalId).click();
		});

		return false;

	});

	$("a.no-link").live('click', function () {
		return false;
	});

	$("#path-edit").live('click', function () {
		//div to hide
		$("#path-information").addClass("hidden");

		//div to show
		$("#path-edit-div").removeClass("hidden");

		var pathName = $("#path-name").text().trim();
		var pathDescription = $("#path-description").text().trim();

		//set place holder
		$("#path-edit-name-text").val(pathName);
		//$("#path-edit-description-text").val(pathDescription);
		$("#path-edit-name-text").focus();

		return false;
	});

	$("#path-cancel-button").live('click', function () {
		//h1 to show
		$("#path-information").removeClass("hidden");

		//div to hide
		$("#path-edit-div").addClass("hidden");

		return false;

	});


	$("#path-edit-button").live('click', function () {
		var url = "/" + $("#path-id").val() + "/edit";

		var newName = $("#path-edit-name-text").val();
		var newDescription = $("#path-edit-description-text").val();

		$("#path-description").html("");

		$.post(url, { Name: newName, Description: newDescription }, function (data, status) {

			$("#path-name").text(newName);
			$("#path-description").html(markdown.Transform(newDescription));
			$("#path-cancel-button").click();
		});

		return false;

	});

	$("#add-path").click(function () {
		var url = "/" + $("#path-id").val() + "/edit";
		$.post(url, { "name": $("#path-name").val(),
			"description": $("#path-description").val()
		}, function (data) {
			//data is the path object
			$("#goals").toggle();
			$("#path-form").toggle();
			$("#path-name-saved").html(data.name);
			$("#path-id").val(data.id);


		});
	});
}