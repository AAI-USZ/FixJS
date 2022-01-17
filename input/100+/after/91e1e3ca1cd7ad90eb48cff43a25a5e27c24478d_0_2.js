function() {
    $(".dashboardListing").on("click", ".trashbin", function(event) {
        event.preventDefault();
        removeSelectedGroup($(this).attr("id"));
    });

    // $("body").on("focus", "#__ac_name", function () {
    //     if ($(this).val()=="Correu electrònic") {$(this).val("")}
    // });
    // $("body").on("blur", "#__ac_name", function () {
    //     if ($(this).val()=="") {$(this).val("Correu electrònic")}
    // });

    $("body").on("focus", "#__ac_name", function () {
        if (($(this).val()).length > 0) {
            text_camp_email = $(this).val();
            $(this).val("");
        }
    });
    $("body").on("blur", "#__ac_name", function () {
        if ($(this).val()=="") {
            $(this).val(text_camp_email)
        }
    });

    $("body").on("focus", "#fake_password", function () {
        $(this).hide();
        $("#__ac_password").show();
        $("#__ac_password").focus();
    });
    $("body").on("blur", "#__ac_password", function () {
        if ($(this).val()=="") {
            $(this).hide();
            $("#fake_password").show();
        }
    });
}