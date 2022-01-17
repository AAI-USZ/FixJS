function set_sprint_points(){
    "use strict";
    $('#current-points').html($('.sprint li')
        .map(function(i, el){return $(el).data('points')})
        .get().reduce(function(sum, points){
            return sum + points;
        }, 0));
}