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
            demand_diff: $demand_slider.slider('value'),
            date: new Date().getTime() // add dummy date to simulate REST like behaviour, but in reality the server-time is used
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

                // show the demand
                $('#demand-value').html(Math.round(response.demand24h) + ' m<sup>3</sup>');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var $error = $('<p>Fout bij het laden van de grafiekdata: ' + errorThrown + '</p>');
                $fill_graph_container.empty().append($error);
            }
        });
    }