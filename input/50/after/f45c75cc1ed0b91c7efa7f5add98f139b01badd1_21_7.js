function (Employee) {
                Employee.update({firstName:"dougie"}, {id:emp.id});
                return Employee.filter({id:emp.id}).one();
            }