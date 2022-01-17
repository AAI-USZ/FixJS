function createNdPlotRegion(plotid, renderTo) {
    var div = document.createElement('div');
    div.setAttribute('id', plotid);
    div.setAttribute('class', 'plot-region');
    var divy = document.createElement('div');
    divy.setAttribute('id', plotid + '_divy');
    divy.setAttribute('class', 'plot-axis plot-axis-y');
    var divx = document.createElement('div');
    divx.setAttribute('id', plotid + '_divx');
    divx.setAttribute('class', 'plot-axis plot-axis-x');
    var divc = document.createElement('div');
    divc.setAttribute('id', plotid + '_divc');
    divc.setAttribute('class', 'plot-axis plot-axis-c');
    var divtarget = document.createElement('div');
    divtarget.setAttribute('id', plotid + '_target');
    divtarget.setAttribute('style', 'display: block; width: 450; height: 350;');
    divtarget.setAttribute('class', 'plot-target');
    var selecty = document.createElement('select');
    selecty.setAttribute('id', plotid + '_selecty');
    selecty.setAttribute('class', 'plot-axis-select plot-axis-select-y');
    var selectx = document.createElement('select');
    selectx.setAttribute('id', plotid + '_selectx');
    selectx.setAttribute('class', 'plot-axis-select plot-axis-select-x');
    var updatebutton = document.createElement('input');
    updatebutton.setAttribute('id', plotid + '_update');
    updatebutton.setAttribute('type', 'submit');
    updatebutton.setAttribute('value', 'Update plot');
    
    divy.appendChild(selecty);
    divx.appendChild(selectx);
    divx.appendChild(updatebutton);
    div.appendChild(divy);
    div.appendChild(divtarget);
    div.appendChild(divc);
    div.appendChild(divx);
    
    return div;
}