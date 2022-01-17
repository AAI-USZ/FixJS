function (Employee) {
                var emp = Employee.findById(1);
                emp.lastname = "martin";
                return emp.reload();
            }