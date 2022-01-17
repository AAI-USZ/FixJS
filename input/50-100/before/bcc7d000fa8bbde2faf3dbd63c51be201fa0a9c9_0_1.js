function fetchData(){

    $('#lastUpdateDT').html("Updating...");
    $.when(getRssFeedAsync(), getGoogleCalAsync(), getTwitterAsync())
//        .then (function(){
//            var currentDate = new Date();
//            $('#lastUpdateDT').html(getFormattedDate(currentDate)+" @ "+getFormattedTime(currentDate));
//        })
        .fail (function(){
            console.log('One or more network requests failed.  '+TRY_AGAIN_MSG );
        })
        .always(function(){
            $.mobile.hidePageLoadingMsg();
            var currentDate = new Date();
            $('#lastUpdateDT').html(getFormattedDate(currentDate)+" @ "+getFormattedTime(currentDate));
        });
}