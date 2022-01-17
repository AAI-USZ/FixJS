function(
    declare,
    domGeom,
    _Chart,
    ChartManager,
    Columns
) {
    var chart = declare('Sage.Platform.Mobile.Charts.ColumnChart', [_Chart], {
        plotType: Columns,

        plotOptions: {
            markers: true,
            gap: 5
        },

        xAxis: {
            natural: true,
            trailingSymbol: '...'
        },

        yAxis: {
            vertical: true,
            fixLower: 'major',
            fixUpper: 'major',
            minorTicks: false
        }
    });

    ChartManager.register('column', chart);

    return chart;
}