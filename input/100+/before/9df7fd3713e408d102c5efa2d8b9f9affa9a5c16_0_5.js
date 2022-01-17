function (resp) {

                    var _doc = editor._getDoc(), el, html, imgId, title = '', desc = '', //

                        err = 'Error returned from Youtube API. ', //

                    //tpl = '<a href="http://youtu.be/{id}" class="ajax ytplay ttt" rev="{id}" title="{t}"><img src="/images/play.png" alt="Youtube video" width="44px" height="44px"/></a>';

                        tpl = '<a href="http://youtu.be/{id}" class="ajax ytlink ttt" rev="{id}" title="{t}"><img src="http://i.ytimg.com/vi/{id}/default.jpg" alt="YouTube video" width="120px" height="90px"/></a>';

                    tpl += '<a href="http://youtu.be/{id}" class="ajax ytplay ttt" rev="{id}" title="{t}"><img src="/images/play.png" alt="Play" width="44px" height="44px"/></a>';



                    if (resp.error) {

                        if (resp['error']['message']) {

                            err += resp['error']['message'];

                            alert(err);

                            return;

                        }

                    } else {



                        imgId = resp['data']['id'];

                        if (resp['data'] && resp.data['title']) {

                            title = resp.data['title'];

                        }

                        if (resp['data'] && resp.data['description']) {

                            desc = resp.data['description'];

                        }



                        el = editor._swapEl(editor.currentElement[0], 'div', function (el) {



                            //el.removeAttribute('style');

                            // 

                            //var bg = 'url( "http://i.ytimg.com/vi/'+imgId+'/default.jpg" )';

                            //YAHOO.util.Dom.setStyle(el, 'background', bg);



                            YAHOO.util.Dom.addClass(el, 'ajax');

                            YAHOO.util.Dom.addClass(el, 'ytvideo');

                            YAHOO.util.Dom.setStyle(el, 'width', '120px');

                            YAHOO.util.Dom.setStyle(el, 'height', '90px');

                            YAHOO.util.Dom.setStyle(el, 'min-height', '90px');

                            YAHOO.util.Dom.setStyle(el, 'margin-bottom', '5px');



                        });



                        html = Y.Lang.sub(tpl, {id:imgId, t:title});

                        el.innerHTML = html;

                        el.parentNode.appendChild(_doc.createElement("br"));

                        editor.focus();

                        editor.closeWindow();

                        editor.get('panel').syncIframe();

                    }

                }