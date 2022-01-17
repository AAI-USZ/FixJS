function drawBarChart(title, filters, categories, containerId) {
    var wrapper = new google.visualization.ChartWrapper({
        chartType: 'BarChart',
        dataTable: getGraphData(filters, categories),
        options: {
            title: title,
            width: 473,
            backgroundColor: 'transparent',
            colors: ['#f00']
        },
        containerId: containerId
    });
    wrapper.draw();
    return;
}