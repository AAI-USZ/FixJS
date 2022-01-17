function (id) {
                this.message = "id must be 9 digits";
                return 100000000 <= id && id <= 999999999;
            }