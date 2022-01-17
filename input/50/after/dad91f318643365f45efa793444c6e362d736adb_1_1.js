function o(u) {
            $("#thumbnails input[type=radio]").removeAttr("checked");
            $(u).attr("checked", true);
            return false;
        }