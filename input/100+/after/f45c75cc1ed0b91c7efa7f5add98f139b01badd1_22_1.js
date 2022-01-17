function () {
            this.primaryKey("id");
            this.firstname("string", {length:20, allowNull:false});
            this.lastname("string", {length:20, allowNull:false});
            this.midinitial("char", {length:1});
            this.position("integer");
            this.gender("char", {size : 1});
            this.street("string", {length:50, allowNull:false});
            this.city("string", {length:20, allowNull:false});
        }