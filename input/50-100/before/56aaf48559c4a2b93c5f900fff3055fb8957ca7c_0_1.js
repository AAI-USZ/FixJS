function drawPieChart(title, filters, categories, containerId) {
    var wrapper = new google.visualization.ChartWrapper({
        chartType: 'PieChart',
        dataTable: getPieGraphData(filters, categories),
        options: {
            width: 450,
            height: 400,
            backgroundColor: 'transparent'
        },
        containerId: containerId
    });
    wrapper.draw();
    return;
}