function() {
            var self = this,
                elLabel,
                targets = self.get('target'),
                kfbtns = self.get('kfbtn'),
                findLabel = self.get('getLabelFunc');


            $(kfbtns).each(function(value, key) {
                value.hide();
                $(targets[key]).show();
                elLabel = findLabel ? findLabel($(targets[key])) : value.next('label');
                elLabel.detach('hover').detach('click');
            })
            //self.set('radio',[]);// = null;
            return self;
        }