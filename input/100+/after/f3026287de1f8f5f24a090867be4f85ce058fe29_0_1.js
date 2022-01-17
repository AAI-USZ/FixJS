function good_content_size(left){
    // /** make the content of a good size */
    var new_width = $(window).width() - $('#left_stack').width();
    var max = Math.max(new_width, '800') ;
    // $('#content').width(max);

    /* calculate sizes for table columns */
    var ths = $('.grid').find('th');
    
    var nb = ths.length - 1;
    console.log(nb);
    var  w = max / nb;
    console.log(w);
    $(ths).width(w);
    console.log(ths);
}