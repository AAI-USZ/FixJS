function set_sprint_points(){
    "use strict";
    var points = $('.sprint li')
        .map(function(i, el){return $(el).data('points');}).get();
    $('#current-points').html(_.reduce(points, function(sum, cpoints){
        return sum + cpoints;
    }));
}