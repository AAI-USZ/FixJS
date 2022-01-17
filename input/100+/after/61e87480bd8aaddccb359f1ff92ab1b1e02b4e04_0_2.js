function getSelectedPlots(){
    toPlotArr = [];
    Ext.each(myndgridpanel.getSelectionModel().selected.items, function(item, i) {
        toPlotArr.push(item.data.toPlotObj);
    });
    return toPlotArr;
}