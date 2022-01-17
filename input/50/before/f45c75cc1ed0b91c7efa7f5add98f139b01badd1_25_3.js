function (emp) {
            emp.name = "Manager " + i++;
            emp.numStaff = emp.staff.length;
            if (emp instanceof Executive) {
                emp.numManagers = 0;
            }
            return emp.update();
        }