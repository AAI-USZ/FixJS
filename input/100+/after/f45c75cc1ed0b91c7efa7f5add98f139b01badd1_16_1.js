function () {
                this.primaryKey("id");
                this[underscore ? "first_name" : "firstname"]("string", {size:20, allowNull:false});
                this[underscore ? "last_name" : "lastname"]("string", {size:20, allowNull:false});
                this[underscore ? "mid_initial" : "midInitial"]("char", {size:1});
                this.position("integer");
                this.gender("char", {size : 1});
                this.street("string", {size:50, allowNull:false});
                this.city("string", {size:20, allowNull:false});
                this.foreignKey(underscore ? "company_id" : "companyId", "company", {key:"id", onDelete:"cascade"});
            }