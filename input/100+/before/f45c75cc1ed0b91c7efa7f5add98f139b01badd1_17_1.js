function () {
        this.primaryKey("id");
        this[underscore ? "first_name" : "firstname"]("string", {size:20, allowNull:false});
        this[underscore ? "last_name" : "lastname"]("string", {size:20, allowNull:false});
        this[underscore ? "mid_initial" : "midinitial"]("char", {size:1});
        this.position("integer");
        this.gender("enum", {elements:["M", "F"]});
        this.street("string", {size:50, allowNull:false});
        this.city("string", {size:20, allowNull:false});
        this.bufferType(Buffer);
        this.textType("text");
        this.blobType("blob");
    }