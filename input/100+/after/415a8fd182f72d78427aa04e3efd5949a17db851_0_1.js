function() {
        // what modes are we changing between?
        var oldMode = Edgar.mapmode;
        var newMode = theMap.destinationMode;

        function showhidetools(showlist, hidelist) { // - - - - - - - - 
            $.each(hidelist, function(i, tool) {
                $('#' + tool).hide('blind','slow');
            });
            $.each(showlist, function(i, tool) {
                $('#' + tool).show('blind','slow');
            });
        } // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        // do nothing if there was no adjustment of mode
        if (oldMode === newMode) {
            if (oldMode == 'blank') {
                // special handling for blank-to-blank, the startup mode switch
                showhidetools(
                    ['tool-layers', 'tool-example', 'tool-debug', 'tool-layers'],
                    ['oldvets','myvets','newvet','tool-legend','tool-emissions']
                );
            }
            return;
        }

        if ( $.inArray(newMode, validModes) == -1 ) {
            consolelog('ERROR: attempt to change map to unrecognised mode "' + newMode + '".');
            consolelog('pretending mode "blank" was selected.');
            newMode = 'blank';
        }

        // okay now we're okay to change to the proper mode.
        consolelog('changing mode, ' + oldMode + ' to ' + newMode);

        //
        // transitions between modes
        //

        // illegal transitions
        if ( (oldMode === 'blank' && newMode === 'future') ||  // can't skip current
             (oldMode === 'blank' && newMode === 'vetting') || // can't skip current
             (newMode === 'blank')
        ) {                           // can't return to blank
            consolelog('illegal mode transition: cannot move from "' + oldMode + '" to "' + newMode + '".');
        }

        if (oldMode === 'blank'   && newMode === 'current') {
            
        }

        if (oldMode === 'current' && newMode === 'future' ) {
        }

        if (oldMode === 'current' && newMode === 'vetting') {
            disengageCurrentMode();
            // show & hide the appropriate tools
            showhidetools(['oldvets','newvet','myvets'], ['tool-legend','tool-emissions']);
            Edgar.vetting.engageVettingMode();
        }

        if (oldMode === 'future'  && newMode === 'current') {
        }

        if (oldMode === 'future'  && newMode === 'vetting') {
        }

        if (oldMode === 'vetting' && newMode === 'current') {
            Edgar.vetting.disengageVettingMode();
            showhidetools([], ['oldvets','newvet','myvets'],['tool-legend']);
            engageCurrentMode();
        }

        if (oldMode === 'vetting' && newMode === 'future' ) {
        }

        // yay, we're almost done.. now change the mode record
        Edgar.mapmode = newMode;

    }