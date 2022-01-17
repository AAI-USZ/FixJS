function(o) {
            $.each(req.result.receipts, function(index, value) {
                var parsed = receipt_json(value);
                // TODO: turn this into a template.
                list.find('dl')
                    .append('<dt data-receipt="' + value + '">'
                            + value.substring(0, 10) + '...</dt>'
                            + '<dd>'
                            + '<a href="#" class="verify" data-url="' + parsed.verify + '">'
                            + 'Naive verification</a> &middot; '
                            + 'status: <span class="status unknown">unknown</span> '
                            + '</dd>'
                            + '<dd>'
                            + '<a href="#" class="verify" data-url="http://django-receipts.herokuapp.com/receipts/receive">'
                            + 'Proxy verification</a> &middot; '
                            + 'status: <span class="status unknown">unknown</span> '
                            + '</dd>'
                            + '<dd>'
                            + '<a href="#" class="verify-mozmarket">'
                            + 'Recommended verification</a> &middot; '
                            + 'status: <span class="status unknown">unknown</span> '
                            + '</dd>'
                            );
                list.find('button').removeClass('hidden');
            });
        }