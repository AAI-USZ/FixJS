function (table) {
                this.primaryKey("id");
                this[underscore ? "company_name" : "companyName"]("string", {size:20, allowNull:false});
                this.salary("double", {size:[20, 8], allowNull:false})
                this.foreignKey(underscore ? "employee_id" : "employeeId", "employee", {key:"id"});
            }