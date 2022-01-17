function() {
            stripe.token.create({
                card: { number: "4242424242424242",
                   exp_month: 1,
                   exp_year: 2021,
                   name: "J. Ester"
                },
                amount: 77
            }, this.callback);
        }