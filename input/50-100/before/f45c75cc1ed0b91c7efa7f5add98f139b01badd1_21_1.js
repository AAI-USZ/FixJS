function (Employee) {
                var emp = Employee.findById(1);
                emp.lastName = "martin";
                return emp.reload();
            }