function(
    declare,
    domAttr,
    domClass,
    _Chart,
    ChartManager,
    Areas
) {
    var chart = declare('Sage.Platform.Mobile.Charts.AreaChart', [_Chart], {
        xAxis: {
            fixLower: 'major',
            fixUpper: 'major',
            minorTicks: false
        },
        yAxis: {
            vertical: true,
            fixLower: 'major',
            fixUpper: 'major',
            minorTicks: false
        },
        plotType: Areas,
        plotOptions: {
            markers: false,
            tension: 'X'
        }
    });

    ChartManager.register('area', chart);

    return chart;
}