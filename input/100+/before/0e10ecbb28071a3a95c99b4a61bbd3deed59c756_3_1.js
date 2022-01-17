function(res) {
                try {
                    var data = JSON.parse(res);
                    main.empty();
                    var el = recJSON(data);
                    el.inject(main);
                    
                }
                catch (e) {
                    main.set('html', res);
                }
            }