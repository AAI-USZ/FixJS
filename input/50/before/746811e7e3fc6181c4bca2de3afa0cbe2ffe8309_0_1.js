function calculate_number_of_reps() {
    // Count and display the number of visible reps.
    number_of_reps = $('.profiles-li-item[style!="display: none;"]').length
    $('#profiles-number-of-reps').html(number_of_reps);
}