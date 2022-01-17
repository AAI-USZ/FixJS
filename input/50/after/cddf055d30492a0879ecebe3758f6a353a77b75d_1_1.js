function (name) {
                this.message = "name must be at least 3 characters";
                return name.length > 3;
            }