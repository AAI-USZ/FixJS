function(create_err, customer) {
                    stripe.customers.del(customer.id, this.callback);
                }