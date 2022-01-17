function () {
                this.primaryKey("id");
                this.foreignKey(["id"], "manager", {key:"id"});
                this.nummanagers("integer");
            }