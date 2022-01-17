function setFlashFileName( nButton, oConfig, oFlash ) {
    var filename = getFileName()
    oFlash.setFileName( filename );
    this.fnSetText( oFlash,
        "title:"+ this.fnGetTitle(oConfig) +"\n"+
        "message:"+ oConfig.sPdfMessage +"\n"+
        "colWidth:"+ this.fnCalcColRatios(oConfig) +"\n"+
        "orientation:"+ oConfig.sPdfOrientation +"\n"+
        "size:"+ oConfig.sPdfSize +"\n"+
        "--/TableToolsOpts--\n" +
        this.fnGetTableData(oConfig));
}