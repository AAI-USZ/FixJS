function (Employee) {
                Employee.update({firstName:"dougie"}, {id:24});
                return Employee.filter({id:24}).one();
            }