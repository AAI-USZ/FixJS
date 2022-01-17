function BuildChart (key, value) {

    

    var max = d3.max(value),

        scale_x = d3.scale.linear().domain([0, data.length - 1]).range [0, w],

        scale_y = d3.scale.linear().domain([0, max]).range [h, 0];

    

}