function createTable(list,query){
    //    $("#movie > table").empty()//.slideToggle("slow");
    $("#search-info > #result-num").text(list.length);
    $("#search-info > #query-string").text(query);
    $("#movie").fadeIn(160,function(e){
        $("#movie > table").slideDown("slow")
        });
    var l = '';
    for(i=0;i<list.length;i++){
        try{
            var url = list[i].url;
        }catch(Exception){
            url="#error"
        }
        try{
            var id=(list[i].imdb_id != null) ? "title/"+list[i].imdb_id : "find?q="+query+"&s=all" ;
            var url_imdb = "http://www.imdb.com/"+id;
        }catch(Exception){
            url_imdb="http://www.imdb.com/find?q="+query+"&s=all";
        }
        try{
            var src = list[i].posters[0].image.url;
        }catch(Exception){
            src="http://i.media-imdb.com/images/mobile/film-40x54.png"
        }
        var desc = ( list[i].overview != null ) ?(list[i].overview).substring(0, 400)+"...":"No Description";
        l += "<tr>" +
            "<td valign='top' class='movie_image'>" +
                "<a href='"+url+"' target='_blank'><img src='"+src+"' class='img50' /></a>" +
            "</td>" +
            "<td valign='top' class='title'>" +
                "<a href='"+url+"' target='_blank'>"+list[i].name +
                "<div>"+desc+"</div></a>" +
            "</td>" +
            "<td>"+
                "<a href='"+url+"' class='bonton btn btn-success' target='_blank' >TMDB</a>"+
                "<a href='"+url_imdb+"' class='bonton btn btn-warning' target='_blank' >IMDB</a>"+
            "</td>"+
        "</tr>";
    }
    $("#movie > table").append(l);
}