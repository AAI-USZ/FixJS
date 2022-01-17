function (Employee) {
                    var ret = {};
                    ret.query1 = Employee.filter({id:[1, 2, 3, 4, 5, 6]}).all();
                    ret.query2 = Employee.filter(id.gt(5), id.lt(11)).order("id").last();
                    ret.query3 = Employee.filter(
                        function () {
                            return this.firstname.like(/first1[1|2]*$/);
                        }).order("firstname").all();
                    ret.query4 = Employee.filter({id:{between:[1, 5]}}).order("id").all();
                    ret.query5 = [];
                    Employee.filter(
                        function () {
                            return this.id.gt(15);
                        }).forEach(
                        function (emp) {
                            ret.query5.push(emp);
                        });
                    return ret;

                }