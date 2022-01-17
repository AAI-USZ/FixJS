function checkCondition(oSettings, aData, iDataIndex, topLevel) {
    masterVal = topLevel.find(".filterText").val();

    if(masterVal === "") return true;

    cellVal = aData[indexNums[topLevel.find(".filterSelect").val()]];

    if(cellVal === "None") return true;

    operator = topLevel.find(".filterOperator").val();
    comp = compareValues(cellVal, masterVal, operator);
    if(topLevel.find(".notOperator").val() === "!") {
        return !comp;
    } else {
        return comp;
    }
}