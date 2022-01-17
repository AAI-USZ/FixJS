function() {

        var cached = {};

        var guid = 0;

        var scriptPrefix = 'wbpscript';

        var ArrayProto = Array.prototype;

        var slice = ArrayProto.slice;

        var push = ArrayProto.push;

        var each = ArrayProto.forEach;

        var stk; //weibo框架

        var root;

        var rtrim = /^\s+|\s+$/g;



        var $ = function(selector, context) {

            return new $.prototype.init(selector, context);

        };



        //static method

        $.find = function(selector, context) {

            return (context || doc).querySelectorAll(selector);

        };



        $.create = function(tag) { //create element, with cache

            var el = cached[tag] || (cached[tag] = doc.createElement(tag));

            return $(el.cloneNode(false));

        };



        $.createText = function(content) {

            return doc.createTextNode(content);

        }



        $.trim = String.prototype.trim ? function(s) {

            return s != null ? s.trim() : '';

        } : function(s) {

            return s != null ? (s.replace(rtrim, '')) : '';

        };



        var keyRoot = 'weiboPlus.';

        if (!GM_getValue || (GM_getValue.toString && GM_getValue.toString().indexOf("not supported")>-1)) {

            $.get = function(name, defaultValue) {

                return localStorage.getItem(keyRoot + name) || defaultValue;

            };



            $.save = function(name, value) {

                localStorage.setItem(keyRoot + name, value);

                return this;

            };



            $.remove = function(name) {

                localStorage.removeItem(keyRoot + name);

                return this;

            }

        } else {

            $.get = function(name, defaultValue) {

                return GM_getValue(keyRoot + name, defaultValue);

            };



            $.save = function(name, value) {

                GM_setValue(keyRoot + name, value);

                return this;

            };



            $.remove = function(name) {

                GM_deleteValue(keyRoot + name);

                return this;

            }

        }



        $.addStyle = function() {

            if(GM_addStyle) {

                return function(css) {

                    GM_addStyle(css)

                    return this

                }

            } else {

                return function(css) {

                    $.create('style').prop({

                        'type' : 'text/style'

                    }).insert(head).html(css)

                    return this

                }

            }

        }();



        //简单模板，类似#T{abc}

        $.template = function(str, obj) {

            str = str.replace(new RegExp('#T{([^}]*?)}', 'g'), function(m, m1) {

                return obj[m1]

            })

            return str

        };



        //AJAX  不做过多考虑，只做基于GET的请求

        $.ajax = function(config) {

            if(GM_xmlhttpRequest) {

                $.ajax = function(config) {

                    GM_xmlhttpRequest(config)

                    return this

                }

            } else {

                $.ajax = function(config) {

                    var xhr = new XMLHttpRequest()

                    xhr.onreadystatechange = function() {

                        if(xhr.readyState == 4) {

                            if((xhr.status >= 200 && xhr.status < 300) || xhr == 304) {

                                config.onload();

                            }

                        }

                    }

                    xhr.open('get', config.url, true)

                    xhr.send(null)

                    return this

                }

            }

            $.ajax(config)

        };



        $.each = function(obj, fn) {

            var length = obj.length;

            if(typeof length != 'undefined') {

                for(var i=0; i<length; i++) {

                    if(fn.call(obj[i], i, obj[i]) === false) {

                        break;

                    }

                }

            } else {

                for(var i in obj) {

                    if(fn.call(obj[i], i, obj[i]) === false) {

                        break;

                    }

                }

            }

        };



        //instance method

        $.prototype = {

            constructor : $,



            init : function(selector, context) {

                context = context || body;

                selector = typeof selector == 'string' ? doc.querySelectorAll(selector, context) : [selector == null ? body : selector];

                this.context = context;

                this.previouseObj = this;

                push.apply(this, selector);

            },



            length : 0,



            eq : function(index) {

                index = +index;

                var sub = index  < 0 ? $(this[this.length + index]) : $(this[index]);

                sub.previousObj = this;

                return sub;

            },



            back : function() {

                return this.previousObj;

            },



            find : function(selector) {  //查找第一个元素的子元素

                var sub = $(selector, this[0]);

                sub.previousObj = this;

                return sub;

            },



            //CSS

            cssText : function(text) {

                if(typeof text == 'undefined') {

                    return this[0].style.cssText;

                } else {

                    $.each(this, function() {

                        this.style.cssText = text;

                    })

                    return this;

                }

            },

            //用于设置样式

            css : function(name, value) {

                if(typeof name == 'object') {

                    $.each(this, function(i, el) {

                        $.each(name, function(styleName, styleValue) {

                            el.style[styleName] = styleValue;

                        })

                    })

                } else {

                    this[0].style[name] = value;

                }

                return this;

            },



            addClassName : function(name) {

                var rclassname = new RegExp('\\b' + name + '\\b', 'g');

                $.each(this, function() {

                    !$(this).hasClassName(name) && (this.className += ' ' + name);

                })

                return this;

            },



            hasClassName : function(name) {

                return new RegExp('\\b' + name + '\\b').test(this[0].className);

            },



            removeClassName : function(name) {

                $.each(this, function() {

                    var className = this.className;

                    $(this).hasClassName(name) && (this.className = className.replace(new RegExp('\\b' + name + '\\b'), ''))

                })

                return this;

            },



            //prop

            prop : function(name, value) {

                if(typeof name == 'object') {

                    $.each(this, function(i, el) {

                        $.each(name, function(propName, propValue) {

                            el[propName] = propValue;

                        })

                    })

                    return this;

                } else {

                    if(typeof value == 'undefined') {

                        return this[0][name];

                    } else {

                        $.each(this, function() {

                            this[name] = value;

                        })

                        return this;

                    }

                }

            },



            val : function(value) {

                if(typeof value == 'undefined') {

                    return this.length && this[0].value;

                } else {

                    $.each(this, function() {

                        this.value = value;

                    })

                    return this;

                }

            },



            //DOM

            children : function(index) {

                var children = this[0].children;

                var len = children.length;

                index = index > len ? (index < 0 ? (len + index) : index) : index;

                return $(children[index]);

            },



            parent : function() {

                var parent = $(this[0].parentNode);

                parent.previousObj = this;

                return parent;

            },



            next : doc.head.nextElementSibling ? function() {

                var next = $(this[0].nextElementSibling);

                next.previousObj = this;

                return next;

            } : function() {

                var next = this[0];

                do {

                    next = next.nextSibling;

                } while(next && next.nodeType != 1)

                next = $(next);

                next.previousObj = this;

                return next;

            },



            append : function(child) {

                child = child.length && child.constructor == $ ? child[0] : child; //只操作第一个元素

                this[0].appendChild(child);

                return this;

            },



            insert : function(el) { //相当于el.appendChild

                el && (el.nodeType ? el : el[0]).appendChild(this[0]);

                return this;

            },



            insertAfter : function(el) {

                el && (el.nodeType ? el : el[0]).parentNode.insertBefore(this[0], $(el).next()[0]);

                return this;

            },



            insertBefore : function(el) {

                if(!el) return this;

                el = el.length ? el[0] : el;

                el.parentNode.insertBefore(this[0], el);

                return this;

            },



            //移除节点

            remove : function() {

                $.each(this, function() {

                    this.parentNode.removeChild(this);

                })

                return this;

            },



            html : function(value) {

                if(typeof value == 'undefined') {

                    return this[0] && this[0].innerHTML;

                } else {

                    $.each(this, function() {

                        this.innerHTML = value;

                    })

                    return this;

                }

            },



            text : function() {

                return this[0].textContent;

            },



            show : function(el) {

                el = el ? [el] : this;

                $.each(el, function() {

                    var tagName = this.tagName.toLowerCase(); //V标志位img标签，设置block会占据一行

                    this.style.display = tagName == 'img' ? '' : 'block';

                })

                return this;

            },



            hide : function(el) {

                el = el ? [el] : this;

                $.each(el, function() {

                    this.style.display = 'none';

                })

                return this;

            },



            pos : function() {

                return this[0].getBoundingClientRect();

            },



            //Event

            on : function(type, fn) {

                $.each(this, function() {

                    this.addEventListener(type, fn, false);

                })

                return this;

            },



            click : function(fn) {

                this.on('click', fn);

                return this;

            },

            //包含action-type的节点会触发事件函数

            delegate : function(type, fn) {

                this.on(type, function(e) {

                    var target = e.target;

                    var data;

                    while(target && target.nodeType == 1) {

                        e.actionType = target.getAttribute('action-type') || target['action-type'];

                        e.data = {};

                        data = target.getAttribute('action-data') || target['action-data'];

                        data && $.each(data.split('&'), function(i, v) {

                            var map = v.split('=');

                            e.data[map[0]] = map[1];

                        });

                        e.actionType && fn.call(target, e);

                        target = target.parentNode;

                    }

                })

                return this;

            }

        };



        $.prototype.init.prototype = $.prototype;



        // TODO

        (function() {

            var global = window || unsafeWindow;

            if (unsafeWindow) {

                // 非Chrome浏览器，优先使用unsafeWindow获取全局变量

                // 由于varname中可能包括'.'，因此使用eval()获取变量值

                $.global = function (name) {

                    return eval('unsafeWindow.' + name);

                };

            } else if(window) {

                $.global = function (name) {

                    return eval('window.' + name);

                };

            } else {

                // Chrome原生不支持unsafeWindow，脚本运行在沙箱中，因此不能访问全局变量。

                // 但用户脚本与页面共享DOM，所以可以设法将脚本注入host页

                // 详见http://voodooattack.blogspot.com/2010/01/writing-google-chrome-extension-how-to.html

                $.global = function (varname) {

                    // 生成脚本

                    var elem = $.create('script');

                    elem.prop({

                        id : scriptPrefix + (guid++),

                        type : 'text/javascript'

                    }).html('(function(){document.getElementById("' + elem.id + '").innerText=' + varname + '; }());');

                    $(doc.head).append(elem);

                    // 获取返回值

                    var ret = elem.html();

                    elem.remove();

                    elem = null;

                    return ret;

                };

            }

        })()

        //UI



        $.alert = function(text) {

            stk = $.global('STK');

            if(!stk || !stk.ui) {

                $.alert = function(text) {

                    alert(text.replace(/\<br(\/)?\>/g, '\n').replace(/\<(\/)?b?\>/g, ''));

                };

            } else {

                $.alert = stk.ui.alert;

            }

            $.alert(text);

        };

        $.confirm = function(text, config) {

            stk = $.global('STK');

            if(!stk || !stk.ui) {

                $.confirm = function(text, config) {

                    if(confirm(text.replace(/\<br(\/)?\>/g, '\n').replace(/\<(\/)?b\>/g, ''))) {

                        config && typeof config.OK == 'function' && config.OK();

                    }

                };

            } else {

                $.confirm = stk.ui.confirm;

            }

            $.confirm(text, config);

        }
        return $;

    }())
