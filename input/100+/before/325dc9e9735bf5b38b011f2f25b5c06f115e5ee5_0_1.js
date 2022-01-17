function(){

            var $this = $(this).css('cursor','pointer');

            var dreamyTip;

            

            //delete title attribute to avoid the default behavior

            $this.attr('dtMsg',$this.attr('title'));

            $this.removeAttr('title');

            



            //get top position for the tooltip

            var getTop = function(offsetTop){

              var _theTop;

              if(_theTop<0 || opts.position == 'bottom'){

                  _theTop = offsetTop + $this.height();

              }else if(opts.position == 'left' || opts.position == 'right'){

                  _theTop = offsetTop + $this.outerHeight()/2 - dreamyTip.outerHeight()/2;

              }else{

                  _theTop = offsetTop - dreamyTip.outerHeight();

              }

              return _theTop;

            };

            

            //get left position for the tooltip

            var getLeft = function(offsetLeft){

              var newOffsetLeft;

              switch(opts.position){

                  case 'left':

                      newOffsetLeft = Math.abs(offsetLeft - dreamyTip.outerWidth()) - 5;

                      break;

                  case 'right':

                      newOffsetLeft = Math.abs(offsetLeft + Math.abs($this.outerWidth() - dreamyTip.outerWidth())) + 5;

                      break;

                  default:

                      newOffsetLeft = Math.abs(offsetLeft + $this.outerWidth()/2 - dreamyTip.outerWidth()/2);

                      break;

              }

              return newOffsetLeft;

            };

            

            //Outside events

            var clickOutsideOn = function (element){

                $('*:not(#' + element.selector + ')').bind( "click", disappear);

            } 



            var clickOutsideOff = function (element){

                $('*:not(#' + element.selector + ')').unbind( "click", disappear);

            }

            

            //show the tooltip

            var appear = function(){

                var _offset = $this.offset();

                dreamyTip.children('.dreamyTipInner').text($this.attr('dtMsg'));

                dreamyTip.css({

                      top: getTop(_offset.top),

                      left: getLeft(_offset.left),

                      zIndex: 10000,

                      display:'block'

                  }).animate({

                      opacity: opts.fade

                  }, opts.duration, opts.easing, function(){

                      eval(opts.callbackOnShow);

                      clickOutsideOn(dreamyTip);

                      $this._isOpen = true;

                  });

            };

            //hide the tooltip

            var disappear = function(){

                dreamyTip.animate({

                    opacity:0

                }, opts.duration, opts.easing, function(){

                    $(this).css({

                        zIndex:0,

                        display:'none'

                    });

                    eval(opts.callbackOnHide);

                    clickOutsideOff(dreamyTip);

                    $this._isOpen = false;

                });

            };

            //create the tooltip and add it to the DOM

            var createTip = function(){

                //get date and use it to set an unique id to the object

                var _id = new Date().getTime();

                if(opts.closeButton){

                    $('body').append('<div class="dreamyTip dt-' + opts.position + '" id="dreamyTip' + _id + '"><div class="dreamyTipBtn">x</div><div class="dreamyTipInner"></div></div>');

                    $('#dreamyTip' + _id + ' .dreamyTipBtn').bind('click', function(){

                        disappear();

                    });

                }else{

                    $('body').append('<div class="dreamyTip" id="dreamyTip' + _id + '"><div class="dreamyTipInner"></div></div>');

                }

                dreamyTip = $('#dreamyTip' + _id);

                if(opts.closeWithClick){

                    dreamyTip.bind('click', function(){

                        disappear();

                    });

                }

            };



            //event

            var toogleTooltip = function(){

                if($this._isOpen){

                    disappear();

                }else{

                    appear();

                }                    

            }

            if(opts.event=='hover'){

                $this.hover(

                  function () {

                    if(!dreamyTip){createTip()}

                    toogleTooltip();

                  }, 

                  function () {

                    toogleTooltip();

                  }

                );

            }else{

                $this.click(function(){

                  if(!dreamyTip){createTip()}

                  toogleTooltip();

                });

            }

        }