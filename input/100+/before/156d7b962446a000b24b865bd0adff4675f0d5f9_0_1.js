function() {

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

            }