function(create_err, customer) {
                    console.log("customer for deletion", customer);
                    stripe.customers.del(customer.id, this.callback);
                }