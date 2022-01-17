function (Employee) {
                    var ret = {};
                    ret.query1 = Employee.filter({id:ids.slice(0,6)}).all();
                    ret.query2 = Employee.filter(id.gt(ids[0]), id.lt(ids[5])).order("id").last();
                    ret.query3 = Employee.filter(function () {
                        return this.firstName.like(/first1[1|2]*$/);
                    }).order("firstName").all();
                    ret.query4 = Employee.filter({id:{between:[ids[0], ids[5]]}}).order("id").all();
                    ret.query5 = [];
                    Employee.filter(function () {
                        return this.id.gt(ids[5]);
                    }).forEach(function (emp) {
                            ret.query5.push(emp);
                        });
                    return ret;

                }