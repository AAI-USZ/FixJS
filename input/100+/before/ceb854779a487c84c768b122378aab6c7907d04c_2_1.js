function () {
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
        }