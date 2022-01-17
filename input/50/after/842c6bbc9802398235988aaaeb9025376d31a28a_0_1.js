function() {
        fn(context, function(res) {
          cur_waiter.resolve(id, res);
        });
    }