function () {
            return DB.createTable("manager", function () {
                this.foreignKey("id", "employee", {key:"id"});
                this.numStaff("integer");
            });
        }