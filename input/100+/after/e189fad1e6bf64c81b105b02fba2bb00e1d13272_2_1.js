function (text) {
        $("table").grid();
        $("th a").button({ icons: { primary: "ui-icon-triangle-2-n-s" }, text: true });
        $("#grid-container").ajaxStart(function () {
            $("#grid-container").block({ css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            },
                message: text
            });
        });
        $("#grid-container").ajaxComplete(function () {
            $("#grid-container").unblock();
            $("table").grid();
            ajaxconnect();
        });

        $(".multiselect-check input[type='checkbox']").bind("enhancedCheckbox_click", function () {
            if ($(this).attr("checked")) {
                $.cookie($(this).attr("id"), "true");
                hideShowColumn($(this).attr("data-column"), true);
            }
            else {
                $.cookie($(this).attr("id"), "false");
                hideShowColumn($(this).attr("data-column"), false);
            }
        });

        $("#options").click(function () {
            $("#options-container").slideToggle("slow");
            return false;
        });

        $(".comment a").live("click", function () {
            var $container = $(this).parent().parent();
            $.post($(this).attr("href"), { id: $(this).parent().attr("data-commentid") },
					function (data, status) {
					    if (data.result == "error") {
					        createGrowl(data.text);
					    }
					    else {
					        $container.children().toggle();
					    }
					}
				);
            return false;
        });

        loadCheckBoxes();
        loadColumns();
        ajaxconnect();
        enhanceCheckboxes();
    }