function() {

                var str=Y.Lang.sub(TIP_TMPL, {

                    tip: placeHolderTip

                });

                var triggerLabel = self.triggerLabel = Y.Node.create(str);

                triggerLabel.setStyle('width',target.getStyle('width'));



                if(target.getAttribute('id')) {

                    triggerLabel.getAttribute('for', target.getAttribute('id'));

                } else {

                    triggerLabel.on('click', function() {

                        target[0].focus();

                    });

                }

               

                var targetBox = Y.Node.create(WRAP_TMPL);

                target.each(function(_target) {

                    targetBox.appendTo(_target.ancestor()).append(_target);



                    _target.insert(triggerLabel, 'before');



                    Y.later(100, this, function() {

                        if(!_target.get('value')) {

                            triggerLabel.show();

                        }

                    });



                    _target.on('focus', function(ev) {

                        self.triggerLabel.hide();

                    });



                    _target.on('blur', function(ev) {

                        if(!_target.get('value')) {

                            self.triggerLabel.show();

                        }

                    });

                });

            }