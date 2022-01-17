function() {
        if (this.$el.attr('show') !== 'on') {
            return;
        }

        this.$("#sprint-burndown-graph").show();

        var d1 = new Array(),
            d2 = new Array(),
            ticks = new Array();

        var begin_date = new Date(this.model.get('begin_date'));
        var end_date = new Date(this.model.get('end_date'));
        var sprint_points = this.model.get('sprint_points');
        var points_done_on_date = this.model.get('points_done_on_date');

        var counter = 1;
        for(var date=new Date(begin_date.toString()); date<=end_date; date.setDate(date.getDate()+1)) {
            ticks.push([counter, date.getDate().toString()+"/"+(date.getMonth()+1).toString()]);
            counter++;
        }

        var now = new Date();
        var now_position = 1;
        if((begin_date < now) && (end_date > now)){
            now_seconds_from_begin = now.getTime() - new Date(begin_date.toDateString());
            end_seconds_from_begin = (ticks.length + 1) * (24*60*60*1000);
            now_position = (now_seconds_from_begin*(ticks.length+1))/end_seconds_from_begin;

            // The begin is in the x axis position 1
            now_position++;
        } else if(end_date < now){
            now_position = ticks.length+1;
        }

        for(var i=0; i<=ticks.length; i++) {
            d1.push([i+1, sprint_points-points_done_on_date[i]]);
            d2.push([i+1, sprint_points-((sprint_points/ticks.length)*i)]);
        }

        $.plot(this.$('#sprint-burndown-graph'), [
            {
                data: d1,
                lines: { show: true, fill: true },
                points: { show: true }
            },
            {
                data: d2,
                lines: { show: true, fill: true },
                points: { show: true }
            },
            {
                data: [[now_position, 0], [now_position, sprint_points]],
                lines: { show: true, fill: true },
                points: { show: false },
                color: "#66cc66",
            }
        ],
        {
            xaxis: { ticks: ticks },
            grid: { borderWidth: 0 }
        });
    }