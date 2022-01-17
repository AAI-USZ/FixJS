function layout() {
    if (global.params.isRTL)
        document.body.dir = "rtl";
    else
        document.body.dir = "ltr";
    var main = $("main");
    var params = global.params;
    main.removeChild(main.firstChild);
    document.body.addEventListener("keydown", handleGlobalKey, false);

    global.yearMonthController = new YearMonthController();
    global.yearMonthController.attachTo(main);
    global.daysTable = new DaysTable();
    global.daysTable.attachTo(main);
    layoutButtons(main);
}