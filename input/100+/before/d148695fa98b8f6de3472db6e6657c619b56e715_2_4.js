function(silent) {
        silent = (typeOf(silent) === 'undefined') ? false : silent;
        if (!silent) {
            this.data.push([]);
        }
        var ul = new Element('ul', {'class': 'frog-bucket'}).inject(this.element);
        var self = this;
        var idx = this.data.length - 1;
        var li = new Element('li');
        var input = new Element('input', {placeholder: "Search"}).inject(li);
        input.addEvent('keyup', function(e) {
            if (e.code === 13 && this.value !== "") {
                self._selectCallback(idx, {id: 0, name: this.value}, this);
            }
        })
        var completer = new Meio.Autocomplete(input, '/frog/tag/search', {
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
            onSelect: function(elements, value) {
                if (value !== "") {
                    self._selectCallback(idx, value, elements.field.node);
                }
            }
        });
        li.inject(ul);

    }