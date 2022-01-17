function () {
            return DB.createTable("employee", function () {
                this.primaryKey("id");
                this.name(String);
                this.kind(String);
            });
        }