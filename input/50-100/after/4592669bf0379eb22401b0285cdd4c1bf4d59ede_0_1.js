function updateRequired() {
        $('input[need], select[need], textarea[need]').tipsy({trigger: 'focus', gravity: 'w'});
        $('input[need], select[need], textarea[need]').blur( function(){onBlurVerify( this );} );
        $('input[need], select[need], textarea[need]').change( function(){returnRequiredItems("requireditems");} );
        returnRequiredItems("requireditems");   
}