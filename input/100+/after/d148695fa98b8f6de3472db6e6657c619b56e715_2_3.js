function() {
        this.input.addEvent('keyup', this.events.keyUp);
        new Meio.Autocomplete(this.input, '/frog/tag/search', {
            filter: {
                path: 'name',
                formatItem: function(text, data) {
                    if (data.id === 0) {
                        return '<span class="search"></span>' + data.name
                    }
                    else {
                        return '<span></span>' + data.name
                    }
                }
            },
            urlOptions: {
                extraParams: [{
                    name: 'search', value: true
                }]
            },
            requestOptions: {
                headers: {"X-CSRFToken": Cookie.read('csrftoken')},
            },
            onSelect: this.events.select
        });
    }