function drawPieChart(title, filters, categories, containerId) {
    var wrapper = new google.visualization.ChartWrapper({
        chartType: 'PieChart',
        dataTable: getGraphData(filters, categories),
        options: {
            title: title,
            width: 473,
            height: 400,
            backgroundColor: 'transparent'
        },
        containerId: containerId
    });
    wrapper.draw();
    return;
}