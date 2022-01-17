function(sql, callback) {
    var self = this;
    var url = this.base_url  + "?q=" + encodeURIComponent(sql)+"&v="+this._version;
    if($.browser.msie) {
        $.ajax({
            url: url, 
            method: 'get',
            dataType: 'jsonp',
            error: function(e, t, ee) {
                //console.log(e, t, ee);
            },
            success: function(data) {
                console.log(data.rows.length);
                callback(data);
            }
        });
    } else {
        $.getJSON(url ,function(data){
            callback(data);
        });
    }
}