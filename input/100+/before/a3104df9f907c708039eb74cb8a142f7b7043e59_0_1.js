function () {
        // clear the graph container
        var $spinner = build_spinner();
        $fill_graph_container.empty().append($spinner);

        // hide the 'bakjes' visualization
        $overflow_visualization_container.hide();

        // build query string based on user input
        var query = {
            format: 'json',
            new_fill: $new_fill_slider.slider('value'),
            demand_diff: $demand_slider.slider('value')
        };

        // submit request to the server
        $.ajax({
            url: prediction_url + '?' + $.param(query),
            success: function (response) {
                // clear the graph container (remove spinner)
                $fill_graph_container.empty();

                // plot the graph
                plot_fill_graph(response.graph_info, $fill_graph_container);

                // show the 'bakjes' visualization
                draw_overflow_visualization(response.overflow);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var $error = $('<p>Fout bij het laden van de grafiekdata: ' + errorThrown + '</p>');
                $fill_graph_container.empty().append($error);
            }
        });
    }