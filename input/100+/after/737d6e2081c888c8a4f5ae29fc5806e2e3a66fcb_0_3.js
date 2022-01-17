function(self, event) {
        var targets = {};
        var penalties = {};
        var costs = {};
        var geography_fids = [];
        var totaltargets = 0;
        var totalpenalties = 0;
        var totalfids = 0;

        // Get geography constraints
        $.each(pu_layer.selectedFeatures, function(k, v) { 
            geography_fids.push(v.data.fid); 
            totalfids += 1;
        });
        // Get targets
        $("#form-cfs input.targetvalue").each( function(index) {
            var xid = $(this).attr("id");
            var id = "#" + xid;
            xid = xid.replace(/^target---/,''); //  Remove preceding identifier
            xid = xid.replace(/---$/,''); // Remove trailing ---
            targets[xid] = parseFloat($(id).val());
            totaltargets += parseFloat($(id).val());
        });
        // Get penalties 
        $("#form-cfs input.penaltyvalue").each( function(index) {
            var xid = $(this).attr("id");
            var id = "#" + xid;
            xid = xid.replace(/^penalty---/,''); 
            xid = xid.replace(/---$/,'');
            penalties[xid] = parseFloat($(id).val());
            totalpenalties += parseFloat($(id).val());
        });
        // Initialize costs to zero
        $('#form-costs input:checkbox.costvalue').each( function(index) {
            var xid = $(this).attr("id");
            xid = xid.replace(/^cost---/,'');
            costs[xid] = 0;
        });
        // Set the *checked* costs to 1
        $('#form-costs input:checkbox.costvalue:checked').each( function(index) {
            var xid = $(this).attr("id");
            xid = xid.replace(/^cost---/,'');
            costs[xid] = 1;
        });

        // Set the form values (note that .html() doesnt change)
        var frm = $('form#featureform');
        $(frm).find('textarea#id_input_targets').val( JSON.stringify(targets) ); 
        $(frm).find('textarea#id_input_penalties').val( JSON.stringify(penalties) );
        $(frm).find('textarea#id_input_relativecosts').val( JSON.stringify(costs) );
        $(frm).find('textarea#id_input_geography').val( JSON.stringify(geography_fids) );

        if (totalfids === 0) {
            alert("Please select geography; complete Step 1");
            $("#formtabs a[href='#geographytab']").tab('show');
        } else if ($(frm).find('input[name="name"]').val() === '') {
            alert("Please provide a name; complete Step 2");
            $("#formtabs a[href='#generaltab']").tab('show');
            $(frm).find('input[name="name"]').focus();
        } else if (totalpenalties === 0 || totaltargets === 0) {
            alert("Please set goals for at least one target; complete Step 3");
            $("#formtabs a[href='#speciestab']").tab('show');
        } else {
            // GO .. we are clear to submit the form
            var values = {};
            var actionUrl = $(frm).attr('action');
            $(frm).find('input,select,textarea').each(function() {
                values[$(this).attr('name')] = $(this).val();
            });

            // Submit the form
            self.formSaveComplete(false);
            self.formSaveError(false);
            var scenario_uid; 
            var jqxhr = $.ajax({
                url: actionUrl,
                type: "POST",
                data: values
            })
            .success( function(data, textStatus, jqXHR) {
                var d = JSON.parse(data);
                scenario_uid = d["X-Madrona-Select"];
                self.loadScenarios(scenario_uid);
                self.cancelAddScenario(); // Not acutally cancel, just clear 
            })
            .error( function(jqXHR, textStatus, errorThrown) {
                console.log("ERROR", errorThrown, textStatus);
                self.formSaveError(true);
            })
            .complete( function() { 
                self.formSaveComplete(true);
            });
        }
  }