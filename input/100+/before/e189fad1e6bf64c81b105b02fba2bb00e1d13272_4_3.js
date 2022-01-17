function ($) {
    $.view_post_startup = function (loading_message, postid, getposturl, commentcount, scriptspath, culture, usermail, leavecomment, isauthenticated) {
        // TyneMCE init for comment textareas
        tinyMCE.init({
            mode: "textareas",
            theme: "advanced",
            skin: "cirkuit",
            theme_advanced_toolbar_location: "top",
            theme_advanced_buttons1: "bold,italic,underline,blockquote,link,unlink",
            theme_advanced_buttons2: "",
            width: "100%"
        });

        // Enhance form comment fields
        $("#comment-container form").form();

        //Control standard comment submission
        $("#comment-submit").live("click", function (event) {
            // Process comment when user is authenticathed or not authenticathed and anonymous fields are correct
            if (isauthenticated == "True" || (isauthenticated != "True" && $("#comment-container .anonymous-comment-fields").valid())) {
                var message = tinyMCE.get("comment-textarea").getContent();
                if (message != "") {
                    $("#comment-container").block({ css: {
                        border: 'none',
                        padding: '15px',
                        backgroundColor: '#000',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .5,
                        color: '#fff'
                    },
                        message: loading_message
                    });
                    // Set comment message to spaces because tyneMCE is showing the HTML content
                    tinyMCE.get("comment-textarea").setContent("");
                    $.post("/Comment/AddComment/", (isauthenticated == "True"
						? AddAntiForgeryToken({ Message: message, PostId: postid })
						: AddAntiForgeryToken({ Message: message, PostId: postid, "AnonymousUser.Username": $("#comment-container #Username").val(), "AnonymousUser.Email": $("#comment-container #Email").val(), "AnonymousUser.Web": $("#comment-container #Web").val() })),
						   function (data) {
						       if (data.result == "ok") {
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
						               errors[data.errors[i].Key] = data.errors[i].Value;
						           }
						           validator.showErrors(errors);
						           tinyMCE.get("comment-textarea").setContent(message);
						       }
						   }
						   , "json");
                }
            }
        });

        //Control related comment submission
        $("#related-comment-submit").live("click", function () {
            // Process comment when user is authenticathed or not authenticathed and anonymous fields are correct
            if (isauthenticated == "True" || (isauthenticated != "True" && $("#comments .anonymous-comment-fields").valid())) {
                var message = tinyMCE.get("dynamic-textarea").getContent();
                if (message != "") {
                    $("#newcomment").block({ css: {
                        border: 'none',
                        padding: '15px',
                        backgroundColor: '#000',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .5,
                        color: '#fff'
                    },
                        message: loading_message
                    });
                    // Set comment message to spaces because tyneMCE is showing the HTML content
                    tinyMCE.get("dynamic-textarea").setContent("");
                    $.post("/Comment/AddRelatedComment/", (isauthenticated == "True"
						 ? AddAntiForgeryToken({ Message: message, PostId: postid, parent: $("#related-comment-submit").attr("title") })
						 : AddAntiForgeryToken({ Message: message, PostId: postid, parent: $("#related-comment-submit").attr("title"), "AnonymousUser.Username": $("#comments #Username").val(), "AnonymousUser.Email": $("#comments #Email").val(), "AnonymousUser.Web": $("#comments #Web").val() })),
						   function (data) {
						       if (data.result == "ok") {
						           tinyMCE.execCommand('mceFocus', false, 'dynamic-textarea');
						           $(".reply .ui-icon").removeClass("ui-icon-cancel").addClass("ui-icon-pencil");
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
						               errors[data.errors[i].Key] = data.errors[i].Value;
						           }
						           validator.showErrors(errors);
						           tinyMCE.get("dynamic-textarea").setContent(message);
						       }
						   }
						   , "json");
                }
            }
        });

        //Load SyntaxHighlighter brushes for enhance <pre> labels in the page
        SyntaxHighlighter.autoloader(
			'js jscript javascript  ' + scriptspath + 'syntaxhlBrushes/shBrushJScript.js',
			'c# c-sharp csharp      ' + scriptspath + 'syntaxhlBrushes/shBrushCSharp.js',
			'css                    ' + scriptspath + 'syntaxhlBrushes/shBrushCss.js',
			'java                   ' + scriptspath + 'syntaxhlBrushes/shBrushJava.js',
			'xml xhtml xslt html    ' + scriptspath + 'syntaxhlBrushes/shBrushXml.js',
			'sql                    ' + scriptspath + 'syntaxhlBrushes/shBrushSql.js'
		);
        SyntaxHighlighter.all();

        //Styles for interaction with the reply buttons
        $(".reply").live("hover", function () {
            var element = $(this).closest("li").toggleClass("ui-widget-content ui-helper-corner-all");
            var a = 1;
        });

        // Control reply button click event
        $(".reply").live("click", function () {
            var self = this;
            if ($("#newcomment").length == 0) {
                if (isauthenticated == "True") {
                    if ($(self).data("retrieving") != "true") {
                        $(self).data("retrieving", "true");
                        createComment(self, " ", usermail, leavecomment);
                        $(self).data("retrieving", "false");
                    }
                }
                else {
                    if ($(self).data("retrieving") != "true") {
                        $(self).data("retrieving", "true");
                        $.get("/Comment/AnonymousComment", function (data) {
                            createComment(self, data, usermail, leavecomment);
                            $("#comments form").form();
                            $(self).data("retrieving", "false");
                        });
                    }
                }
            }
            else {
                $(".reply").not(this).show("slow");
                $(".ui-icon", this).removeClass("ui-icon-cancel").addClass("ui-icon-pencil");
                tinyMCE.execCommand('mceFocus', false, 'dynamic-textarea');
                tinyMCE.execCommand('mceRemoveControl', false, 'dynamic-textarea');
                $("#newcomment").remove();
            }
            return false;
        });

        // Show delicious widget with tag matching words
        var infobox = $('body').infobox({
            dataUrl: 'http://feeds.delicious.com/v2/json/popular/'
        });

        $('span[data-tag]').tagger({
            activated: function (event, data) {
                infobox.infobox('displayTagLinks', event, data.name);
            },
            deactivated: function () {
                infobox.infobox('hideTagLinks');
            }
        });
    };

    // Create comment function
    function createComment(object, htmldata, usermail, leavecomment) {
        $(".reply").not(object).hide("slow");
        $(".ui-icon", object).removeClass("ui-icon-pencil").addClass("ui-icon-cancel");
        $(object).closest("li.thread").after('<li id="newcomment" class="ui-state-highlight ui-corner-all ui-helper-margin">' +
													'<div class="comment-area ui-helper-width-100pc">' +
													   '<div class="bg-widget-image-left">' +
														   usermail +
													   '</div>' +
													   '<div class="bg-widget-content-right">' +
														   htmldata +
														   '<textarea id="dynamic-textarea" rows="5" class="ui-helper-width-100pc ui-state-default ui-corner-all"></textarea>' +
														   '<div class="bg-input-search ui-helper-margin-top-bottom">' +
															   '<input id="related-comment-submit" title="' + $(object).attr("id") + '" type="button" value="' + leavecomment + '"  />' +
														   '</div>' +
													   '</div>' +
													'</div>' +
												'<div class="ui-helper-reset-float"></div>' +
											'</li>');
        $('html,body').animate({ scrollTop: $("#newcomment").closest("li").position().top }, { duration: 'slow', easing: 'swing' });
        $.validator.unobtrusive.parse($("#comments .anonymous-comment-fields"));
        $("#related-comment-submit").button();
        reconnectTooltips();
        tinyMCE.execCommand('mceAddControl', false, 'dynamic-textarea');
    }

    // Used for add forgery token to comments
    function AddAntiForgeryToken(data) {
        data.__RequestVerificationToken = $('#__AjaxAntiForgeryForm input[name=__RequestVerificationToken]').val();
        return data;
    };


    // Reconnect tooltips after ajax load
    function reconnectTooltips() {
        $(".tooltip, .tooltip-default").tipTip();
        $(".tooltip-ajax").tipTip({
            content: function (data) {
                $.ajax({
                    url: $(this).attr("href"),
                    success: function (response) {
                        data.content.html(response);
                    }
                });
                return Globalize.localize("loading", "@CultureHelper.GetNeutralCulture(CultureHelper.GetCurrentCulture())");
            }
        });
        $(".tooltip-ajax").click(function () { return false; });
    }
}