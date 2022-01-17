function ajaxSave(rowid) {
    var state;

    if($('#visible_'+rowid).is(':checked') == true)
    {
        state = "TRUE";
    }
    else
    {
        state = "FALSE";
    }
    $.post(editAttributeUrl, {
        id: rowid,
        visible: state,
        oper : 'edit'
        },
        function (data) {
            $("p#flashmessagetext").html(data);
            $("#flashinfo").css("display", "");
            $("#flashinfo").css("opacity", 0);
            $("#flashinfo").animate({opacity: 1.0}, 1500).fadeOut("slow");
        }
    );
}