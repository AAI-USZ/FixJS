function(){


    // Выбор вида поиска (по сайту, в интернете)
    $(".search-way a").click(function() {

        if($(this).hasClass('by-site')) {
            if(switchSearchDirection('site')) {
                $(".search-way a.active").removeClass('active');
//                $("#dv-site-search").find('.gsc-search-button').click();
                $(this).addClass('active');
            }
        }
        if($(this).hasClass('by-web')) {
            if(switchSearchDirection('web')) {
                $(".search-way a.active").removeClass('active');
//                $("#dv-web-search").find('.gsc-search-button').click();
                $(this).addClass('active');
            }
        }
    });





    $("#txtSearch").keypress(function(e){
        if(e.keyCode == 13){
            searchIt();
        }
    });


    $("#submitSearch").click(function(){
        searchIt();
    });
}