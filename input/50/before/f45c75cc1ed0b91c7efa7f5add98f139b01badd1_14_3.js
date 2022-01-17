function () {
                this.foreignKey("id", "employee", {key:"id"});
                this.foreignKey("managerId", "manager", {key:"id"});
            }