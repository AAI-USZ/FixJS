function (store) {
        try {
            var visits = store.get('visits') || 0;
            visits = visits + 1;
            if (visits <= 10) {
                store.set('visits', visits);

                if (visits === 10) {
                    $('#social').modal();
                }
            }
        }
        catch (e) {};
    }