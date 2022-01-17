function(target, cfg) {

            var self = this;



            if(!target) {

                Y.log('[placeholder] has no target to decorate');

                return;

            }



            target = $(target);



            var placeHolderTip = target.getAttribute('placeholder');



            if(!placeHolderTip) return;



            var _decorate = function() {

                var str=Y.substitute(TIP_TMPL, {

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

                targetBox.appendTo(target.ancestor()).append(target);



                triggerLabel.insertBefore(target);



                Y.later(function() {

                    if(!target.get('value')) {

                        triggerLabel.show();

                    }

                },100);

            };



            target.on('focus', function(ev) {

                self.triggerLabel.hide();

            });



            target.on('blur', function(ev) {

                if(!target.get('value')) {

                    self.triggerLabel.show();

                }

            });



            _decorate();



        }