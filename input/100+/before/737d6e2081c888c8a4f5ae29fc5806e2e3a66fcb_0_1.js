function() {
        selectFeatureControl.unselectAll();
        selectGeographyControl.activate();
        pu_layer.styleMap.styles.default.defaultStyle.display = true;
        self.showScenarioList(false);
        self.selectedFeature(false);
        self.showScenarioList(false);

        function setTargetsPenalties(id, uivalue) {
            // Sets the targets and penalties based on the single slider value
            // slider val is 0 to 100 while targets/penalties are 0 to 1
            // Assume that the slider always tracks target directly (ie 0.75 target == 75 slider)
            // The penalty MAY need to be variable depending on the target  
            $( "#penalty---" + id ).val( uivalue / 100.0 );
            $( "#target---" + id ).val( uivalue / 100.0 );
            //$( "#sliderdisplay---" + id).text( uivalue );
        }

        $.each( $(".slider-range"), function(k, sliderrange) {
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
            })
        });

        // If we're in EDIT mode, set the form values 
        if ($('#id_input_targets').val() && 
            $('#id_input_penalties').val() && 
            $('#id_input_relativecosts').val() && 
            $('#id_input_geography').val()) { 
                
            // Reset to zeros 
            $.each( $('.targetvalue'), function(k, target) { $(target).val(0); });
            $.each( $('.penaltyvalue'), function(k, penalty) { $(penalty).val(0); });
            $.each( $('.costvalue'), function(k, cost) { $(cost).removeAttr('checked'); });

            // Select and apply geography
            var in_geog = JSON.parse($('#id_input_geography').val());
            $.each(in_geog, function (i, fid) {
                var f = pu_layer.getFeaturesByAttribute("fid",fid)[0];
                if (!f) {
                    console.log("warning: fid " + fid + " is not valid");
                }
                selectGeographyControl.select(f);
            });
             
            // Apply Costs
            var in_costs = JSON.parse($('#id_input_relativecosts').val());
            $.each(in_costs, function(key, val) {
                if (val > 0) {
                    $("#cost---" + key).attr('checked','checked')
                } else {
                    $("#cost---" + key).removeAttr('checked')
                }
            });

            // Apply Targets and Penalties
            var in_targets = JSON.parse($('#id_input_targets').val());
            $.each(in_targets, function(key, val) {
                $("#target---" + key).val(val);
                // Assume slider tracks target
                $("#sliderrange---" + key).slider("value", val * 100);  
                //$("#sliderdisplay---" + key).text(val * 100);
            });
            var in_penalties = JSON.parse($('#id_input_penalties').val());
            $.each(in_penalties, function(key, val) {
                $("#penalty---" + key).val(val);
            });
            
       }; // end EDIT mode
    }