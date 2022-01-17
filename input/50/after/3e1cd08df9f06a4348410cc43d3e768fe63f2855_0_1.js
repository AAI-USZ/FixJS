function() {
    $('#number').attr('value',localStorage.number);
    update();
    if (localStorage.firstTime == undefined) {
        $('.helpbox').toggle();
        localStorage.firstTime = false;
    }
}