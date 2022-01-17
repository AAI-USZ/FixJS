function calculateDataPie() {
        return d3.layout.pie().value(function(d) {
            return d.value;
        });
    }