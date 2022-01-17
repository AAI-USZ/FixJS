function () {
            var potentiometerGauge = $('#potentiometer-gaguge');

            metaArduino.on('/potentiometer-gauge', function (value) {
                console.log('new potentiometer value: ' + value);
                potentiometerGauge.val(value);
            });
        }