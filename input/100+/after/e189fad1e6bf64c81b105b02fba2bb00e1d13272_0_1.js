function () {
    /* Buttons */
    $("input:submit,input:button").button();
    $(".bg-button-no-icon").button();
    $(".bg-button-readmore,.bg-button-new").button({ icons: { primary: "ui-icon-circle-plus" }, text: false });
    $(".bg-button-new").button({ icons: { primary: "ui-icon-circle-plus" }, text: true });
    $(".bg-button-user").button({ icons: { primary: "ui-icon-person" }, text: true });
    $(".bg-button-edit").button({ icons: { primary: "ui-icon-pencil" }, text: true });
    $(".bg-button-edit-no-text").button({ icons: { primary: "ui-icon-pencil" }, text: false });
    $(".bg-button-reply").button({ icons: { primary: "ui-icon-pencil" }, text: false });
    $(".bg-button-delete").button({ icons: { primary: "ui-icon-circle-close" }, text: true });
    $(".bg-button-delete-no-text").button({ icons: { primary: "ui-icon-circle-close" }, text: false });
    $(".bg-button-save").button({ icons: { primary: "ui-icon-disk" }, text: true });
    $(".bg-button-gear").button({ icons: { primary: "ui-icon-gear" }, text: true });
    $(".bg-button-question").button({ icons: { primary: "ui-icon-help" }, text: true });
    $(".bg-button-locked").button({ icons: { primary: "ui-icon-locked" }, text: true });
    $(".bg-button-locked-notext").button({ icons: { primary: "ui-icon-locked" }, text: false });
    $(".bg-button-zoom").button({ icons: { primary: "ui-icon-zoomin" }, text: true });
    $(".bg-button-unlocked").button({ icons: { primary: "ui-icon-unlocked" }, text: true });
    $(".bg-button-unlocked-notext").button({ icons: { primary: "ui-icon-unlocked" }, text: false });
    $(".bg-button-admin-menu").button({ icons: { primary: "ui-icon-circle-triangle-e" }, text: true });
    $(".bg-button-back").button({ icons: { primary: "ui-icon-arrowrefresh-1-w" }, text: true });
    $(".bg-button-search").button({ icons: { primary: "ui-icon-zoomin" }, text: false });
    $(".bg-button-comments").button({ icons: { primary: "ui-icon-comment" }, text: true });
    $(".bg-button-mail").button({ icons: { primary: "ui-icon-mail-closed" }, text: true });
    $("input:submit").css("font-weight", "bold");

    /* Menu */
    $("#menu").buttonset();
    var url = window.location.pathname;
    if (url == "") { url = "/" }
    $("ul#menu li a").each(function () {
        var myHref = $(this).attr("href");
        if (url == myHref) {
            $(this).addClass("ui-state-active")
            $(this).mouseover(function () {
                $(this).removeClass("ui-state-active");
            }).mouseout(function () {
                $(this).addClass("ui-state-active");
            });
        }
        $(this).click(function () {
            $("ul#menu li a").removeClass("ui-state-active");
            $(this).addClass("ui-state-active");
        });
    });

    $(".clickable").click(function () {
        location.href = $(this).attr("data-href");
    });

    /* Common */
    $(".page").fadeIn(1000);
    $(".editor-date input").datepicker();
    $(".breadcrumb").jCrumb({ maxCrumbs: 5, jqUI: true });
    $(".reset-bold p").css("font-weight", "normal");
}