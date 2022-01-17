function drawColumnChart(category, containerId, customData) {
    var wrapper = new google.visualization.ChartWrapper({
        chartType: 'ColumnChart',
        dataTable: getColumnGraphData(category, customData),
        options: {
            width: 450,
            height: 500,
            backgroundColor: 'transparent'
        },
        containerId: containerId
    });
    wrapper.draw();
    return;
}