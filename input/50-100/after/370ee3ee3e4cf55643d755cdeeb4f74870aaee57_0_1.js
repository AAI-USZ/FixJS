function drawColumnChart(title, filters, categories, containerId) {
    var wrapper = new google.visualization.ChartWrapper({
        chartType: 'ColumnChart',
        dataTable: getColumnGraphData(filters, categories),
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