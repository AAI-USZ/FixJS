function generateChartData() {

    var dates = [];
    var count = {};
    var response;
    request = $.ajax({
        url: "/get-all-apps",
        async: false,
        contentType: "application/json",
        success: function(data){
            response = data;
        }
    });

    sortedResponse = response.sort();
    sortedResponse.forEach(formatDate);

    function formatDate (element) {
        var d = new Date(element * 1).toDateString();
        d = new Date(d);
        dates.push(d);
    }
        //console.log(dates);

    for(var i = 0; i < dates.length; i++) {
        count[dates[i]] = (count[dates[i]] || 0) + 1
    }

    //   console.log(count);

    var firstDate = dates[0];

    function days_between(date1, date2) {
        var ONE_DAY = 1000 * 60 * 60 * 24
        var date1_ms = date1.getTime()
        var date2_ms = date2.getTime()
        var difference_ms = Math.abs(date1_ms - date2_ms)
        return Math.round(difference_ms/ONE_DAY)
    }

    //console.log(dates);

    keys = _.keys(count);
    keys = keys.reverse();

    for(var i = 0; i < days_between(firstDate, new Date())+1; i++) {
        var newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);
        //console.log(newDate);

        var apps = Math.round(Math.random() * 40);

        chartData.push({
            date: newDate,
            count: apps
        });
        console.log(dates);
    }
        console.log(count);
}