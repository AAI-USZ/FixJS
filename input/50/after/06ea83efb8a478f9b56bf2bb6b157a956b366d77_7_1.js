function.throttle & function.periodical", function(t) {

    counter = 0;

    var t4 = test_fn.throttle(1000);
    var inter = t4.periodical(50);

    setTimeout(function() {
        t.equal(counter, 2, "sequence_1 error [" + counter + "] ");
        clearInterval(inter);
        t.end();
    }, 1500);

}