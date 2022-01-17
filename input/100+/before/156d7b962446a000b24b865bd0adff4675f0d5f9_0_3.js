function(Y) {



    var $ = Y.all,

        WRAP_TMPL = '<div class="placeholder" style="position: relative;display:' + (Y.UA.ie > 7 ? 'inline-block' : 'inline') + ';zoom:1;"></div>',

        TIP_TMPL = '<label style="display: none;position:absolute;left:0;top:0;">{tip}</label>',

        isSupport = 'placeholder' in document.createElement('input');

        

    function Placeholder(el, cfg) {

        if(isSupport) return;



        var self = this;

        var defaultCfg = {

            wrap:true

        };



        if(self instanceof placeholder) {

            var config = Y.merge(defaultCfg, cfg);

            self._init(el, config);

            return;

        }



        return new placeholder(el, cfg);

    };



    Y.extend(Placeholder, Y.Base, {

        _init: function(target, cfg) {

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



        },



        text: function(newTip) {

            this.triggerLabel.setContent(newTip);

        }

    });



    Y.Placeholder = Placeholder;



}, '1.0.0', {requires:['node', 'base', 'event', 'dom', 'anim']}