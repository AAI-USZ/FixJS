function(k, sliderrange) {
            var id = $(sliderrange).attr('id');
            id = id.replace("sliderrange---", '');
            $(sliderrange).slider({
                range: "min",
                value: 0,
                min: 0,
                max: 100,
                slide: function( event, ui ) {
                    setTargetsPenalties(id, ui.value);
                }
            });
        }