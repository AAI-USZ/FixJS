function (Employee) {
                Employee.update({firstname:"dougie"}, {id:24});
                return Employee.filter({id:24}).one();
            }