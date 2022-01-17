function(targetNode, tipContent, width, opt) {

            opt = opt || {};



            if(targetNode) opt.targetNode = targetNode;

            if(tipContent) opt.tipContent = tipContent;

            if(width) opt.width = width;



            this.destroy();



            var that = this;

            var CONFIG = that._updateCONFIG(opt);

            var GUID = that.get('GUID');

            var self = Y.one('#J_Tooltip_' + GUID);

            var body = Y.one('body');

            var isIE6 = Y.UA.ie == 6;

            var template = Y.Lang.sub(!isIE6 ? CONFIG.TPL : CONFIG.IE6TPL, CONFIG);

            var targetNode = CONFIG.targetNode;

            var className = CONFIG.className;

            var positionType = CONFIG.positionType;

            var position = CONFIG.position.split(',');

            var referenceHorizons = CONFIG.referenceHorizons;

            var targetNode = CONFIG.targetNode;

            var hoverSupport = CONFIG.hoverSupport;

            var animation = CONFIG.animation;

            var always = CONFIG.always;

            var closeNode = CONFIG.closeNode;

            var confirmNode = CONFIG.confirmNode;

            var arrowNode = self && self.one('em');

            var arrowWidth, arrowHeight;

            var targetWidth, targetHeight;

            var selfWidth, selfHeight;

            var selfPosition = {};

            var arrowPosition = {};

            var targetPosition;

            var viewportRegion = Y.DOM.viewportRegion(referenceHorizons);

            var horizonMargin, verticalMargin;

            var _window = Y.one(window);



            var touchDimension = function() {

                arrowWidth = arrowNode.get('region').width;

                arrowHeight = arrowNode.get('region').height;

                targetWidth = targetNode.get('region').width;

                targetHeight = targetNode.get('region').height;

                selfWidth = self.get('region').width;

                selfHeight = self.get('region').height;

                targetPosition = targetNode.getXY();



                // white margin initial



                horizonMargin = arrowWidth / 2.5;

                verticalMargin = arrowHeight / 2.5;

            };

            

            if(!self) {

                body.append(template);

                self = Y.one('#J_Tooltip_' + GUID);

                arrowNode = self.one('em');

                that._updateCONFIG({self: self});

            }



            self.removeClass('hidden');



            that._isHidden = null;

            that._timer && clearTimeout(that._timer);



            // update CONFIG to store self [ Node instance ]



            that._updateCONFIG({self: self});



            // setup the maxHeight, if contentHeight higher than tipBox,

            // then made it scrollable, and set it's height by maxHeight.



            var contentNode = self.one('.content-box');

            var contentWidth = contentNode.get('region').width;

            var contentHeight = contentNode.get('region').height;



            if(CONFIG.maxHeight && contentHeight > CONFIG.maxHeight) {

                contentNode.setStyles({

                    height: CONFIG.maxHeight,

                    overflowY: 'scroll',

                    overflowX: 'hidden'

                });

            }



            // hover support



            if(hoverSupport) {

                self.detach('hoverSupport');



                self.on('hoverSupport|mouseover', function() {

                    that._isMouseHover = true;

                });



                self.on('hoverSupport|mouseout', function() {

                    that._isMouseHover = false;

                });

            }



            // reset tooltip classname



            var resetStyles = function() {

                self.removeClass(className + '-up');

                self.removeClass(className + '-down');

                self.removeClass(className + '-left');

                self.removeClass(className + '-right');

                self.setStyles({top: null, left: null});

                arrowNode.removeClass('tooltip-arrow-up');

                arrowNode.removeClass('tooltip-arrow-down');

                arrowNode.removeClass('tooltip-arrow-left');

                arrowNode.removeClass('tooltip-arrow-right');

                arrowNode.removeClass('tooltip-arrow-horizontal-left');

                arrowNode.removeClass('tooltip-arrow-horizontal-right');

                arrowNode.setStyles({top: null, left: null});

            };



            resetStyles();



            /*

                NODE

                ^

                -------

                | TIP |

                -------

            */



            if(positionType === 0) {



                var horizonAnalyze = function(position) {



                    var selfOffset = Number(position[0].match(/(\w+)(.*)/i)[2]);

                    var arrowOffset = Number(position[1].match(/(\w+)(.*)/i)[2]);

                    position = position.slice();

                    position[0] = position[0].match(/(\w+)(.*)/i)[1];

                    position[1] = position[1].match(/(\w+)(.*)/i)[1];



                    if(Y.Lang.trim(position[0]) === 'center' || Y.Lang.trim(position[0]) === 'auto') {

                        selfPosition.left = targetPosition[0] - (selfWidth - targetWidth) / 2;

                        selfPosition.top = targetPosition[1] + targetHeight + arrowHeight;

                        if(selfOffset) selfPosition.left += selfOffset;

                    }



                    if(Y.Lang.trim(position[0]) === 'left') {

                        selfPosition.left = targetPosition[0];

                        selfPosition.top = targetPosition[1] + targetHeight + arrowHeight;

                        if(selfOffset) selfPosition.left += selfOffset;

                    }



                    if(Y.Lang.trim(position[0]) === 'right') {

                        selfPosition.left = targetPosition[0] - (selfWidth - targetWidth);

                        selfPosition.top = targetPosition[1] + targetHeight + arrowHeight;

                        if(selfOffset) selfPosition.left += selfOffset;

                    }



                    if(Y.Lang.trim(position[1]) === 'center') {

                        arrowPosition.left = (selfWidth - arrowWidth) / 2;

                        if(arrowOffset) arrowPosition.left += arrowOffset;

                    }



                    if(Y.Lang.trim(position[1]) === 'left') {

                        arrowPosition.left = horizonMargin;

                        if(arrowOffset) arrowPosition.left += arrowOffset;

                    }



                    if(Y.Lang.trim(position[1]) === 'right') {

                        arrowPosition.left = selfWidth - arrowWidth - horizonMargin;

                        if(arrowOffset) arrowPosition.left += arrowOffset;

                    }



                    if(Y.Lang.trim(position[1]) === 'auto') {

                        if(Y.Lang.trim(position[0]) === 'left') {

                            arrowPosition.left = (targetWidth - arrowWidth) / 2;

                            if(selfOffset) arrowPosition.left -= selfOffset;

                            if(arrowOffset) arrowPosition.left += arrowOffset;

                        }



                        if(Y.Lang.trim(position[0]) === 'right') {

                            arrowPosition.left = (targetWidth - arrowWidth) / 2 + selfWidth - targetWidth;

                            if(selfOffset) arrowPosition.left -= selfOffset;

                            if(arrowOffset) arrowPosition.left += arrowOffset;

                        }



                        if(Y.Lang.trim(position[0]) === 'center' || Y.Lang.trim(position[0]) === 'auto') {

                            arrowPosition.left = (selfWidth - arrowWidth) / 2;

                            if(selfOffset) arrowPosition.left -= selfOffset;

                            if(arrowOffset) arrowPosition.left += arrowOffset;

                        }

                    }



                    if(selfPosition.top + selfHeight > viewportRegion.bottom || always === 'down') {

                        if(always != 'up') {

                            selfPosition.top = targetPosition[1] - selfHeight - arrowHeight;

                            self.replaceClass(className + '-up', className + '-down');

                            arrowNode.replaceClass('tooltip-arrow-up', 'tooltip-arrow-down');

                        }

                    }

                };



                self.replaceClass(className + '-down', className + '-up');

                arrowNode.replaceClass('tooltip-arrow-down', 'tooltip-arrow-up');

                arrowNode.replaceClass('tooltip-arrow-horizontal-right', 'tooltip-arrow-horizontal-left');



                touchDimension();

                horizonAnalyze(position);



                if(selfPosition.left + selfWidth > viewportRegion.right) {

                    horizonAnalyze(['right' , position[1]]);

                }



                if(selfPosition.left < viewportRegion.left) {

                    horizonAnalyze(['left' , position[1]]);

                }



                if(arrowPosition.left > selfWidth - arrowWidth) {

                    horizonAnalyze([position[0], 'center']);

                }



                if(arrowPosition.left < 0) {

                    horizonAnalyze([position[0], 'center']);

                }



                self.setStyles(selfPosition);

                arrowNode.setStyles(arrowPosition);

            }



            /*

                NODE <-------

                      | TIP |

                      -------

            */



            if(positionType === 1) {



                var verticalAnalyze = function(position) {



                    var selfOffset = Number(position[0].match(/(\w+)(.*)/i)[2]);

                    var arrowOffset = Number(position[1].match(/(\w+)(.*)/i)[2]);

                    position = position.slice();

                    position[0] = position[0].match(/(\w+)(.*)/i)[1];

                    position[1] = position[1].match(/(\w+)(.*)/i)[1];



                    if(Y.Lang.trim(position[0]) === 'middle' || Y.Lang.trim(position[0]) === 'auto') {

                        selfPosition.left = targetPosition[0] + targetWidth + arrowWidth;

                        selfPosition.top = targetPosition[1] - (selfHeight - targetHeight) / 2;

                    }



                    if(Y.Lang.trim(position[0]) === 'top') {

                        selfPosition.left = targetPosition[0] + targetWidth + arrowWidth;

                        selfPosition.top = targetPosition[1];

                        if(selfOffset) selfPosition.top += selfOffset;

                    }



                    if(Y.Lang.trim(position[0]) === 'bottom') {

                        selfPosition.left = targetPosition[0] + targetWidth + arrowWidth;

                        selfPosition.top = targetPosition[1] - (selfHeight - targetHeight);

                        if(selfOffset) selfPosition.top += selfOffset;

                    }



                    if(Y.Lang.trim(position[1]) === 'middle') {

                        arrowPosition.top = (selfHeight - arrowHeight) / 2;

                        if(arrowOffset) arrowPosition.top += arrowOffset;

                    }



                    if(Y.Lang.trim(position[1]) === 'top') {

                        arrowPosition.top = verticalMargin;

                        if(arrowOffset) arrowPosition.top += arrowOffset;

                    }



                    if(Y.Lang.trim(position[1]) === 'bottom') {

                        arrowPosition.top = selfHeight - arrowHeight - verticalMargin;

                        if(arrowOffset) arrowPosition.top += arrowOffset;

                    }



                    if(Y.Lang.trim(position[1]) === 'auto') {

                        if(Y.Lang.trim(position[0]) === 'top') {

                            arrowPosition.top = - arrowHeight / 2 + targetHeight / 2;

                            if(selfOffset) arrowPosition.top -= selfOffset;

                            if(arrowOffset) arrowPosition.top += arrowOffset;

                        }



                        if(Y.Lang.trim(position[0]) === 'bottom') {

                            arrowPosition.top = selfHeight - arrowHeight / 2 - targetHeight / 2;

                            if(selfOffset) arrowPosition.top -= selfOffset;

                            if(arrowOffset) arrowPosition.top += arrowOffset;

                        }



                        if(Y.Lang.trim(position[0]) === 'middle' || Y.Lang.trim(position[0]) === 'auto') {

                            arrowPosition.top = (selfHeight - arrowHeight) / 2;

                            if(selfOffset) arrowPosition.top -= selfOffset;

                            if(arrowOffset) arrowPosition.top += arrowOffset;

                        }

                    }



                    if(selfPosition.left + selfWidth > viewportRegion.right || always === 'right') {

                        if(always != 'left') {

                            selfPosition.left = targetPosition[0] - selfWidth - arrowWidth;

                            self.replaceClass(className + '-left', className + '-right');

                            arrowNode.replaceClass('tooltip-arrow-left', 'tooltip-arrow-right');

                            arrowNode.replaceClass('tooltip-arrow-horizontal-left', 'tooltip-arrow-horizontal-right');

                        }

                    }

                };



                self.replaceClass(className + '-right', className + '-left');

                arrowNode.replaceClass('tooltip-arrow-right', 'tooltip-arrow-left');

                arrowNode.replaceClass('tooltip-arrow-horizontal-right', 'tooltip-arrow-horizontal-left');



                touchDimension();

                verticalAnalyze(position);



                if(selfPosition.top + selfHeight > viewportRegion.bottom) {

                    verticalAnalyze(['bottom', position[1]]);

                }



                if(selfPosition.top < viewportRegion.top) {

                    verticalAnalyze(['top', position[1]]);

                }



                if(arrowPosition.top > selfHeight - arrowHeight) {

                    verticalAnalyze([position[0], 'middle']);

                }



                if(arrowPosition.top < 0) {

                    verticalAnalyze([position[0], 'middle']);

                }



                self.setStyles(selfPosition);

                arrowNode.setStyles(arrowPosition);

            }



            // added iframe shim for select bug under IE6



            if(isIE6) {

                that._addShim(self);

            }



            // bind event



            self.all('.tooltip-close').detach().on('customButton|click', that.close, that);

            self.all('.tooltip-confirm').detach().on('customButton|click', that.confirm, that);



            if(closeNode) self.all(closeNode).detach().on('customButton|click', that.close, that);

            if(confirmNode) self.all(confirmNode).detach().on('customButton|click', that.confirm, that);



            if(!that.resizeHandler) {

                that.resizeHandler = _window.on('resize', function() {

                    !that._isHidden && that.show();

                });

            }



            // animation



            if(animation && !isIE6) {

                var endFunction = function() {

                    if(that._isHidden) that.hide.apply(that, arguments);

                };



                var anim = animation(self, endFunction);



                anim.run();

            }



            return that;

        }