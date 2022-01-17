function drawPieChart(title, filters, output, containerId) {
    var wrapper = new google.visualization.ChartWrapper({
        chartType: 'PieChart',
        dataTable: getGraphData(filters, output),
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