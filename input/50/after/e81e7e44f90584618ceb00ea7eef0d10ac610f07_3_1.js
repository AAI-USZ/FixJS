function(chart) {
                chart.selectAll("svg g rect.bar").each(function(d) {
                    assert.equal(d3.select(this).attr('class'), "bar");
                });
            }