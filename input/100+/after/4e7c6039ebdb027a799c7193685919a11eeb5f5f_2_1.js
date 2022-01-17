function()

                    {

                        tinymce.dom.Event.remove(DOM.win, 'resize', me.resizeFunc);

                        DOM.setStyle(DOM.doc.body, 'overflow', editor.getParam('fullscreen_overflow'));

                        DOM.win.scrollTo(editor.getParam('fullscreen_scrollx'), editor.getParam('fullscreen_scrolly'));

                        DOM.setAttrib(container, 'style', containerStyle);

                        me.editor.fullscreen_is_enabled = false;

                        me.editor.theme.resizeTo(innerSizeInit.w, innerSizeInit.h);

                        me.editor.controlManager.setActive('fullscreen', false);

                    }