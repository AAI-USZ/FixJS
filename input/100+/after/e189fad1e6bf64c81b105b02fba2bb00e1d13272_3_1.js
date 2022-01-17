function () {
            if ($("#commentsection").children().size() == 0) {
                $("#ajax-loader").toggle();
			    $.get(getpostcommentsurl, 
				    function (data, status) {
					    $("#commentsection").append(data);
                        $("#ajax-loader").toggle();
				    }
			    );
            }
			$("#commentsection").slideToggle("slow");
            $(".bg-button-comments").button({ icons: { primary: "ui-icon-comment" }, text: true });
            if (commentvisibility == true)
            {
                $(".bg-button-comments .ui-button-text").text(showcommentsmessage);
                commentvisibility = false;
            }
            else
            {
                $(".bg-button-comments .ui-button-text").text(hidecommentsmessage);
                commentvisibility = true;
            }
			return false;
		}