function (db, patio) {
        db.forceDropTable("classesStudents", "studentsClasses", "class", "student");
        db.createTable("class", function () {
            this.primaryKey("id");
            this.semester("char", {size:10});
            this.name(String);
            this.subject(String);
            this.description("text");
            this.graded(Boolean, {"default":true});
        });
        db.createTable("student", function () {
            this.primaryKey("id");
            this.firstName(String);
            this.lastName(String);
            //GPA
            this.gpa(sql.Decimal, {size:[1, 3], "default":0.0});
            //Honors Program?
            this.isHonors(Boolean, {"default":false});
            //freshman, sophmore, junior, or senior
            this.classYear("char");
        });
        db.createTable("classes_students", function () {
            this.foreignKey("studentKey", "student", {key:"id"});
            this.foreignKey("classKey", "class", {key:"id"});
        });

    }