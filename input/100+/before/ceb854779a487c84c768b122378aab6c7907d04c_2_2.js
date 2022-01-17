function (db, patio) {
        db.forceDropTable("classesStudents", "studentsClasses", "class", "student");
        db.createTable("class", function () {
            this.primaryKey("id");
            this.semester("char", {size:10});
            this.unique(["name", "subject"]);
            this.name(String);
            this.subject(String);
            this.description("text");
            this.graded(Boolean, {"default":true});
        });
        db.createTable("student", function () {
            this.primaryKey("id");
            this.firstName(String);
            this.lastName(String);
            this.unique(["firstName", "lastName"]);
            //GPA
            this.gpa(sql.Decimal, {size:[1, 3], "default":0.0});
            //Honors Program?
            this.isHonors(Boolean, {"default":false});
            //freshman, sophmore, junior, or senior
            this.classYear("char");
        });
        //this isnt very practical but it gets the point across
        db.createTable("classes_students", function () {
            this.firstNameKey(String);
            this.lastNameKey(String);
            this.nameKey(String);
            this.subjectKey(String);
            this.foreignKey(["firstNameKey", "lastNameKey"], "student", {key:["firstName", "lastName"]});
            this.foreignKey(["nameKey", "subjectKey"], "class", {key:["name", "subject"]});
        });

    }