function fixWindowSize() {
    var yearMonthRightElement = document.getElementsByClassName(ClassNames.YearMonthButtonRight)[0];
    var daysAreaElement = document.getElementsByClassName(ClassNames.DaysArea)[0];
    var headers = daysAreaElement.getElementsByClassName(ClassNames.DayLabel);
    var maxCellWidth = 0;
    for (var i = 0; i < headers.length; ++i) {
        if (maxCellWidth < headers[i].offsetWidth)
            maxCellWidth = headers[i].offsetWidth;
    }
    var DaysAreaContainerBorder = 1;
    var maxRight = Math.max(yearMonthRightElement.offsetLeft + yearMonthRightElement.offsetWidth,
                            daysAreaElement.offsetLeft + maxCellWidth * 7 + DaysAreaContainerBorder);
    var MainPadding = 6;
    var MainBorder = 1;
    var desiredBodyWidth = maxRight + MainPadding + MainBorder;

    var main = $("main");
    var mainHeight = main.offsetHeight;
    main.style.width = "auto";
    daysAreaElement.style.width = "100%";
    daysAreaElement.style.tableLayout = "fixed";
    document.getElementsByClassName(ClassNames.YearMonthUpper)[0].style.display = "-webkit-box";
    document.getElementsByClassName(ClassNames.MonthSelectorBox)[0].style.display = "block";
    main.style.webkitTransition = "opacity 0.1s ease";
    main.style.opacity = "1";
    if (window.frameElement) {
        window.frameElement.style.width = desiredBodyWidth + "px";
        window.frameElement.style.height = mainHeight + "px";
    } else {
        window.resizeTo(desiredBodyWidth, mainHeight);
    }
}