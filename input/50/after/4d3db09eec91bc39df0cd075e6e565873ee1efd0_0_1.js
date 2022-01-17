function(create_err, customer) {
                stripe.customers.update(customer.id, {
                    description: "test",
                    card: { number: "4242424242424242",
                            exp_month: 12,
                            exp_year:  2020,
                            name: "T. Ester"
                    }
                }, this.callback);
            }