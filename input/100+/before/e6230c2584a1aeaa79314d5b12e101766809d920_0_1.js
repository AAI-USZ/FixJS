function getCarouselHTML(digest){
        var data = digest.cachedData["picasa-photo"];
        var data = [];
        for (var i = 0; i < digest.cachedData["picasa-photo"].length; i++){
            data[i] = digest.cachedData["picasa-photo"][i]
            data[i].active = i == 0;
            data[i].id = i;
        }
        return carouselTemplate.render({photos:data,includeNav:data.length > 1});
    }