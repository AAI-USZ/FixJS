function(data){

    options =['no', 'a', 'b', 'c', 'd'];
    for (var i =0; i < data.progress.length; i++){
        var n = d3.select('#line_' + (i + 1));

        var p = data.progress[i];

        n.select('text').text(p.year);

        var grads = n.selectAll('.gradient');
        n.selectAll('.stop').remove();
        for (var j =0; j < options.length; j++){
            var o = options[j];
            var g = d3.select(grads[0][j]);

            build_gradient(g, p.value == o);
        }
    }
}