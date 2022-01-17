function retrieveListOfProfiles() {
//    console.log("in retrieveListOfProfiles");
    var url = "http://" + apiHost + "/api/v4/catalog/list?api_key=" + apiKey + "&callback=?";

    $.getJSON(url,
        {
            'format':'jsonp'
        }, function (data) {
//          console.log("in results for retrieve");
            var response = data.response;
            var catalogs = response.catalogs;

            var catList = $("div._en_tp_list");
            catList.text("");

            for (var i = 0; i < catalogs.length; i++) {
                var catalog = catalogs[ i ];

//					console.log( "catalog ID: " + catalog.id + ", named " + catalog.name );
                catList.html(catList.html() + "<a href='#' onclick='selectProfile(\"" + catalog.id + "\");'>" + catalog.name + " (" + catalog.id + ") [" + catalog.type + ", " + catalog.total + "]</a><br />");
            }
        });
}