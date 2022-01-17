function(create_err, customer) {
                stripe.customers.update(customer.id, {
                    description: "test",
                    card: { number: "4111111111111111",
                            exp_month: 12,
                            exp_year:  2020,
                            name: "T. Ester"
                    }
                }, this.callback);
            }