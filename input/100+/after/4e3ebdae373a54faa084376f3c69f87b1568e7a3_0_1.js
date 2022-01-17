function(collection, format, data, commit, successCallback){

    var url = this.url + "/sketch/import/" + this.database + "/" + collection + "/";
    console.log("query", url);
    var commitInteger = 0;
    if(Boolean(commit)){
        commitInteger = 1;
    } 
    postData = {data : data, format : format, commit : commitInteger };
    
    $.ajax({
        type: 'POST',
        url: url,
        data: postData,
        success: successCallback,
        dataType: 'json'
    });
    
    
}