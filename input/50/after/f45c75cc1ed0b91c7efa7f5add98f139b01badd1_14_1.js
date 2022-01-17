function () {
                this.primaryKey("id");
                this.foreignKey(["id"], "employee", {key:"id"});
                this.numstaff("integer");
            }