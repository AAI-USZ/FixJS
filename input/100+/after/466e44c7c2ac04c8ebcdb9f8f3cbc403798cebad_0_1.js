function(){

            var data = this.model.get('gData');

            if(data) {
                var plot = $.plot($(".chart"),
                    data, {
                        series: {
                            lines: { show: true },
                            points: { show: true }
                        },
                        grid: { hoverable: true, clickable: true }
                    }
                );
            }

        }