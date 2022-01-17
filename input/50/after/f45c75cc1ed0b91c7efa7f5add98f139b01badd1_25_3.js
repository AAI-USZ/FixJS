function (emp) {
            emp.name = "Manager " + i++;
            emp.numstaff = emp.staff.length;
            if (emp instanceof Executive) {
                emp.nummanagers = 0;
            }
            return emp.update();
        }