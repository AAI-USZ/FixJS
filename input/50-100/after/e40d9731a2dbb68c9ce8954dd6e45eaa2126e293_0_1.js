function getFileName(ext){
    var filename = $("#his_date_start").val()+"_"+$("#his_time_start").val()+"m--"+$("#his_date_end").val()+"_"+$("#his_time_end").val()+"m"
    filename = filename.replace(/:/g,"h")
    if(ext == "pdf"){
        filename = filename+".pdf"
    }else{
        filename = filename+".csv"
    }
    return filename;
}