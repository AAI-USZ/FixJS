function () {

    setTimeout("window.location.replace('/Home/Index')", 1210000);

    document.onkeypress = stopRKey;

    $("#sms_message").keyup(function () {
        var noCharactersLeft = 160 - $("#sms_message").val().length;
        if (noCharactersLeft < 0) {
            $("#sms_message").val($("#sms_message").val().substring(0, 160));
            noCharactersLeft = 0;
        }
        $("#span_noCharactersLeft").html(noCharactersLeft);
    });

    $('.button').live('mouseover mouseout', function (event) {
        if (event.type == 'mouseover') {
            $(this).css("cursor", "pointer");
        } else {
            $(this).css("cursor", "default");
        }
    });

    $(".button").tooltip({ position: "top right", opacity: 1, tipClass: "tooltip" });
    $("button, input:submit").button();

    $("#button_home").click(function () {
        window.location.replace("/Home/Index");
    });
    $("#button_person").click(function () {
        window.location.replace("/Home/Person");
    });
    $("#button_homegroup").click(function () {
        window.location.replace("/Home/Homegroups");
    });
    $("#button_settings").click(function () {
        window.location.replace("/Home/Settings");
    });
    $("#button_lists").click(function () {
        window.location.replace("/Home/ReportGrid");
    });
    $("#button_reports").click(function () {
        window.location.replace("/Home/ReportGrid");
    });
    $("#button_help").click(function () {
        window.location.replace("/Home/Help");
    });
    $("#button_logout").click(function () {
        window.location.replace("/Home/Logout");
    });
}