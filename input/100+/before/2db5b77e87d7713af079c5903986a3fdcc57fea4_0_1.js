function(req, res) {
    var sri = new models.User(),
        iev = new models.User(),
        drl = new models.User(),
        rafee = new models.User(),
        assn09 = new models.Assignment(),
        assn10 = new models.Assignment(),
        c15150 = new models.Course(),
        c15122 = new models.Course(),
        fundict = new models.File(),
        serializable = new models.File(),
        ordered = new models.File();
        comment = new models.Comment();

    sri.name = "Sri";
    sri.password = ".";
    sri.email = "srikrish@andrew.cmu.edu";
    sri.save(function(e) { if(e) {console.log(err);}});
    rafee.name = "Rafee";
    rafee.password = "rafeetalks";
    rafee.email = "rafee@palantir.com";
    rafee.save(function(e) { if(e) {console.log(err);}});
    iev.name = "Ian";
    iev.password = "ianleaves";
    iev.email = "iev@cs.cmu.edu";
    iev.save(function(e) { if(e) {console.log(err);}});
    drl.name = "Dr. Dan";
    drl.password = "root";
    drl.email = "drl@cs.cmu.edu";
    drl.save(function(e) { if(e) {console.log(err);}});

    c15150.name = "15-150";
    c15150.assignments.push("assn09");
    c15150.staff.push(iev._id);
    c15150.staff.push(drl._id);
    c15150.students.push(sri._id);
    c15150.students.push(rafee._id);
    c15150.save(function(err) {
        if(err) {console.log(err);}
    });

    c15122.name = "15-122";
    c15122.assignments.push("oh god");
    c15122.staff.push(iev._id);
    c15122.students.push(sri._id);
    c15122.save(function(err) {
        if(err) { console.log("ohshot");
            console.log(err);}
    });

    fundict.name = "fundict.sml";
    fundict.slug = "fundict.sml";
    fundict.path =
        application_root + "/data/handins/srikrish/15150/assn09/fundict.sml";
    fundict.timestamp = new Date();
    fundict.save(function(e) { if(e) {console.log(err);}});
    ordered.name = "ordered.sml";
    ordered.slug = "ordered.sml";
    ordered.path =
        application_root + "/data/handins/srikrish/15150/assn09/ordered.sml";
    ordered.timestamp = new Date();
    ordered.save(function(e) { if(e) {console.log(err);}});
    serializable.name = "serializable.sml";
    serializable.slug = "serializable.sml";
    serializable.path =
        application_root+"/data/handins/srikrish/15150/assn09/serializable.sml";
    serializable.timestamp = new Date();
    comment.text = "VINCEEEEEENT!"
    comment.user = sri._id;
    comment.timestamp = new Date();
    comment.startLine = 6;
    comment.endLine = 42;
    comment.startChar = 4;
    comment.endChar = 8;
    comment.save(function(e) { if(e) {console.log(err);}});
    serializable.comments.push(comment);
    serializable.save(function(e) { if(e) {console.log(err);}});

    assn09.name = "Assignment 09";
    assn09.slug = "assn09";
    assn09.course = c15150._id;
    assn09.user = sri._id;
    assn09.files.push(fundict._id);
    assn09.files.push(ordered._id);
    assn09.files.push(serializable._id);
    assn09.save(function(e) { if(e) {console.log(err);}});


    assn10.name = "Assignment 10";
    assn10.slug = "assn10";
    assn10.course = c15122._id;
    assn10.user = sri._id;
    assn10.save(function(e) { if(e) {console.log(err);}});

    sri.assignments.push(assn09._id);
    sri.assignments.push(assn10._id);
    sri.save(function(e) { if(e) {console.log(err);}});


    res.send("OK");
}