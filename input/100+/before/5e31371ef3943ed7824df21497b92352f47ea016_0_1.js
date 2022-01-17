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

        for(var date=begin_date; date<=end_date; date.setDate(date.getDate()+1)) {
            ticks.push(date);
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
            }
        ],
        {
            xaxis: { ticks: ticks },
            grid: { borderWidth: 0 }
        });
    }