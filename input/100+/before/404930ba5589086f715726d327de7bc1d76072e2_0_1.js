function myFunction(list){
    //alert("Entro a myFunction: "+ data[0].name);
    //$("#movie").text(data[0].name)
	
    $("#movie").html("<table class='table table-bordered table-condensed'>");
    for(i=0;i<list.length;i++){
        try{
            var src = list[i].posters[0].image.url;
            var url = list[i].url;
        }catch(Exception){
            //alert("hubo un error");
            src="http://i.media-imdb.com/images/mobile/film-40x54.png"
            url=""
        }
        $("#movie").append("<tr>" +
            "<td valign='top' class='movie_image'>" +
            "<a href='"+url+"' target='_blank'><img src='"+src+"' class='img50' /></a>" +
            "</td>" +
            "<td valign='top' class='title'>" +
            "<a href='"+url+"' target='_blank'>"+list[i].name +
            "<div>"+list[i].overview+"</div></a>" +
            "</td>" +
            "</tr>");
    }
    $("#movie").append("</table>");
	
}