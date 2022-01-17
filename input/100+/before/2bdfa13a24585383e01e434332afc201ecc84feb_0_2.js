function() {

    initIndexes();
    initCells();

    // Stepwise enter the calculated alignment values cell by cell
    $('#nextStepCalc').click(function(event){
        nextStepCalc();
        event.preventDefault();
    });

    // Stepwise enter the calculated alignment values row by row
    $('#nextRowCalc').click(function(event){
        nextRowCalc();
        event.preventDefault();
    });

    // Display full aligment table at once
    $('#completeAlignment').click(function(event){
        completeAlignment();
        event.preventDefault();
    });

    // Reset alignment table, clear all values and colors
    $('#resetCalc').click(function(event){
        resetCalc();
        event.preventDefault();
    });
    
    $('#nextStepBt').click(function(event){
        nextStepBt();
        event.preventDefault();
    });

    $('#completeBacktrack').click(function(event){
        completeBacktrack();
        event.preventDefault();
    });
    
    $('#resetBt').click(function(event){
        resetBt();
        event.preventDefault();
    });
    // Send Form on Enter. Only works from inputs that do not allow
    // carriage returns
    $(function() {
        $('form').each(function() {
            $('input').keypress(function () {
                // Check whether the "Enter" is pressed.
                if (e.which == 10 || e.which == 13) {
                    this.form.submit();
                }
            });

            $('input[type=submit]').hide();
        });
    });

}