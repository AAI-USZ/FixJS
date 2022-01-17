function(collection, format, data, successCallback){

    var url = this.url + "/sketch/import/" + this.database + "/" + collection + "/";
    console.log("query", url);
    postData = {data : data, format : format};
    
    $.ajax({
        type: 'POST',
        url: url,
        data: postData,
        success: successCallback,
        dataType: 'json'
    });
    
    
}