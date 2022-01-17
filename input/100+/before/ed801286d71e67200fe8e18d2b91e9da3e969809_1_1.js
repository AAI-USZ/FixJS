function() {
            var self = this,
                targets = self.get('target'),
                radio = self.get('radio');
            $(radio).each(function(value, key) {
                value.hide();
                $(targets[key]).show();
            })
            //self.set('radio',[]);// = null;
            return self;
        }