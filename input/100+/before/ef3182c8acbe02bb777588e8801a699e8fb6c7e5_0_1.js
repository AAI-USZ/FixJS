function (options) {
        
        // default settings
        _settings = $.extend({
            winId: null,
            width: 2/3,
            height: 3/4,
            minWidth: 200,
            minHeight: 200,
            title: 'Custom Window',
            appendTo: 'body',
            onopen: null,
            onclose: null,
            onresize: null,
            statusBar: true,
            resizeHandle: true,
            resizable: true,
            maximizable: true,
            minimizable: true
        }, options);
       
        var _root = $(_settings.appendTo);

        var arrayPageScroll = [parseInt($(document).scrollLeft(), 10), parseInt($(document).scrollTop(), 10)];
        var arrayViewPort = [parseInt(_root.width(), 10), parseInt(_root.height(), 10)];
                
        // ID UNIQUE
        var _uniqueID = (_settings.windId) ? _settings.windId : "customWindowID_" + (new Date().getTime());
        
        // HTML TEMPLATE
        var _customWindowHtml = '<div id="' + _uniqueID + '" class="customWindowContainer">';
        _customWindowHtml += '<div class="customWindowWidthResize"></div>';
        _customWindowHtml += '<div class="customWindowHeightResize"></div>';
        _customWindowHtml += '<div class="customWindowHead">';
        _customWindowHtml += '<span class="customWindowClose"></span>';
        _customWindowHtml += '<span class="customWindowRestore"></span>';
        if(_settings.maximizable) {
            _customWindowHtml += '<span class="customWindowMaximize"></span>';
        }
        if(_settings.minimizable) {
            _customWindowHtml += '<span class="customWindowMinimize"></span>';
        }
        _customWindowHtml += '<span class="customWindowTitle"></span>';
        _customWindowHtml += '<div style="clear: both"></div>';
        _customWindowHtml += '</div>';
        _customWindowHtml += '<div class="customWindowContent"></div>';
        if(_settings.statusBar) {
            _customWindowHtml += '<div class="customWindowStatus">';
            if(_settings.resizable && _settings.resizeHandle) {
                _customWindowHtml += '<span class="customWindowResize"></span>';
            }
            _customWindowHtml += '<div style="clear: both"></div>';
            _customWindowHtml += '</div>';
        } else if(_settings.resizable && _settings.resizeHandle) {
            _customWindowHtml += '<span class="customWindowResize"></span>';
            _customWindowHtml += '<div style="clear: both"></div>';
        }
        _customWindowHtml += '</div>';
            
        _root.append(_customWindowHtml);
                
        // OBJECT WINDOW ARRAY
        _wins[_uniqueID] = {};
                
        // WINDOW COMPONENT
        _wins[_uniqueID].container = $('#' + _uniqueID);
        _wins[_uniqueID].head = $('.customWindowHead', _wins[_uniqueID].container);
        _wins[_uniqueID].status = $('.customWindowStatus', _wins[_uniqueID].container);
        _wins[_uniqueID].content = $('.customWindowContent', _wins[_uniqueID].container);
        _wins[_uniqueID].title = $('.customWindowTitle ', _wins[_uniqueID].container);
        _wins[_uniqueID].resizeIcon = $('.customWindowResize ', _wins[_uniqueID].container);
        _wins[_uniqueID].resizeWidth = $('.customWindowWidthResize ', _wins[_uniqueID].container);
        _wins[_uniqueID].resizeHeight = $('.customWindowHeightResize ', _wins[_uniqueID].container);
        _wins[_uniqueID].closeIcon = $('.customWindowClose', _wins[_uniqueID].container);
        _wins[_uniqueID].restoreIcon = $('.customWindowRestore', _wins[_uniqueID].container);
        _wins[_uniqueID].minimizeIcon = $('.customWindowMinimize', _wins[_uniqueID].container);
        _wins[_uniqueID].maximizeIcon = $('.customWindowMaximize', _wins[_uniqueID].container);
                
        // SET SOME CSS DEFAULT
        _wins[_uniqueID].container.css({
                                    position: 'absolute',
                                    margin: '0px'
                                });
                
        _wins[_uniqueID].head.css({
                                margin: '0px',
                                border: '0px',
                                padding: '0px'
                            });
        
        _wins[_uniqueID].title.css({
                                cursor: 'default'
                            });
        
        _wins[_uniqueID].status.css({
                                margin: '0px',
                                border: '0px',
                                padding: '0px'
                            });
                
        _wins[_uniqueID].resizeIcon.css({
                                margin: '0px',
                                border: '0px',
                                padding: '0px'
                            });
                
        _wins[_uniqueID].resizeWidth.css({
                                position: 'absolute',
                                top: '0',
                                right: '0',
                                width: '3px',
                                height: '100%',
                                margin: '0px',
                                border: '0px',
                                padding: '0px'
                            });
                
        _wins[_uniqueID].resizeHeight.css({
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                width: '100%',
                                height: '3px',
                                position: 'absolute',
                                margin: '0px',
                                border: '0px',
                                padding: '0px'
                            });
                
        // IE6 fix for overflow auto bug
        if ($.browser.msie && $.browser.version < 7) {
            _wins[_uniqueID].content.css({
                                    margin: '0px',
                                    padding: '0px',
                                    border: '0px',
                                    overflow: 'auto',
                                    height: '1px',
                                    width: '100%'
                                });
        } else {
            _wins[_uniqueID].content.css({
                                    margin: '0px',
                                    overflow: 'auto',
                                    height: '1px',
                                    width: 'auto'
                                });
        }
                
        _wins[_uniqueID].restoreIcon.hide();
        
        if ($().corner) {
            _wins[_uniqueID].container.corner('top 4px');
        }
                
        // SET WINDOW WIDTH
        if (_settings.width > 100 && _settings.width < arrayViewPort[0]) {
            var width = parseInt(_settings.width, 10);
            _wins[_uniqueID].container.width(width);
        } else if (_settings.width > 0 && _settings.width < 1) {
            var width = parseInt(arrayViewPort[0] * _settings.width, 10);
            _wins[_uniqueID].container.width(width);
        } else {
            var width = parseInt(arrayViewPort[0] * (2/3), 10);
            _wins[_uniqueID].container.width(width);
        }
                
        // SET WINDOW HEIGHT
        if (_settings.height > 100 && _settings.height < arrayViewPort[1]) {
            var height = parseInt(_settings.height, 10);
            _wins[_uniqueID].container.height(height);
        } else if (_settings.height > 0 && _settings.height < 1) {
            var height = parseInt(arrayViewPort[1] * _settings.height, 10);
            _wins[_uniqueID].container.height(height);
        } else {
            var height = parseInt(arrayViewPort[1] * (3/4), 10);
            _wins[_uniqueID].container.height(height);
        }
                
        // SET CONTENT HEIGHT
        _wins[_uniqueID].containerHPad = _wins[_uniqueID].head.outerHeight(true) + _wins[_uniqueID].status.outerHeight(true) + (_wins[_uniqueID].content.outerHeight() - _wins[_uniqueID].content.height());
        _wins[_uniqueID].content.height(height - _wins[_uniqueID].containerHPad);
                
        // SET TOP AND LEFT POSITION
        var inFront = winBehind();
        if (inFront && _wins[inFront]) {
            var winTopPos = parseInt(_wins[inFront].container.css('top'), 10) + 35;
            var winLeftPos = parseInt(_wins[inFront].container.css('left'), 10) + 25;
        }
        
        if (!winTopPos && !winLeftPos) {
            var top = parseInt((arrayPageScroll[1] + ((arrayViewPort[1] - height) / 2)), 10);
            var left = parseInt((arrayPageScroll[0] + ((arrayViewPort[0] - width) / 2)), 10);
        } else if (winTopPos - arrayPageScroll[1] + height < arrayViewPort[1] && winLeftPos - arrayPageScroll[0] + width < arrayViewPort[0]) {
            var top = winTopPos;
            var left = winLeftPos;
        } else {
            var top = 0;
            var left = 0;
        }
        _wins[_uniqueID].container.css('top', top + 'px');
        _wins[_uniqueID].container.css('left', left + 'px');
                
        // SET TITLE
        if (_settings.title != '') _wins[_uniqueID].title.html(_settings.title);
        
        makeUnselectable('.customWindowTitle');
                
        // SET DRAG HANDLER
        _wins[_uniqueID].container.dragWindow({
                                        allowBubbling: false, 
                                        win: _uniqueID
                                    });
        _wins[_uniqueID].container.setDragHandler(_wins[_uniqueID].head);
                
        // SET RESIZE HANDLER
        
        if(_settings.resizable) {
            _wins[_uniqueID].container.resizeWindow({
                                                allowBubbling: false, 
                                                win: _uniqueID, 
                                                cursor: 'nw-resize',
                                                resizing: 'both',
                                                minWidth: _settings.minWidth, 
                                                minHeight: _settings.minHeight
                                            });
            _wins[_uniqueID].container.setResizeHandler(_wins[_uniqueID].resizeIcon);
            
            _wins[_uniqueID].container.resizeWindow({
                                                allowBubbling: false, 
                                                win: _uniqueID, 
                                                cursor: 'w-resize',
                                                resizing: 'width',
                                                minWidth: _settings.minWidth, 
                                                minHeight: _settings.minHeight
                                            });
            _wins[_uniqueID].container.setResizeHandler(_wins[_uniqueID].resizeWidth);
                    
            _wins[_uniqueID].container.resizeWindow({
                                                allowBubbling: false, 
                                                win: _uniqueID, 
                                                cursor: 'n-resize',
                                                resizing: 'height',
                                                minWidth: 200, 
                                                minHeight: 200
                                            });
            _wins[_uniqueID].container.setResizeHandler(_wins[_uniqueID].resizeHeight);
        }
        
        _wins[_uniqueID].container.bind('mousedown', function (e) {
                    if (!_wins[_uniqueID] || _wins[_uniqueID].min === true) return false;
                    
                    // set z-index
                    $(this).maxZIndex({ inc: 5, group: '.customWindowContainer' });
                    
                    setBehind(this.id);
                    
                    // Must return true to let events bubble. Otherwise it
                    // becomes impossible to interact with window content.
                    return true;
        });
        
        // WINDOW PARAM
        _wins[_uniqueID].width = width;
        _wins[_uniqueID].height = height;
        _wins[_uniqueID].top = top;
        _wins[_uniqueID].left = left;
        _wins[_uniqueID].containerWPad = _wins[_uniqueID].container.outerWidth() - _wins[_uniqueID].container.width()
        _wins[_uniqueID].heightMin = 1 + _wins[_uniqueID].head.outerHeight(true) + (_wins[_uniqueID].container.outerHeight() - _wins[_uniqueID].container.height());
        _wins[_uniqueID].min = false;
        _wins[_uniqueID].max = false;
                
        setBehind(_uniqueID);
        
        fixSelect();
        
        // SET CLOSE EVENT
        var closeWin = function (id) {
            if (!_wins[id]) return false;
            
            _wins[id].container.remove();
            
            if (typeof _settings.onclose === 'function'){
                _settings.onclose();
            }
            
            delete _wins[id];
            
            maxZIndex();
        };
        
        _wins[_uniqueID].closeIcon.bind('click', function (e) {
            
            closeWin(_uniqueID);
            
            fixSelect();
            
            return false;
        });
        
        // SET MINIMIZE EVENT
        var minimizeWin = function (id) {
            if (!_wins[id] || _wins[id].min === true) return false;
            
            var arrayPageScroll = [parseInt($(document).scrollLeft(), 10), parseInt($(document).scrollTop(), 10)];
            var arrayViewPort = [parseInt(_root.width(), 10), parseInt(_root.height(), 10)];

            var paddingBottom = parseInt(_root.css('padding-bottom'), 10);

            var theClone = _wins[id].container.clone();
            theClone.find('.customWindowContent').empty();
            
            _wins[id].min = true;
                    
            _isMinimize.push(id);
                    
            _wins[id].content.hide();
            _wins[id].status.hide();
            _wins[id].resizeIcon.hide();
            _wins[id].resizeWidth.hide();
            _wins[id].resizeHeight.hide();
            _wins[id].minimizeIcon.hide();
            _wins[id].closeIcon.hide();
            _wins[id].maximizeIcon.hide();
            _wins[id].restoreIcon.hide();
             
            _wins[id].container.css({
                                position: 'absolute',
                                top: null,
                                bottom: paddingBottom + 'px',
                                height: _wins[id].head.outerHeight() + 'px'
                            });
            
            var numMin = countMinimize();
            var step = parseInt((arrayViewPort[0] - ((_wins[id].containerWPad + 1) * numMin))  / numMin, 10);
            if (step > 200) step = 200;
            
            var desktop = function () {
                var i = 0;
                $.each(_isMinimize, function (key, value) {
                    if (typeof value === 'string') {
                        if (_wins[value].min === true) {
                            var newWidth = step + _wins[value].containerWPad;
                            var posL = (i) * (newWidth + 1);
                                
                            _wins[value].container.css({
                                                    left: posL + 'px',
                                                    width: step + 'px'
                                                });
                                
                            i++;
                        }
                    }
                });
            };
                    
            _wins[id].container.dragOff();
                    
            _wins[id].container.addClass('unselectWindow');
            
            _wins[id].container.hide();
            
            _root.append(theClone);
            theClone.animate({
                            height: _wins[id].head.outerHeight() + 'px',
                            width: step + 'px',
                            top: (arrayPageScroll[1] + arrayViewPort[1] - _wins[_uniqueID].heightMin - paddingBottom) + 'px',
                            left: ((numMin - 1) * (step + _wins[id].containerWPad + 1)) + 'px',
                            opacity: 0
                        }, {
                        duration: 'fast', 
                        complete: function () {
                                theClone.remove();
                                desktop();
                                _wins[id].container.show();
                                maxZIndex();
                            } 
                        });
        };
        
        _wins[_uniqueID].minimizeIcon.bind('click', function (e) {
            
            minimizeWin(_uniqueID);
            
            fixSelect();
                    
            return false;
                    
        });
                
        // SET MAXIMIZE EVENT
        var maximizeWin = function (id) {
            if (!_wins[id] || _wins[id].max === true) return false;
            
            var indexMinimize = $.inArray(id, _isMinimize);
            
            if (indexMinimize >= 0) _isMinimize.splice(indexMinimize, 1);
                    
            var arrayPageScroll = [parseInt($(document).scrollLeft(), 10), parseInt($(document).scrollTop(), 10)];
            var arrayViewPort = [parseInt(_root.width(), 10), parseInt(_root.height(), 10)];
            
            var paddingBottom = parseInt(_root.css('padding-bottom'), 10);
            
            var theClone = _wins[id].container.clone();
            theClone.find('.customWindowContent').empty();
            
            _wins[id].max = true;
            _wins[id].min = false;
            
            _wins[id].content.hide();
            _wins[id].status.show();
            _wins[id].minimizeIcon.show();
            _wins[id].closeIcon.show();
            _wins[id].maximizeIcon.hide();
            _wins[id].restoreIcon.show();
            _wins[id].resizeIcon.hide();
            _wins[id].resizeWidth.hide();
            _wins[id].resizeHeight.hide();
                                
            _wins[id].container.css({
                                        position: 'absolute',
                                        height: (arrayViewPort[1] - (_wins[id].container.outerHeight() - _wins[id].container.height())) + 'px',
                                        width: (arrayViewPort[0] - (_wins[id].container.outerWidth() - _wins[id].container.width())) + 'px',
                                        top: arrayPageScroll[1] + 'px',
                                        left: arrayPageScroll[0] + 'px'
                                    });
            
            var numMin = countMinimize();
                        
            var step = parseInt((arrayViewPort[0] - ((_wins[id].containerWPad + 1) * numMin))  / numMin, 10);
                        
            if (step > 200) step = 200;
                        
            var desktop = function (id) {
                var i = 0;
                $.each(_isMinimize, function (key, value) {
                    if (typeof value === 'string') {
                        if (_wins[value].min === true) {
                            var newWidth = step + _wins[value].containerWPad;
                            var posL = (i) * (newWidth + 1);
                                    
                            _wins[value].container.css({
                                                    left: posL + 'px',
                                                    width: step + 'px'
                                                });
                                
                            i++;
                        }
                    }
                });
            };
                        
            _wins[id].container.dragOff();
                    
            _wins[id].container.removeClass('unselectWindow');
            
            _wins[id].container.hide();
           
            _root.append(theClone);

            theClone.animate({
                            height: (arrayViewPort[1] - (_wins[id].container.outerHeight() - _wins[id].container.height()) - paddingBottom) + 'px',
                            width: (arrayViewPort[0] - (_wins[id].container.outerWidth() - _wins[id].container.width())) + 'px',
                            top: arrayPageScroll[1] + 'px',
                            left: arrayPageScroll[0] + 'px',
                            opacity: 0
                        }, {
                        duration: 'fast', 
                        complete: function () {
                                theClone.remove();
                                desktop();
                                _wins[id].container.show();
                                _wins[id].content.height(_wins[id].container.height() - _wins[id].containerHPad);
                                _wins[id].content.show();
                                setBehind(id);
                                if (typeof _settings.onresize === 'function'){
                                    _settings.onresize(_wins[id]);
                                }
                            } 
                        });
        };
        
        _wins[_uniqueID].maximizeIcon.bind('click', function (e) {
            
            maximizeWin(_uniqueID);
            
            fixSelect();
                    
            return false;
                    
        });
                
        // SET RESTORE EVENT
        var restoreWin = function (id) {
            if (!_wins[id]) return false;
            
            var indexMinimize = $.inArray(id, _isMinimize);
                
            if (indexMinimize >= 0) _isMinimize.splice(indexMinimize, 1);
                    
            if (_wins[id].min === true) {
                _wins[id].min = false;
                _wins[id].max = false;
                     
                _wins[id].content.show();
                _wins[id].status.show();
                _wins[id].maximizeIcon.show();
                _wins[id].closeIcon.show();
                _wins[id].minimizeIcon.show();
                _wins[id].restoreIcon.hide();
                _wins[id].resizeIcon.show();
                _wins[id].resizeWidth.show();
                _wins[id].resizeHeight.show();
                
                var theClone = _wins[id].container.clone();
                theClone.find('.customWindowContent').empty();
                
                _wins[id].container.css({
                                            position: 'absolute',
                                            top: _wins[id].top + 'px',
                                            bottom: null,
                                            left: _wins[id].left + 'px',
                                            width: _wins[id].width + 'px',
                                            height: _wins[id].height + 'px'
                                        });

                var numMin = countMinimize();
                        
                var step = parseInt((arrayViewPort[0] - ((_wins[id].containerWPad + 1) * numMin))  / numMin, 10);
                        
                if (step > 200) step = 200;
                        
                var desktop = function (id) {
                    var i = 0;
                    $.each(_isMinimize, function (key, value) {
                        if (typeof value === 'string') {
                            if (_wins[value].min === true) {
                                var newWidth = step + _wins[value].containerWPad;
                                var posL = (i) * (newWidth + 1);
                                        
                                _wins[value].container.css({
                                                        left: posL + 'px',
                                                        width: step + 'px'
                                                    });
                                    
                                i++;
                            }
                        }
                    });
                };
                        
                _wins[id].container.dragOn();
                
                _wins[id].container.hide();
                        
                _root.append(theClone);
                theClone.animate({
                                height:_wins[id].height + 'px',
                                width: _wins[id].width + 'px',
                                top: _wins[id].top + 'px',
                                left: _wins[id].left + 'px',
                                opacity: 0
                            }, {
                            duration: 'fast', 
                            complete: function () {
                                    theClone.remove();
                                    desktop();
                                    _wins[id].container.show();
                                    _wins[id].content.height(_wins[id].container.height() - _wins[id].containerHPad);
                                    _wins[id].content.show();
                                    setBehind(id);
                                } 
                            });
                
            } else if (_wins[id].max === true) {
                _wins[id].min = false;
                _wins[id].max = false;
                
                var theClone = _wins[id].container.clone();
                theClone.find('.customWindowContent').empty();

                _wins[id].content.hide();
                _wins[id].status.show();
                _wins[id].restoreIcon.hide();
                _wins[id].maximizeIcon.show();
                _wins[id].closeIcon.show();
                _wins[id].minimizeIcon.show();
                _wins[id].resizeIcon.show();
                _wins[id].resizeWidth.show();
                _wins[id].resizeHeight.show();
                     
                _wins[id].container.css({
                                            position: 'absolute',
                                            top: _wins[id].top + 'px',
                                            bottom: null,
                                            left: _wins[id].left,
                                            width: _wins[id].width + 'px',
                                            height: _wins[id].height + 'px'
                                        });
                    
                _wins[id].container.dragOn();
                
                _wins[id].container.hide();
                        
                _root.append(theClone);
                theClone.animate({
                                height:_wins[id].height + 'px',
                                width: _wins[id].width + 'px',
                                top: _wins[id].top + 'px',
                                left: _wins[id].left + 'px',
                                opacity: 0
                            }, {
                            duration: 'fast', 
                            complete: function () {
                                    theClone.remove();
                                    _wins[id].container.show();
                                    _wins[id].content.height(_wins[id].container.height() - _wins[id].containerHPad);
                                    _wins[id].content.show();
                                    if (typeof _settings.onresize === 'function'){
                                        _settings.onresize(_wins[id]);
                                    }
                                } 
                            });
                
                setBehind(id);
            }
        };
        
        _wins[_uniqueID].restoreIcon.bind('click', function (e) {
            
            restoreWin(_uniqueID);
            
            fixSelect();
                    
            return false;
                    
        });
        
        _wins[_uniqueID].head.bind('dblclick', function (e) {
            
            if (_wins[_uniqueID].min === true) {
                if (_wins[_uniqueID].max === true) {
                    _wins[_uniqueID].max = false;
                    maximizeWin(_uniqueID);
                } else {
                    restoreWin(_uniqueID);
                }
            } else {
                if (_wins[_uniqueID].max === true) {
                    restoreWin(_uniqueID);
                } else if (_settings.maximizable) {
                    maximizeWin(_uniqueID);
                }
            }
            
            fixSelect();
            
            return false;
        });
        
        if (typeof _settings.onopen === 'function'){
            _settings.onopen(_wins[_uniqueID].content, _wins[_uniqueID]);
        }
        
        // set a function to be called on resize event
        if (typeof _settings.onresize === 'function'){
            _wins[_uniqueID].container.onresize(_settings.onresize);
        }

        return {
                    container: _wins[_uniqueID].container,
                    head: _wins[_uniqueID].head,
                    status: _wins[_uniqueID].status,
                    resizeIcon: _wins[_uniqueID].resizeIcon,
                    title: _wins[_uniqueID].title,
                    closeIcon: _wins[_uniqueID].closeIcon,
                    minimizeIcon: _wins[_uniqueID].minimizeIcon,
                    maximizeIcon: _wins[_uniqueID].maximizeIcon,
                    restoreIcon: _wins[_uniqueID].restoreIcon,
                    content: _wins[_uniqueID].content,
                    'close': function () { closeWin(_uniqueID); },
                    minimize: function () { minimizeWin(_uniqueID); },
                    maximize: function () { maximizeWin(_uniqueID); },
                    restore: function () { restoreWin(_uniqueID); }
                };
                
    }