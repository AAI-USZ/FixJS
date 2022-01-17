function keep_playing(){
        line++;
        elapsed_time = 0;
        if (line < (nb_measure / 4))
        {
            $($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).attr({"y": (30 + (80 * line))});
            $($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).animate({svgTransform: 'translate(0 0)'}, 0, 'linear');
            $($("rect[id='cursor_"+current_svg+"']"), svg_inst[current_svg].root()).animate({svgTransform: 'translate(800 0)'}, speed - elapsed_time, 'linear', keep_playing);
        }
    }