function () {
    //Get our models
    var Class = patio.getModel("class"), Student = patio.getModel("student");

    var classDs = Class.order("name"), studentDs = Student.order("firstName", "lastName");

    //Retrieve All classes and students
    comb.when(classDs.all(), studentDs.all()).then(function (results) {
        //enroll the students
        var classes = results[0], students = results[1];
        comb.when.apply(comb, students.map(function (student, i) {
            var ret = new comb.Promise().callback();
            if (i === 0) {
                ret = student.enroll(classes);
            } else if (i < classes.length) {
                ret = student.enroll(classes.slice(i));
            }
            return ret;
        }))
            .chain(
            function () {
                return Student.save({
                    firstName:"Zach",
                    lastName:"Igor",
                    gpa:2.754,
                    classYear:"Sophmore",
                    classes:[
                        {
                            semester:"FALL",
                            name:"Compiler Construction 2",
                            subject:"Computer Science",
                            description:"More Assemblers, interpreters and compilers. Compilation of simple expressions and statements. "
                                + "Analysis of regular expressions. Organization of a compiler, including compile-time and run-time "
                                + "symbol tables, lexical scan, syntax scan, object code generation and error diagnostics."
                        },

                        {
                            semester:"FALL",
                            name:"Operating Systems",
                            subject:"Computer Science"
                        }
                    ]
                });
            }).then(comb.partial(printResults, studentDs, classDs));
    }, disconnectError);
}