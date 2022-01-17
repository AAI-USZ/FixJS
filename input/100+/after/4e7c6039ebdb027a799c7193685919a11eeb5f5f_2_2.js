function(editor, url)

        {

            var me = this,

                innerSizeInit,

                container;

            

            me.editor = editor;

            // Register commands

            editor.addCommand('mceFullScreen', function()

            {

                var outer = me.editor.getContainer().getElementsByTagName('table')[0],

                    inner = me.editor.getContainer().getElementsByTagName('iframe')[0],

                    container = DOM.get(me.editor.editorContainer),

                    containerStyle = null;

                

                if(me.editor.fullscreen_is_enabled)

                {

                    DOM.win.setTimeout(function()

                    {

                        tinymce.dom.Event.remove(DOM.win, 'resize', me.resizeFunc);

                        DOM.setStyle(DOM.doc.body, 'overflow', editor.getParam('fullscreen_overflow'));

                        DOM.win.scrollTo(editor.getParam('fullscreen_scrollx'), editor.getParam('fullscreen_scrolly'));

                        DOM.setAttrib(container, 'style', containerStyle);

                        me.editor.fullscreen_is_enabled = false;

                        me.editor.theme.resizeTo(innerSizeInit.w, innerSizeInit.h);

                        me.editor.controlManager.setActive('fullscreen', false);

                    }, 10);

                    return;

                }

                

                me.editor.fullscreen_is_enabled = true;

                me.editor.controlManager.setActive('fullscreen', true);

                

                // save size of editor

                innerSizeInit = me.editor.dom.getSize(inner);

                

                // save old style

                containerStyle = DOM.getAttrib(container, 'style');

                

                DOM.setStyle(DOM.doc.body, 'overflow', 'hidden');

                vp = DOM.getViewPort();

                

                if(tinymce.isIE)

                    vp.h -= 1;

                

                DOM.win.scrollTo(0, 0);

                DOM.setStyles(container, {

                    'height': vp.h + 'px',

                    'width': vp.w + 'px',

                    'display': 'block',

                    'position': 'fixed',

                    'top': 0,

                    'left': 0,

                    'z-index': 200000

                });

                

                var outerSize = me.editor.dom.getSize(outer),

                    innerSize = me.editor.dom.getSize(inner);

                

                me.editor.theme.resizeTo(vp.w - outerSize.w + innerSize.w, vp.h - outerSize.h + innerSize.h);

                

                me.resizeFunc = tinymce.dom.Event.add(DOM.win, 'resize', function()

                {

                    var vp = tinymce.DOM.getViewPort();

                    if(tinymce.isIE)

                        vp.h -= 1;

                    DOM.setStyles(container, {

                        'height': vp.h + 'px',

                        'width': vp.w + 'px'

                    });

                    

                    var outerSize = me.editor.dom.getSize(outer),

                        innerSize = me.editor.dom.getSize(inner);

                    

                    me.editor.theme.resizeTo(vp.w - outerSize.w + innerSize.w, vp.h - outerSize.h + innerSize.h);

                });

            });

            

            // Register buttons

            editor.addButton('fullscreen', {

                title: 'fullscreen.desc',

                cmd: 'mceFullScreen'

            });

        }