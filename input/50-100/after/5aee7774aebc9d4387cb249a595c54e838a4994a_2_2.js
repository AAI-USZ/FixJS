function() {
        c = run();

        // Add some fancy debug info
        $("#ava-context-currDuration").change( function(){
                Ava.Context.currentDuration($(this).val());
                $("#ava-context-currDuration-value").html($(this).val());
            });
    }