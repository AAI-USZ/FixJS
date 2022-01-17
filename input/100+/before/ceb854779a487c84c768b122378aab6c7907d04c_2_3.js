function () {
                this._super(arguments);
                this.manyToMany("students",
                    {fetchType:this.fetchType.EAGER,
                        leftPrimaryKey:["name", "subject"],
                        leftKey:["nameKey", "subjectKey"],
                        rightPrimaryKey:["firstName", "lastName"],
                        rightKey:["firstNameKey", "lastNameKey"], order:[sql.firstName.desc(), sql.lastName.desc()]});
                this.manyToMany("aboveAverageStudents", {model:"student", leftPrimaryKey:["name", "subject"],
                    leftKey:["nameKey", "subjectKey"],
                    rightPrimaryKey:["firstName", "lastName"],
                    rightKey:["firstNameKey", "lastNameKey"]}, function (ds) {
                    return ds.filter({gpa:{gte:3.5}});
                });
                this.manyToMany("averageStudents", {model:"student", leftPrimaryKey:["name", "subject"],
                    leftKey:["nameKey", "subjectKey"],
                    rightPrimaryKey:["firstName", "lastName"],
                    rightKey:["firstNameKey", "lastNameKey"]}, function (ds) {
                    return ds.filter({gpa:{between:[2.5, 3.5]}});
                });
                this.manyToMany("belowAverageStudents", {model:"student",
                    leftPrimaryKey:["name", "subject"],
                    leftKey:["nameKey", "subjectKey"],
                    rightPrimaryKey:["firstName", "lastName"],
                    rightKey:["firstNameKey", "lastNameKey"]}, function (ds) {
                    return ds.filter({gpa:{lt:2.5}});
                });
            }