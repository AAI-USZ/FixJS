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
    var main = $("main");
    var yearMonthEnd;
    var daysAreaEnd;
    if (global.params.isRTL) {
        var startOffset = main.offsetLeft + main.offsetWidth;
        yearMonthEnd = startOffset - yearMonthRightElement.offsetLeft;
        daysAreaEnd = startOffset - (daysAreaElement.offsetLeft + daysAreaElement.offsetWidth) + maxCellWidth * 7 + DaysAreaContainerBorder;
    } else {
        yearMonthEnd = yearMonthRightElement.offsetLeft + yearMonthRightElement.offsetWidth;
        daysAreaEnd = daysAreaElement.offsetLeft + maxCellWidth * 7 + DaysAreaContainerBorder;
    }

    var maxEnd = Math.max(yearMonthEnd, daysAreaEnd);
    var MainPadding = 6;
    var MainBorder = 1;
    var desiredBodyWidth = maxEnd + MainPadding + MainBorder;

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