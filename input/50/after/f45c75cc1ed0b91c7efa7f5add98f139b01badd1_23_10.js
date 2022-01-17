function (Employee) {
                Employee.update({firstname:"dougie"}, {id:emp.id});
                return Employee.filter({id:emp.id}).one();
            }