function(date, rangeType) {
        console.log("Calendar.dateChanged(" + date + ", " + rangeType + ")");
        console.log("updating url...");

        Calendar.timeUnit = rangeType;

        var dateLabel, state;
        var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        var monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
                            "Oct", "Nov", "Dec"];

        var monthsOfYearFull = ["January","February","March","April","May","June","July",
                                "August","September","October","November","December"];
        switch (Calendar.timeUnit){
            case "DAY":
                state = "timeline/date/" + date;
                Calendar.tabState = "date/" + date;
                var dateSplits = date.split("-"),
                    d = new Date(Number(dateSplits[0]),Number(dateSplits[1])-1,Number(dateSplits[2]));
                dateLabel = daysOfWeek[d.getDay()] +
                                ", " + monthsOfYear[d.getMonth()] + " " + d.getDate() +
                                ", " + (d.getFullYear());
                break;
            case "WEEK":
                state = "timeline/week/" + date;
                Calendar.tabState = "week/" + date;
                var dateSplits = date.split("/");
                var range = getDateRangeForWeek(dateSplits[0],dateSplits[1]);
                dateLabel = monthsOfYear[range[0].getMonth()] + " " + range[0].getDate() + " - " +
                            monthsOfYear[range[1].getMonth()] + " " + range[1].getDate() + " " + range[1].getFullYear();
                break;
            case "MONTH":
                state = "timeline/month/" + date;
                Calendar.tabState = "month/" + date;
                var dateSplits = date.split("/");
                dateLabel = monthsOfYearFull[parseInt(dateSplits[1])] + " " + dateSplits[0];
                break;
            case "YEAR":
                sate = "timeline/year/" + date;
                Calendar.tabState = "year/" + date;
                dateLabel = date;
                break;
        }
        FlxState.router.navigate("app/calendar/" + state, {trigger: false, replace: true});
        FlxState.saveState("calendar", state);




        console.log("dateLabel: " + dateLabel);

        $("#currentTimespanLabel span").html(dateLabel);
    }