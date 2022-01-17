function search(e){
    e.preventDefault();
    $("#movie").text("Buscando.... espere....");
    var q=$("#search").val();
    var APIKEY = "10562c9ee2722c0be2a1c3bc31e3028a";
    var url7="http://api.themoviedb.org/2.1/Movie.search/es-CO/json/"+APIKEY+"/"+q;

    imdb3(url7);
}