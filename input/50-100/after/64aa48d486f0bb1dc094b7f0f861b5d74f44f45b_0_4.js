function() {
        $("#List li").each(function() {
                $(this).width($(this).find("table").width() + 10);
        });
}