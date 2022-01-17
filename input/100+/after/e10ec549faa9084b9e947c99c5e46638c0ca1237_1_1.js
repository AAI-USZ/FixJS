function(response, Y) {
        var history = Y.JSON.parse(response.responseText);

        var overlay = Y.Node.create('<div class="programming_result_chart_overlay"></div>');

        var canvas = Y.Node.create('<div class="programming_result_popup_chart"></div>');
        var canvas_height = M.plagiarism_programming.view_report.chart_height-50;
        var left = 20;
        var h_label = Y.Node.create('<label class="h_label">'+M.str.moodle.date+'</label>');
        var v_label = Y.Node.create('<label class="v_label">%</label>');
        var title = Y.Node.create('<label class="title">'+M.str.plagiarism_programming.similarity_history+'</label>')
        canvas.append(h_label);
        canvas.append(v_label);
        canvas.append(title);

        for (var i in history) {
            var bar = Y.Node.create('<a class="bar" href="view_compare.php?id='+i+'"/>');
            bar.setStyles({
                height: (history[i].similarity/100*canvas_height) + 'px',
                left: left + 'px'
            });
            canvas.append(bar);

            var label = Y.Node.create('<label>'+history[i].similarity+'%</label>');
            label.setStyles({
                left: left+'px',
                bottom: (history[i].similarity/100*canvas_height+5)+'px'
            });
            canvas.append(label);

            label = Y.Node.create('<label>'+history[i].time_text+'</label>');
            label.setStyles({
                left: left+'px',
                bottom: '-35px'
            })
            canvas.append(label);
            left += 50;
        }
        overlay.append(canvas);
        return overlay;
    }