function () {
                this.primaryKey("id");
                this.foreignKey(["id"], "employee", {key:"id"});
                this.foreignKey("managerid", "manager", {key:"id"});
            }