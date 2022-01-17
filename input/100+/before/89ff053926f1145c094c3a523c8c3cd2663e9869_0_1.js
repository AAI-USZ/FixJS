function checkCondition(oSettings, aData, iDataIndex, topLevel) {
    masterVal = topLevel.find(".query").val();

    if(masterVal === "") return true;

    cellVal = aData[indexNums[topLevel.find(".querySelect").val()]];

    if(cellVal === "None") return true;

    operator = topLevel.find(".queryOperator").val();
    comp = compareValues(cellVal, masterVal, operator);
    if(topLevel.find(".notOperator").val() === "!") {
        return !comp;
    } else {
        return comp;
    }
}