function () {

                    emp = new Employee({
                        firstname:"doug",
                        lastName:"martin",
                        position:21,
                        midInitial:null,
                        gender:"M",
                        street:"1 nowhere st.",
                        city:"NOWHERE"
                    });
                    return emp.save();
                }