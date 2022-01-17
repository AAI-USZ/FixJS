function renderScenario() {
    for (i=0; i<9; i++) {
        var cell = $('#cell_'+i.toString());
        process(cell, scenario[i]);
        cell.html(map(scenario[i]));
    }
}