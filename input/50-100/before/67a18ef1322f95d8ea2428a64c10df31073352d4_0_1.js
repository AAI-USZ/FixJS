function drawCidade(cidade, containerId) {
    var wrapper = new google.visualization.ChartWrapper({
        chartType: 'ComboChart',
        dataTable: getCidadeGraphData(cidade),
        options: {
            width:450,
            height:400,
            backgroundColor: 'transparent',
            hAxis: {title: 'Programa'},
            seriesType: 'bars',
            isStacked: true
        },
        containerId: containerId
    });
    wrapper.draw();
    return;
}