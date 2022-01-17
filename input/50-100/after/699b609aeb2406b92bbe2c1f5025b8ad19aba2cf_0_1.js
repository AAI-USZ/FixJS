function() {
            /* Sneaky way of adding custom icons to jqGrid pager buttons */
            $("#pager").find(".ui-share-icon")
                .css({"background-image":"url("+imageurl+"share_12.png)", "background-position":"0", "color":"black"});
            $("#pager").find(".ui-addtosurvey-icon")
                .css({"background-image":"url("+imageurl+"tokens_12.png)", "background-position":"0", "color":"black"});
        }