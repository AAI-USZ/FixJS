function setFlashFileName( nButton, oConfig, oFlash ) {
    var filename = getFileName(oConfig.sExtends)
    oFlash.setFileName( filename );
    if(oConfig.sExtends == "pdf"){
        this.fnSetText( oFlash,
            "title:"+ this.fnGetTitle(oConfig) +"\n"+
            "message:"+ oConfig.sPdfMessage +"\n"+
            "colWidth:"+ this.fnCalcColRatios(oConfig) +"\n"+
            "orientation:"+ oConfig.sPdfOrientation +"\n"+
            "size:"+ oConfig.sPdfSize +"\n"+
            "--/TableToolsOpts--\n" +
            this.fnGetTableData(oConfig));
    }else{
        this.fnSetText( oFlash,
                this.fnGetTableData(oConfig));
    }
}