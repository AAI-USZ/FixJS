function() {

	/* rip out the status update textarea. */
	$("#sone .rip-out").each(function() {
		var oldElement = $(this);
		newElement = $("<input type='text'/>");
		newElement.attr("class", oldElement.attr("class")).attr("name", oldElement.attr("name"));
		oldElement.before(newElement).remove();
	});

	/* this initializes the status update input field. */
	getTranslation("WebInterface.DefaultText.StatusUpdate", function(defaultText) {
		registerInputTextareaSwap("#sone #update-status .status-input", defaultText, "text", false, false);
		$("#sone #update-status .select-sender").css("display", "inline");
		$("#sone #update-status .sender").hide();
		$("#sone #update-status .select-sender button").click(function() {
			$("#sone #update-status .sender").show();
			$("#sone #update-status .select-sender").hide();
			return false;
		});
		$("#sone #update-status").submit(function() {
			button = $("button:submit", this);
			button.attr("disabled", "disabled");
			if ($(this).find(":input.default:enabled").length > 0) {
				return false;
			}
			sender = $(this).find(":input[name=sender]").val();
			text = $(this).find(":input[name=text]:enabled").val();
			ajaxGet("createPost.ajax", { "formPassword": getFormPassword(), "sender": sender, "text": text }, function(data, textStatus) {
				button.removeAttr("disabled");
			});
			$(this).find(":input[name=sender]").val(getCurrentSoneId());
			$(this).find(":input[name=text]:enabled").val("").blur();
			$(this).find(".sender").hide();
			$(this).find(".select-sender").show();
			return false;
		});
	});

	/* ajaxify the search input field. */
	getTranslation("WebInterface.DefaultText.Search", function(defaultText) {
		registerInputTextareaSwap("#sone #search input[name=query]", defaultText, "query", false, true);
	});

	/* ajaxify input field on “view Sone” page. */
	getTranslation("WebInterface.DefaultText.Message", function(defaultText) {
		registerInputTextareaSwap("#sone #post-message input[name=text]", defaultText, "text", false, false);
		$("#sone #post-message .select-sender").css("display", "inline");
		$("#sone #post-message .sender").hide();
		$("#sone #post-message .select-sender button").click(function() {
			$("#sone #post-message .sender").show();
			$("#sone #post-message .select-sender").hide();
			return false;
		});
		$("#sone #post-message").submit(function() {
			sender = $(this).find(":input[name=sender]").val();
			text = $(this).find(":input[name=text]:enabled").val();
			ajaxGet("createPost.ajax", { "formPassword": getFormPassword(), "recipient": getShownSoneId(), "sender": sender, "text": text });
			$(this).find(":input[name=sender]").val(getCurrentSoneId());
			$(this).find(":input[name=text]:enabled").val("").blur();
			$(this).find(".sender").hide();
			$(this).find(".select-sender").show();
			return false;
		});
	});

	/* Ajaxifies all posts. */
	/* calling getTranslation here will cache the necessary values. */
	getTranslation("WebInterface.Confirmation.DeletePostButton", function(text) {
		getTranslation("WebInterface.Confirmation.DeleteReplyButton", function(text) {
			getTranslation("WebInterface.DefaultText.Reply", function(text) {
				getTranslation("WebInterface.Button.Comment", function(text) {
					$("#sone .post").each(function() {
						ajaxifyPost(this);
					});
				});
			});
		});
	});

	/* update post times. */
	postIds = [];
	$("#sone .post").each(function() {
		postIds.push(getPostId(this));
	});
	updatePostTimes(postIds.join(","));

	/* hides all replies but the latest two. */
	if (!isViewPostPage()) {
		getTranslation("WebInterface.ClickToShow.Replies", function(text) {
			$("#sone .post .replies").each(function() {
				allReplies = $(this).find(".reply");
				if (allReplies.length > 2) {
					newHidden = false;
					for (replyIndex = 0; replyIndex < (allReplies.length - 2); ++replyIndex) {
						$(allReplies[replyIndex]).addClass("hidden");
						newHidden |= $(allReplies[replyIndex]).hasClass("new");
					}
					clickToShowElement = $("<div></div>").addClass("click-to-show");
					if (newHidden) {
						clickToShowElement.addClass("new");
					}
					(function(clickToShowElement, allReplies, text) {
						clickToShowElement.text(text);
						clickToShowElement.click(function() {
							allReplies.removeClass("hidden");
							clickToShowElement.addClass("hidden");
						});
					})(clickToShowElement, allReplies, text);
					$(allReplies[0]).before(clickToShowElement);
				}
			});
		});
	}

	$("#sone .sone").each(function() {
		ajaxifySone($(this));
	});

	/* process all existing notifications, ajaxify dismiss buttons. */
	$("#sone #notification-area .notification").each(function() {
		ajaxifyNotification($(this));
	});

	/* activate status polling. */
	setTimeout(getStatus, 5000);

	/* reset activity counter when the page has focus. */
	$(window).focus(function() {
		focus = true;
		resetActivity();
	}).blur(function() {
		focus = false;
	});

}