function() {
        t.equal(counter, ev_counter, "done count vs counter");
        t.equal(counter, works, "works count vs counter");

        //end the test after 500ms empty!
        setTimeout(function() {
            t.end();
        }, 500);
    }