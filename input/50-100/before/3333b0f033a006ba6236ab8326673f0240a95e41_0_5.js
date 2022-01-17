function drawCidade(cidade, containerId) {
    var wrapper = new google.visualization.ChartWrapper({
        chartType: 'ComboChart',
        dataTable: getCidadeGraphData(cidade),
        options: {
            title:'Irregularidades na cidade',
            width:473,
            height:400,
            backgroundColor: 'transparent',
            vAxis: {title: 'Irregularidades'},
            hAxis: {title: 'Programa'},
            seriesType: 'bars',
            isStacked: true
        },
        containerId: containerId
    });
    wrapper.draw();
    return;
}