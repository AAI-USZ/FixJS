function () {
                this.primaryKey("id");
                this.firstname("string", {size:20, allowNull:false});
                this.lastname("string", {size:20, allowNull:false});
                this.midinitial("char", {size:1});
                this.position("integer");
                this.gender("enum", {elements:["M", "F"]});
                this.street("string", {size:50, allowNull:false});
                this.city("string", {size:20, allowNull:false});
                this[useAt ? "updatedAt" : "updated"]("datetime");
                this[useAt ? "createdAt" : "created"]("datetime");
            }