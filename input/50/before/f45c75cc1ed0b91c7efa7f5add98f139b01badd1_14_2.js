function () {
                this.foreignKey("id", "manager", {key:"id"});
                this.numManagers("integer");
            }