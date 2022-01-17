function () {
            return DB.createTable("staff", function () {
                this.foreignKey("id", "employee", {key:"id"});
                this.foreignKey("managerId", "manager", {key:"id"});
            });
        }