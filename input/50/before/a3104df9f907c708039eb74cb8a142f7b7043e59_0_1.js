function (response) {
                // clear the graph container (remove spinner)
                $fill_graph_container.empty();

                // plot the graph
                plot_fill_graph(response.graph_info, $fill_graph_container);

                // show the 'bakjes' visualization
                draw_overflow_visualization(response.overflow);
            }