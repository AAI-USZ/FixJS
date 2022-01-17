function($){
    'use strict';

    if(App.Settings.Debug.enabled) {
        if (window.addEventListener) {
            window.addEventListener("storage", _handleLocalStorage, false);
        } else {
            window.attachEvent("onstorage", _handleLocalStorage);
        };
    }

    if($('#error-dialog').length === 0) {
        var ed = document.createElement('div');
        $(ed).addClass('dialog').attr('id', 'error-dialog').attr('title', 'Server Error').css({width: '600px', height: '470px', display: 'none'}).appendTo('body');
        App.EM.trig('UI:new', ['error-dialog']);
    }

    var _cache = [],
    	_successCallback = null,
    	_useCache = false,
    	_isSilentAjax = false,
    	_cleanUpCache = false,

    	_ajaxParams = {
    		url: '',
    		type: 'POST',
    		data: {},
    		dataType: 'json',
    		beforeSend: function() {
    			App.Settings.ajaxResponders.startLoading();
    		},
    		error: function(jqXHR, textStatus, errorThrown) {
    		    App.Settings.ajaxResponders.errorOccured(jqXHR, textStatus, errorThrown, this.url);
    		    _cache[_ajaxParams.url] = false;
    		    return false;
    		},
    		success: function(response) {
    		    App.Settings.ajaxResponders.success();
    		    if(_cache[_ajaxParams.url] !== false) {
        			if(App.Settings.ajaxResponders.errorRequestProcessor(response, this.dataType)) {
                        _cache[_ajaxParams.url] = response;
            			if(typeof _successCallback == 'function') {
                            _successCallback(response);
                        }
                    }
                }
    		}
	    },

	    _handleLocalStorage = function(e) {
	        if (!e) {
	            e = window.event;
	        }
	        console.log('LocalStorage event: key: '+e.key+' old value: '+e.oldValue+', new value: '+e.newValue+', url: '+e.url+', ');
	    },

	    _produceAjaxRequest = function(callback) {
	        if(typeof callback == 'function') {
                _successCallback = callback;
            }
            if(_useCache) {
                if(_cache[_ajaxParams.url] !== undefined) {
                    if(typeof _successCallback == 'function') {
                        _successCallback(_cache[_ajaxParams.url]);
                        return true;
                    }
                }
            }
            return $.ajax(_ajaxParams);
	    },

	/*
	 * Ajax Processor
	 * ---------------------------------
	 */
	ajaxProcessor = {
		Data: function(data) {
	    	_ajaxParams.data = data;
	    	return this;
	    },
	    ResponseType: function(dataType) {
	    	_ajaxParams.dataType = dataType;
	    	return this;
	    },
	    ExtraParams: function(params) {
	        $.extend(_ajaxParams, params);
	        return this;
	    },
	    UseCache: function(val) {
	        _useCache = val;
	        return this;
	    },
	    /**
	     * arguments[0] = url,
	     * arguments[1] = callback/silent
	     * arguments[2] = callback
	     */
	    Post: function() {
	        _ajaxParams.url = arguments[0];
	        _ajaxParams.type = 'POST';
	        // Only callback
	        if(arguments.length == 2) {
	           _isSilentAjax = false;
               _produceAjaxRequest(arguments[1]);
            }
            // Callback and silent mode switcher
	        if(arguments.length == 3) {
	           _isSilentAjax = arguments[1];
	           _produceAjaxRequest(arguments[2]);
	        }
	        return this;
	    },
	    Get: function() {
            _ajaxParams.url = arguments[0];
            _ajaxParams.type = 'GET';
            // Only callback
            if(arguments.length == 2) {
               _isSilentAjax = false;
               _produceAjaxRequest(arguments[1]);
            }
            // Callback and silent mode switcher
            if(arguments.length == 3) {
               _isSilentAjax = arguments[1];
               _produceAjaxRequest(arguments[2]);
            }
            return this;
        },
        GetCache: function() {
            return _cache;
        },
        DropCache: function() {
            _cache = new Array();
            return this;
        }
	},
	
	/*
	 * LocalStorage Processor
	 * ---------------------------------
	 */
	localProcessor = {
		Set: function(key, val) {
            if(localStorage) {
                localStorage.setItem(key, val);
                return this;
            } else {
                throw 'Browser do not support `localStorage`';
            }
        },
        Get: function(key) {
            if(localStorage) {
                if(localStorage.length) {
                    return localStorage.getItem(key);
                } else {
                    throw 'No data for this domain';
                }
            } else {
                throw 'Browser do not support `localStorage`';
            }
        },
        DropVal: function(key) {
            if(localStorage) {
                localStorage.removeItem(key);
                return this;
            } else {
                throw 'Browser do not support `localStorage`';
            }
        },
        Clear: function() {
            if(localStorage) {
                localStorage.clear();
                return this;
            } else {
                throw 'Browser do not support `localStorage`';
            }
        }
	},
	
	/*
     * SessionStorage Processor
     * ---------------------------------
     */ 
    sessionStorageProcessor = {
        Set: function(key, val) {
            if(sessionStorage) {
                sessionStorage.setItem(key, val);
                return this;
            } else {
                throw 'Browser do not support `sessionStorage`';
            }
        },
        Get: function(key) {
            if(sessionStorage) {
                if(sessionStorage.length) {
                    return localStorage.getItem(key);
                } else {
                    throw 'Your `sessionStorage` is empty';
                }
            } else {
                throw 'Browser do not support `sessionStorage`';
            }
        },
        DropVal: function(key) {
            if(sessionStorage) {
                sessionStorage.removeItem(key);
                return this;
            } else {
                throw 'Browser do not support `sessionStorage`';
            }
        },
        Clear: function() {
            if(sessionStorage) {
                sessionStorage.clear();
                return this;
            } else {
                throw 'Browser do not support `sessionStorage`';
            }
        }
    }
	
    /*
     * Storage public interface
     * ---------------------------------
     */
    return {
    	Ajax: ajaxProcessor,
    	Local: localProcessor,
    	Session: sessionStorageProcessor
    }

}