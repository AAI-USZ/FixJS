function set_number_of_reps(number_of_reps) {
    // Count and display the number of visible reps.
    ProfilesLib.number_of_reps = number_of_reps;

    if (number_of_reps === 0) {
        $('#profiles-reps-number').hide();
    }
    else {
        $('#profiles-reps-number').show();
        $('#profiles-number-of-reps').html(number_of_reps);
        if (number_of_reps === 1) {
            $('#profiles-number-of-reps-plural').html('');
        }
        else {
            $('#profiles-number-of-reps-plural').html('s');
        }
    }
}