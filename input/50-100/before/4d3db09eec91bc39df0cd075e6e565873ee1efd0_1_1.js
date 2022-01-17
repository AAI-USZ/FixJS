function(plan_err, plan) {
                var d = new Date();
                stripe.customers.create({
                    email: "foo@example.com",
                    plan: plan.id,
                    card: { number: "4111111111111111",
                            exp_month: d.getMonth() + 1,
                            exp_year:  d.getFullYear() + 1,
                            name: "T. Ester"
                    }
                }, this.callback);
            }