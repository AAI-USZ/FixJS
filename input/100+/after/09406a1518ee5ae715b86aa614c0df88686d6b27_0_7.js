function skipExistingItem(_tpID, _soID) {
//	console.log( "in skipExistingItem");
    // create a taste profile and store the resulting Catalog ID in local storage
    var url = "http://" + apiHost + "/api/v4/catalog/update?api_key=" + apiKey;

    var updateBlock = {};
    updateBlock.action = "skip";
    updateBlock.item = {
        "item_id":_soID
    };
    var thelist = [ updateBlock ];

    $.post(url,
        {
            'id':_tpID,
            'data_type':'json',
            'data':JSON.stringify(thelist)
        },
        function (data) {
            var response = data.response;
            //TODO deal with errors somehow

//			console.log("ticket is " + response.ticket);

        })
        .error(function () {
            console.log("in error function");
            console.log(arguments);
        });
}