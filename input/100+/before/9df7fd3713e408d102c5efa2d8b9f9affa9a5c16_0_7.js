f




        var YAHOO = Y.YUI2, //

            TTT2 = Y.all('.ttt2'),

            ttB, // Tooltip object

            ttB2, // Tooltip2 object for all the "sort" tabs

            oMetas = {}, // cache storage for resolved meta tags

            /**

             * Storage for already resolved

             * answers tab

             */

                loader, //

            getMeta, //

            setMeta, //

            getToken, //

            ensureLogin, //

            initTooltip, //

            getEditedText, //

            previewDiv, //

            preview, //

            MysubmitForm, //

            Editcat, //

            showDeleteForm, //

            showRetagForm, //

            showShredForm, //

            showCommentForm, //

            showCommentReplyForm, //

            addAdminControls, //

            checkExtApi, //

            showFlagForm, //

            showCloseForm, //

            codeButtons = {},

            initAutoComplete, //

            getAlerter, //

            isModerator, //

            isEditable, //

            initFBSignup, //

            Twitter, //

            showEditComment, //

            setToken, //

            getReputation, //

            isLoggedIn, //

            getViewerId, //

            oCTabs = {}, //

            foldGroup, //

            revealComments, //

            dnd = false, //

            res = Y.one('#body_preview'), //

            write = function (str) {

                var d = new Date();

                str += ' :: ' + d.toTimeString();

                if (res) {

                    res.set('innerHTML', str);

                }

            }, //

            /**

             * Template for

             * comment form and for

             * reply-to-comment form

             */

                tplComform = '<div id="comm_wrap_{divID}" class="fl cb{extraClass}">'

                + '<form action="{web_root}" id="add-comment-{formID}" class="comform" method="post">'

                + '<input type="hidden" name="a" value="addcomment">'

                + '<input type="hidden" name="rid" value="{resID}">'

                + '<input type="hidden" name="parentid" value="{parentID}">'

                + '<input type="hidden" name="token" value="{token}">'

                + '<table class="cb fr tbl_comment">'

                + '<tr><td width="60px" class="com_icons" valign="top"></td>'

                + '<td class="com_main">'

                + '<textarea name="com_body" cols="60" rows="3" class="com_bo" style="display: block; padding: 2px;"></textarea>'

                + '</td>'

                + '<td class="com_button" valign="top">'

                + '<input type="submit" name="doit" class="btn_comment" value="{comment}">'

                + '</td>'

                + '</tr>'

                + '{commentTip}'

                + '</table>'

                + '</form></div>',

            /**

             *

             */

                saveToStorage = function () {

                Y.StorageLite.on('storage-lite:ready', function () {

                    var tags, html = editor.saveHTML();

                    saveTitle();

                    saveTags();

                    Y.StorageLite.setItem(getStorageKey(), html);

                    write('Draft saved..');

                });

            }, //

            commentTip = '<tr><td></td><td colspan="2" class="lighttext">Enter at least 16 characters<br>Allowed mini-Markdown formatting: _italic_ and **bold**</td></tr>',

            eForm = Y.one('.qa_form'), //

            /**

             * Ask Form Textarea

             */

                eAskTA, //

            /**

             * Current reputation score

             * of viewer

             */

                reputation, //

            /**

             * id of current viewer

             */

                viewerId = null, // 

            /**

             * Flag indicates viewer is moderator (or admin)

             */

                bModerator = 1, //

            /**

             * Dom of Title input

             */

                eInputTitle, //

            /**

             * Dom of Tags input

             */

                eInputTags, //

            /**

             * Dom Div with instructions how to post tags

             */

                eTagsHint, //

            /**

             * Dom DIv with instructions how to post markdown

             */

                eBodyHint, //

            /**

             * Dom Div with hint on how to ask a question

             */

                eTitleHint,

            /**

             * Collection of elements that have com_hand class

             */

                aComHand, //

            /**

             * Object keeps track of votes for question. key is id, value number of

             * clicks we can limit up to 8 vote clicks per resource, then we will simply

             * NOT pass data to server.

             *

             */

                oVotes = {}, // 

            /**

             * YUI2 Editor object

             */

                editor, //

            /**

             * Facebook style alert modal

             *

             * Modal popup, usually contains some small

             * form or tools.

             * It usually should be closed onSuccess

             * of Ajax request

             */

                oAlerter, //

            /**

             * Array of loading masks widgets

             */

                loadingMasks = [], //



            getStorageKey = function () {

                var formName;

                if (!eForm) {

                    return null;

                }



                return eForm.get('name');

            }, //

            initTagInput = function (el) {

                /**

                 * Here is a quick fix to the TokenInput Autocomplete bug

                 * as per this instruction:

                 * http://yuilibrary.com/forum/viewtopic.php?f=101&t=7572

                 */

                Y.Plugin.TokenInput.prototype._afterBlur = function (e) {

                    var that = this;

                    if (this.get('tokenizeOnBlur')) {

                        setTimeout(function () {

                            that._tokenizeValue(null, null, {all:true});

                        }, 100);

                    }

                };



                /**

                 * @todo

                 * Use datasource instead to store key => array

                 * where key is first letter of tag, array is array from server

                 * but if keys does not exist then get it from server

                 * Then the source: has to be a function that would

                 * just extract first letter of query and use it

                 * to query datasorce object

                 * that datasource object will have

                 * all the config options to know

                 * the url where to get array of data

                 * if it does not exist.

                 */

                var input = (el) ? el : Y.one("#id_tags");

                if (input) {

                    Y.log('got id_tags');

                    Y.one(input).plug(Y.Plugin.TokenInput, {delimiter:' '})



                    /**

                     * AutoComplete plug is buggy when

                     * clicking of suggested values - it

                     * adds partially typed tag and also the whole

                     * suggested tag after that!

                     * Will wait on this one untill YUI3 fixes this

                     * bug.

                     */

                        .plug(Y.Plugin.AutoComplete, {

                            resultListLocator:'ac',

                            resultTextLocator:'tag',

                            resultFilters:'charMatch',

                            resultHighlighter:'charMatch',

                            source:'/index.php?a=taghint&q={query}&ajaxid=1&callback={callback}'

                        });

                }

            },

            /**

             * MiniMarkDown decode

             * Turn html back into mini markdown

             * @param string s

             * @return string with <strong> and <em> tags

             * replaced with their mini markdown code

             */

                mmdDecode = function (s) {

                //Y.log('got string to decode: ' + s);

                var bold, ret, em = /(\<em>|\<\/em>)/g;

                bold = /(\<strong>|\<\/strong>)/g;

                ret = s.replace(em, '_');

                //Y.log('ret: ' + ret, 'warn');

                ret = ret.replace(bold, '**');



                return ret;

            }, //

            /**

             * When user clicked in X icon

             * in enter youtube url widget

             * If still have placeholder

             * and it is empty then remove it.

             *

             *

             * OK

             */

                _handleWindowClose = function () {

                // this isEditor

                var el = this.currentElement[0];

                el = new Y.Node(el);

                if (el && el.hasClass('yui-media')) {

                    el.remove();

                }

                /**

                 * Clear value of "yourube url" input text

                 */

                Y.one("#embed_url").set('value', '');

                //Y.detach('youtube|*');

                Y.Event.purgeElement("#btn_addvideo");

                this.nodeChange();

            },

            /**

             * parseUri JS v0.1, by Steven Levithan (http://badassery.blogspot.com)

             * Splits any well-formed URI into the following parts

             * (all are optional)

             * @return array of url parts

             */

                parseUri = function (sourceUri) {

                var uriParts, i = 0, uri = {}, //

                    uriPartNames = ["source", "protocol", "authority", "domain", "port", "path", "directoryPath", "fileName", "query", "anchor"];



                uriParts = new RegExp("^(?:([^:/?#.]+):)?(?://)?(([^:/?#]*)(?::(\\d*))?)?((/(?:[^?#](?![^?#/]*\\.[^?#/.]+(?:[\\?#]|$)))*/?)?([^?#/]*))?(?:\\?([^#]*))?(?:#(.*))?").exec(sourceUri);



                for (i = 0; i < 10; i++) {

                    uri[uriPartNames[i]] = (uriParts[i] ? uriParts[i] : "");

                }



                // Always end directoryPath with a trailing backslash if a path was present in the source URI

                // Note that a trailing backslash is NOT automatically inserted within or appended to the "path" key

                if (uri.directoryPath.length > 0) {

                    uri.directoryPath = uri.directoryPath.replace(/\/?$/, "/");

                }



                return uri;

            },

            /**

             * Extract value of video ID from youtube url string

             * url is from the Youtube "Share" button

             * it may be in different formats - thanks Youtube

             */

                getYTVidId = function (url) {

                var myID, getID, path, a = parseUri(url), //

                    re = /(?:v=)([^&\?]*)(?:[&]*)/gi;

                path = a['path'];

                Y.log('1186 path: ' + path);

                if (path.length < 2 || (-1 === path.indexOf('/'))) {

                    return false;

                }



                path = path.substr(1);

                Y.log('1192 path: ' + path);

                /**

                 * Now path can be: 'watch' = old url, must extract

                 * from query string v=-Tb5w0rtRcA

                 * OR it will be actual video ID

                 * but ONLY if not contains ? or &

                 */



                if ('watch' !== path) {

                    if (/(\?|&)/.test(path)) {

                        Y.log('path contains &?');

                        return false;

                    }



                    return path;

                } else if (!a.hasOwnProperty('query') || !a['query'] || a['query'].length < 3) {

                    Y.log('no "query"');

                    return false;

                } else {



                    myID = re.exec(a['query']);

                    if (!myID || myID.length < 2 || myID[1].length < 1) {

                        Y.log('1212 unable to extract');

                        return false;

                    }



                    Y.log('1219 got vidID: ' + myID[1]);

                    return myID[1];

                }

            },

            /**

             * This function is fired when user

             * enters url of youtube video

             * in the add video EditorWindow - a small

             * modal window that appears when user clicks

             * on "Youtube" button on Editor.

             * This function precesses entered url of video,

             * extracts youtube video ID,

             * calls Youtube api, gets json back from API

             * and JSONP callback is executed which

             * replaces the placeholder div with

             * the new div and sticks thumbnail of video

             * linked to youtube video url (it will be handled

             * by onClick listener later, so clicking on it will

             * not take user to youtube but instead will replace thumb

             * with youtube player)

             *

             */

                parseYTInput = function () {



                var url, apiURL = 'http://gdata.youtube.com/feeds/api/videos/{id}?v=2&alt=jsonc&callback=', //

                    handleJSONP, imgId, //

                    myinput1 = (Y.one("#embed_url")) ? Y.one("#embed_url").get('value') : null;



                handleJSONP = function (resp) {

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

                };



                if (myinput1 && '' !== myinput1) {

                    imgId = getYTVidId(myinput1);

                    if (false === imgId) {

                        alert('URL of YouTube Video does not look correct');



                        return;

                    }



                    url = Y.Lang.sub(apiURL, {id:imgId});

                    url += '{callback}';

                    Y.jsonp(url, handleJSONP);

                }



            },

            /**

             * This function created EditorWindow

             * and subscribes the button in that window

             * to the onClick to execute parseYTInput

             */

                _handleMediaWindow = function () {



                var btn, win = new YAHOO.widget.EditorWindow('insertmedia', {

                    width:'415px'

                });



                // el is first HTMLBody // when double clicked then HTMLDivElement yui-media

                win.setHeader('Add YouTube Video');

                this.openWindow(win);

                // Y.on("youtube|click", parseYTInput, "#btn_addvideo");    

                Y.on("click", parseYTInput, "#btn_addvideo");

                this.on('afterOpenWindow', function () {

                    this.get('panel').syncIframe();

                }, this, true);



            },

            /**

             * MiniMarkDown decode

             * Turn html back into mini markdown

             * @param string s

             * @return string with <strong> and <em> tags

             * replaced with their mini markdown code

             */

                mmdEncode = function (s) {

                //Y.log('got string to decode: ' + s);

                var bold, ret, em = /(\<em>|\<\/em>)/g;

                bold = /(\<strong>|\<\/strong>)/g;

                ret = s.replace(em, '_');

                //Y.log('ret: ' + ret, 'warn');

                ret = ret.replace('/(\*\*)([^\*]+)(\*\*)/g', '<strong>\\2</strong>');



                return ret;

            }, //



            /**

             * Each question/answer is allowed up to 4 up and down votes, after that

             * user can click on votes buttons untill he's blue in the face, nothing

             * will be sent to server.

             *

             * @return bool true if limit has not been reached false if limit has been

             *         reached.

             */

                incrementVoteCounter = function (qid) {

                var ret;

                //Y.log('qid: ' + qid, 'warn');

                if (!oVotes.hasOwnProperty(qid)) {



                    oVotes[qid] = 1;



                } else {



                    oVotes[qid] = (oVotes[qid] + 1);



                }



                ret = (oVotes[qid] < 5);



                return ret;

            }, //



            /**

             * Get timezone offset based on user clock

             *

             * @return number of secord from UTC time can be negative

             */

                getTZO = function () {

                var tzo, nd = new Date();

                tzo = (0 - (nd.getTimezoneOffset() * 60));



                return tzo;

            }, //



            showLoading = function (node, header) {

                var target, box, label = (header) ? header : 'Loading...', width, height;

                if (!loader) {

                    loader = new Y.Overlay({

                        centered:true,

                        srcNode:"#loading",

                        width:"100px",

                        /*height:"60px",*/

                        headerContent:"Loading...",

                        bodyContent:"<img src='/images/loading-bar.gif'>",

                        zIndex:1000

                    });

                    Y.one("#loading").removeClass('hidden');

                    loader.render();

                }



                loader.set('headerContent', label);



                if (node && (node instanceof Y.Node)) {

                    loader.set("centered", node);

                } else {

                    Y.log('centering inside viewpoint ');

                    loader.set("centered", true);

                }

                loader.set("constrain", true);

                loader.show();

            },



            hideLoading = function (node) {

                //return;

                if (loader) {

                    loader.hide();

                }

            },

            /**

             * Start Login with FriendConnect routine

             *

             */

                initGfcSignup = function () {

                if ((typeof google === 'undefined') || !google.friendconnect) {



                    return;

                }



                google.friendconnect.requestSignIn();



                return;

            },

            /**

             * Record value of timestamp

             * when user views the question

             * store in Local Storage under key q-$qid_$uid

             * This way key is unique to question + user combination

             * value is the timestamp extracted from etag meta

             */

                storeReadEtag = function () {

                var sKey, uid, etag = getMeta('etag'), qid;



                if (etag) {

                    qid = getMeta('qid');

                    if (qid) {

                        uid = getViewerId();

                        etag = parseInt(etag, 10);

                        sKey = 'q-' + qid + '_' + uid;



                        Y.StorageLite.setItem(sKey, etag);

                    }

                }

            },

            /**

             * Add special class to Links

             * to Questions that have been read.

             * Or maybe not just special class?

             *

             *

             */

                setReadLinks = function () {

                var uid, eDivs, stored, oStorage = Y.StorageLite, eQlist = Y.one('.qlist');

                if (!eQlist) {

                    Y.log('1318 not on this page', 'warn');

                    return;

                }

                eDivs = eQlist.all('.qs');

                if (!eDivs || eDivs.size() === 0) {

                    Y.log('no divs .qs', 'warn');

                    return;

                }

                uid = getViewerId();



                eDivs.each(function () {

                    var qid, etag, stored, span;

                    qid = this.get('id');

                    etag = this.getAttribute('lampcms:i_etag');

                    stored = oStorage.getItem(qid + '_' + uid);



                    //Y.log('stored for key: ' +qid+ ' is: ' + Y.dump(stored), 'warn');

                    if (stored) {

                        //Y.log('have item for this question for this user: ' + stored);

                        if (stored === etag) {

                            //Y.log('this is read item ' + qid);

                            this.one('a.ql').addClass('read');

                            span = this.one('span.ru');

                            if (span) {

                                span.removeClass('unread');

                                span.addClass('read');

                                span.setAttribute('lampcms:ttt', 'No Unread Items. Click to toggle status');

                            }

                        }

                    }



                });

            },

            /**

             * User clicked on Read/Unread icon

             * must change css style of link

             * and update the StorageLite item

             * for this questionID

             */

                toggleRead = function (el) {

                var curStatus, qid, etag, qsDiv, uid = getViewerId(), link;

                curStatus = (el.test('.unread')) ? 'unread' : 'read';

                qsDiv = el.ancestor("div.qs");

                qid = qsDiv.get('id');

                link = qsDiv.one('a.ql');

                etag = qsDiv.getAttribute('lampcms:i_etag');

                etag = parseInt(etag, 10);

                sKey = qid + '_' + uid;

                if ('unread' === curStatus) {

                    link.removeClass('unread').addClass('read');

                    el.removeClass('unread').addClass('read').setAttribute('lampcms:ttt', 'No Unread items. Click to toggle status');

                    Y.StorageLite.setItem(sKey, etag);

                } else {

                    link.removeClass('read').addClass('unread');

                    el.removeClass('read').addClass('unread').setAttribute('lampcms:ttt', 'Unread items. Click to toggle status');

                    Y.StorageLite.removeItem(sKey);

                }

            },

            /**

             * Handle click on thumbup/thumbdown link

             *

             * @var object el YUI Node representing a vote link it has a href which

             *      already includes the correct ID of question or answer

             *

             */

                handleVote = function (el) {

                var request, id = el.get('id');



                switch (true) {

                    case el.test('.thumbupon'):

                        el.removeClass('thumbupon');

                        el.addClass('thumbup');

                        break;



                    case el.test('.thumbup'):

                        el.removeClass('thumbup');

                        el.addClass('thumbupon');

                        break;



                    case el.test('.thumbdownon'):

                        el.removeClass('thumbdownon');

                        el.addClass('thumbdown');

                        break;



                    case el.test('.thumbdown'):

                        el.removeClass('thumbdown');

                        el.addClass('thumbdownon');

                        break;

                }



                if (incrementVoteCounter(id)) {

                    request = Y.io(el.get('href'));

                }

            }, //

            makeYoutubePlayer = function (el) {

                var myAnim, div, id, url, player;

                div = el.ancestor("div");

                id = el.get("rev");

                player = '<iframe width="480" height="390" src="http://www.youtube.com/embed/' + id + '?rel=0" frameborder="0" allowfullscreen></iframe>';



                div.addClass('bg_black');

                myAnim = new Y.Anim({

                    node:div,

                    to:{

                        width:480,

                        height:390

                    }

                });



                myAnim.set('duration', 0.6);

                myAnim.set('easing', Y.Easing.easeOut);

                myAnim.on('end', function () {

                    myAnim.get('node').set('innerHTML', player);

                });



                myAnim.run();



            }, //

            /**

             * Handles click on "like comment" icon

             * Increases the likes count but only once

             * per user per comment

             *

             * @todo finish this to pass data to server

             */

                handleLikeComment = function (el) {

                var parent, likesdiv, likes, id = el.get('id');

                //Y.log('liked comment id: ' + id);

                if (el.test('.thumbupon')) {

                    //Y.log('already liked this comment');

                    return;

                }

                el.addClass('thumbupon');

                id = id.substr(7);

                //Y.log('processing like count for comment: ' + id);



                parent = el.ancestor("div");

                //Y.log('parent" ' + parent);

                likesdiv = parent.next(".c_likes");

                likes = likesdiv.get("text");



                likes = (!likes) ? 0 : parseInt(likes, 10);

                //Y.log('likes: ' + likes);

                likesdiv.set("text", (likes + 1));

                Y.io(getMeta('web_root') + '/likecomment/' + id);



            }, //

            /**

             * Show QuickReg modal window

             */

                getQuickRegForm = function () {

                oSL.getQuickRegForm();

            },

            /**

             * Use Facebook UI to initiate

             * promnt to post to user wall

             * an invitation to join this site

             */

                initFbInvite = function (target) {

                var siteTitle, siteUrl, siteDescription, caption;

                if (typeof FB === 'undefined') {

                    //Y.log('No FB object', 'error');

                    return;

                }



                siteTitle = getMeta('site_title');

                siteUrl = getMeta('site_url');

                siteDescription = target.get('title');

                caption = getMeta('site_description');

                //Y.log('target title: ' + siteDescription);

                FB.ui({

                    method:'stream.publish',

                    message:'I joined this site with Facebook Connect button. You should check it out too',

                    attachment:{

                        name:siteTitle,

                        caption:caption,

                        description:siteDescription,

                        href:siteUrl

                    },

                    action_links:[

                        {

                            text:siteTitle,

                            href:siteUrl

                        }

                    ],

                    user_message_prompt:'Invite your Facebook Friends to join this site'

                }, function (response) {

                });

            }, //

            /**

             * Handle form submit for

             * forms inside the alerter (FB Overlay)

             */

                handleModalForm = function (e) {

                var request, cfg, form = e.currentTarget;

                e.halt();

                cfg = {

                    method:'POST',

                    form:{

                        id:form,

                        useDisabled:true

                    }

                };

                oAlerter.hide();

                showLoading();

                request = Y.io('/index.php', cfg);

            },



            /**

             * Handle form submit

             * comment form

             */

                handleCommentForm = function (e) {

                //Y.log('handling handleCommentForm');



                var body, cfg, request, numChars, form = e.currentTarget;

                e.halt();

                e.preventDefault();

                //Y.log('handleModalForm el is: ' + form);



                body = form.one("textarea[name=com_body]");

                numChars = body.get("value").length;

                if (body && (numChars < 10 )) {

                    //Y.log('comment form body too short');

                    alert('Comment must be at least 10 characters long');

                    return;

                }

                if (body && (numChars > 600 )) {

                    alert('Comment must be at under 600 chars long. Please remove '

                        + (numChars - 600) + ' characters from your comment');

                    return;

                }



                cfg = {

                    method:'POST',

                    form:{

                        id:form,

                        useDisabled:true

                    }

                };

                if (oAlerter) {

                    oAlerter.hide();

                }

                showLoading(form.ancestor('div'));

                request = Y.io('/index.php', cfg);

            },

            /**

             * This function executes onClick on any element

             * with class 'ajax'

             */

                handleAjaxLinks = function (e) {

                var ancestor, //

                    id, //

                    res, //

                    rtype, //

                    restype, //

                    resID, //

                    fbappid, //

                    fbcookie, //

                    el = e.currentTarget,

                    target = e.target;

                Y.log('el is ' + el + ' id is: ' + el.get('id') + ' target: ' + target + ' tagName: ' + el.get('tagName'));

                id = el.get('id');

                //e.halt();

                //e.preventDefault();

                switch (true) {



                    case el.test('.qpages'):

                        if ('A' === e.target.get('tagName') && Y.one(".paginated")) {

                            e.halt();

                            handlePagination(e.target);

                        }

                        break;



                    case el.test('.ext_api'):

                        checkExtApi(el);

                        break;



                    case el.test('span.ru'):

                        toggleRead(el);

                        break;



                    case el.test('.vote'):

                        e.halt();

                        if (ensureLogin()) {

                            handleVote(el);

                        }

                        break;



                    case el.test('.c_like'):

                        e.halt();

                        if (ensureLogin()) {

                            handleLikeComment(el);

                        }

                        break;



                    case el.test('.ytlink'):

                    case el.test('.ytplay'):

                        e.halt();

                        makeYoutubePlayer(el);

                        break;



                    case el.test('.fbsignup'):

                        initFBSignup();

                        break;



                    case el.test('.gfcsignin'):

                        //Y.log('clicked gfcsignin');

                        initGfcSignup();

                        break;



                    case el.test('.twsignin'):

                        Y.log('clicked on twsignin.');

                        //Y.log('Twitter: ' + Twitter);

                        Twitter.startDance();

                        break;



                    case el.test('.add_tumblr'):

                        Y.log('clicked on .add_tumblr');

                        Twitter.startDance('/index.php?a=logintumblr', 680, 540);

                        break;



                    case el.test('.add_linkedin'):

                        Y.log('clicked on .add_linkedin');

                        Twitter.startDance('/index.php?a=loginlinkedin', 640, 480);

                        break;



                    case el.test('.add_blogger'):

                        Y.log('clicked on .add_blogger');

                        Twitter.startDance('/index.php?a=connectblogger', 680, 540);

                        break;



                    case el.test('.inreply'):

                        (function () {

                            var div, parentDiv, id = el.get('id');

                            id = id.substr(8);

                            Y.log('id: ' + id);

                            parentDiv = Y.one("#comment-" + id);

                            div = el.ancestor('div.com_wrap');

                            if (parentDiv) {

                                if (parentDiv.hasClass('parent_comment2')) {

                                    parentDiv.removeClass('parent_comment2');

                                    parentDiv.removeClass('parent_comment');

                                    if (div && div.hasClass('parent_comment2')) {

                                        div.removeClass('parent_comment2');

                                    }

                                } else {

                                    parentDiv.addClass('parent_comment2');

                                    if (div) {

                                        div.addClass('parent_comment2');

                                    }

                                }

                            }

                        })();

                        break;



                    case (id === 'gfcset'):

                        if ((typeof google !== 'undefined') && google.friendconnect) {

                            google.friendconnect.requestSettings();

                        }

                        break;



                    case (id === 'gfcinvite'):

                        //Y.log('clicked on gfcinvite.');

                        if ((typeof google !== 'undefined') && google.friendconnect) {

                            google.friendconnect.requestInvite();

                        }

                        break;



                    case (id === 'fbinvite'):

                        initFbInvite(el);

                        break;



                    case (id === 'twinvite'):

                        oTweet = oSL.tweet.getInstance();

                        oTweet.show();

                        break;



                    case( el.test('.change_image')):

                        if (Y.one("#avatar_upload")) {

                            Y.one("#avatar_upload").removeClass('pic_upload');

                        }

                        break;



                    case (id === 'logout'):

                        e.preventDefault();

                        e.halt();

                        showLoading(el);

                        fbappid = getMeta('fbappid');



                        if ((typeof FB !== 'undefined') && fbappid && FB.getAuthResponse()) {

                            FB.logout(function (response) {

                                Y.log('FB response ' + Y.dump(response));

                                fbcookie = "fbsr_" + fbappid;

                                Y.log('removing fbcookie: ' + fbcookie);

                                Y.Cookie.remove(fbcookie);

                                Y.log('FB Session after logout: ' + Y.dump(FB.getAuthResponse()), 'warn');

                                window.location.assign('/index.php?a=logout');

                            });



                        } else {

                            window.location.assign('/index.php?a=logout');

                        }

                        break;



                    case el.test('.flag'):

                        ancestor = el.ancestor("div.controls");



                        if (ancestor) {

                            restype = (ancestor.test('.question')) ? 'q' : 'a';

                            resID = ancestor.get('id');

                            resID = resID.substr(4);



                        } else {

                            ancestor = el.ancestor("div.com_flag");

                            if (ancestor) {

                                restype = 'c';

                                resID = el.get('id');

                                resID = resID.substr(6);

                            }

                        }



                        if (ancestor) {

                            showFlagForm({'rid':resID, 'rtype':restype});

                        }



                        break;



                    case el.test('.retag'):

                        ancestor = el.ancestor("div.controls");

                        if (ancestor) {

                            resID = ancestor.get('id');

                            resID = resID.substr(4);

                            showRetagForm(resID);

                        }



                        break;



                    case el.test('.sortans'):

                        e.halt();

                        getSortedAnswers(el);

                        break;



                    case el.test('.stick'):

                        window.location.assign('/index.php?a=stick&qid=' + getMeta('qid'));



                        break;



                    case el.test('.unstick'):

                        window.location.assign('/index.php?a=unstick&qid=' + getMeta('qid'));

                        break;



                    case el.test('.close'):

                        ancestor = el.ancestor("div.controls");

                        if (ancestor) {

                            resID = ancestor.get('id');

                            resID = resID.substr(4);

                            showCloseForm(resID);

                        }



                        break;



                    case el.test('.del'):

                        ancestor = el.ancestor("div.controls");

                        if (ancestor) {

                            resID = ancestor.get('id');

                            resID = resID.substr(4);



                            if (ancestor.test('.com_tools')) {

                                deleteComment(resID);

                            } else {

                                rtype = (ancestor.test('.question')) ? 'q' : 'a';

                                showDeleteForm({'rid':resID, 'rtype':rtype});

                            }

                        }



                        break;



                    case el.test('.edit'):

                        ancestor = el.ancestor("div.controls");

                        if (ancestor) {

                            e.halt();

                            e.preventDefault();

                            resID = ancestor.get('id');

                            resID = resID.substr(4);



                            if (ancestor.test('.com_tools')) {

                                if (!isEditable(ancestor)) {

                                    alert('You cannot edit comments that are older than ' + getMeta('comments_timeout') + ' minutes');

                                    return;

                                } else {

                                    showEditComment(resID);

                                }

                            } else {

                                restype = (ancestor.test('.question')) ? 'q' : 'a';

                                //Y.log('restype: ' + restype + ' resID: ' + resID);

                                window.location.assign('/index.php?a=edit&rid=' + resID + '&rtype=' + restype);

                            }

                        }

                        break;



                    case el.test('.com_link'):

                        e.preventDefault();

                        showCommentForm(el);

                        break;



                    case el.test('.com_reply_link'):

                        e.preventDefault();

                        showCommentReplyForm(el);

                        break;



                    case el.test('.btn_shred'):

                        if (ensureLogin()) {

                            showShredForm(el.get('id'));

                        }

                        break;



                    case el.test('.btnfollow'):

                        handleFollow(el);



                        break;



                }

            }, //

            /**

             * Handle click on one of the pagination links

             * First make sure that target is the links and has href property,

             * then make sure that We are on the page

             * that we currently support ajax-based pagination

             * If not then return false so default

             * event can take place.

             */

                handlePagination = function (el) {

                var href, qpages;

                qpages = el.ancestor("div.qpages");

                if (!el.hasAttribute('href')) {

                    //Y.log('723 no href');

                    return;

                }



                href = el.getAttribute('href');

                //Y.log('href: ' + href);

                if (qpages) {

                    showLoading(qpages);

                    Y.io(href);

                }

            },

            /**

             * Get block with answers

             * and replace the #answers div with it

             *

             * @todo if total ans not > per page

             * than just work with content that is already

             * on the page - no need to ask the server

             *

             * pre-cache results of tab content

             * and then reuse it - check if content exists first

             *

             */

                getSortedAnswers = function (el) {



                var href, curTab, curTabId, sortby = el.get('id'),

                    qid, //

                    qtype = Y.one("#qtypes"), //	

                    eTab = el.ancestor("div").next("div.sortable") || Y.one(".sortable");

                sortby = sortby.substr(5);

                Y.log('sortby: ' + sortby);

                if (el.test(".qtype_current")) {

                    Y.log('1818 Clicked on already current tab. No soup for you');

                    return;

                }

                /**

                 * curTab is tab that is currently set as 'current'

                 * not the one that triggered this event

                 */

                curTab = el.ancestor("div").one(".qtype_current");

                Y.log('curTab: ' + curTab);

                if (curTab) {

                    curTabId = curTab.get("id");

                    Y.log('1826 curTabId: ' + curTabId);

                    if (!oCTabs.hasOwnProperty(curTabId)) {

                        Y.log('1828 adding current contents of .paginated to oCAnsers');

                        Y.log('1835 next sortable eTab: ' + eTab);

                        oCTabs[curTabId] = eTab.getContent();

                        Y.log('1838 oCTabs[curTabId] now: ' + oCTabs[curTabId]);

                    }

                }

                /**

                 * First let's pre-cache contents of the current tab

                 * so that if user clicks back on this tab again at any time

                 * we will not have to ask the server for something

                 * we just had on the page

                 */



                el.siblings().removeClass('qtype_current');

                el.addClass('qtype_current');

                /**

                 * Check if there is already resolved

                 * cached data for this tab and reuse it

                 * if we got it, otherwise

                 * fetch it via XHR

                 */

                if (oCTabs.hasOwnProperty(sortby) && oCTabs[sortby].length > 0) {

                    Y.log('1856 Youth gots it already');

                    eTab.setContent(oCTabs[sortby]);

                    foldGroup.fetch();

                } else {

                    showLoading(eTab);

                    //Y.log('after setting form qid: ' + qid);

                    //qid = getMeta('qid'),

                    href = el.getAttribute('href');

                    Y.log('href: ' + href);

                   // href = ('#' === href) ? '/index.php?a=getanswers&qid=' + getMeta('qid') + '&sort=' + sortby : href;

                    href = ('#' === href) ? getMeta('web_root') + '/getanswers/' + getMeta('qid') + '/sort/' + sortby : href;

                    Y.io(href, {'arguments':{'sortby':sortby}});



                }

            },

            /**

             * Handles clicks on follow button

             *

             */

                handleFollow = function (el) {

                if (!ensureLogin()) {

                    return;

                }

                //Y.log('el: ' + el);

                el.removeClass('unfollow');

                var viewerDiv, title, controls, id, resID, ftype = 'q', follow = 'on', form, //

                    oLabels = {'q':'question', 'u':'user', 't':'tag'};

                resID = el.getAttribute('lampcms:follow');

                ftype = el.getAttribute('lampcms:ftype');

                viewerDiv = Y.one("#flwr_" + getViewerId());

                //Y.log('resID ' + resID  + ' ftype: ' + ftype);

                if (el.test('.following')) {

                    // check if viewer is trying to unfollow own question

                    controls = Y.one('#res_' + resID);

                    //Y.log('controls: ' + controls);

                    if (controls) {

                        //Y.log('got controls for qid: ' + resID);

                        if (controls.test('.uid-' + getViewerId())) {

                            if (!confirm('Are you sure you want to unfollow your own question?')) {

                                //Y.log('Unfollow cancelled');

                                el.one('span.icoc').removeClass('del').addClass('check');

                                el.one('span.flabel').set('text', 'Following');

                                return;

                            }

                        }

                    }

                    title = (ftype === 'u') ? 'Follow' : 'Follow this ' + oLabels[ftype];

                    el.removeClass('following').addClass('follow');

                    el.set('title', title);

                    el.one('span.icoc').removeClass('check').addClass('cplus');

                    el.one('span.flabel').set('text', title);

                    follow = 'off';



                    if (viewerDiv) {

                        viewerDiv.hide('fadeOut');

                    }



                } else {

                    title = 'You are following this ' + oLabels[ftype];

                    el.removeClass('follow').addClass('following');

                    el.set('title', title);

                    el.one('span.icoc').removeClass('cplus').removeClass('del').addClass('check');

                    el.one('span.flabel').set('text', 'Following');

                    follow = 'on';



                    if (viewerDiv) {

                        viewerDiv.show('fadeIn');

                    }

                }



                form = '<form name="form_f" action="'+ getMeta('web_root') + '">'

                    + '<input type="hidden" name="a" value="follow">'

                    + '<input type="hidden" name="ftype" value="' + ftype + '">'

                    + '<input type="hidden" name="follow" value="' + follow + '">'

                    + '<input type="hidden" name="f" value="' + resID + '">'

                    + '<input type="hidden" name="token" value="' + getToken() + '">';



                form = Y.one('body').appendChild(form);

                //Y.log('before setting form ');

                cfg = {

                    method:'POST',

                    form:{

                        id:form

                    }

                };



                //Y.log('after setting form ');

                request = Y.io('/index.php', cfg);

                //Y.log('request: ' + request);



                return;

            },

            /**

             * Handles mouseover event for any element

             * that has 'mo' class

             */

                handleOver = function (e) {

                Y.log('2133 hovering');

                var id, parent, el = e.currentTarget;

                switch (true) {

                    case el.test('.inreply'):

                        id = el.get('id');

                        id = id.substr(8);

                        Y.log('id: ' + id);

                        if (Y.one("#comment-" + id)) {

                            Y.one("#comment-" + id).addClass('parent_comment');

                        }

                        break;



                    case el.test('.following'):

                        if (!el.hasClass('unfollow')) {

                            el.addClass('unfollow');

                            el.one('span.icoc').removeClass('check').addClass('del');

                            el.one('span.flabel').set('text', 'Unfollow');

                        }



                        break;

                }



            }, //

            /**

             * Handles mouseleave from the

             * Follow button

             */

                handleOut = function (e) {

                var id, parent, el = e.currentTarget;

                switch (true) {

                    case el.test('.inreply'):

                        id = el.get('id');

                        id = id.substr(8);

                        Y.log('id: ' + id);

                        if (Y.one("#comment-" + id)) {

                            Y.one("#comment-" + id).removeClass('parent_comment');

                        }

                        break;



                    case (el.test('.following')):

                        el.removeClass('unfollow');

                        el.one('span.icoc').removeClass('dev').addClass('check');

                        el.one('span.flabel').set('text', 'Following');

                        break;

                }

            }, //

            /**

             * Remove hidden class from elements

             */

                revealHidden = function (e) {

                var els = (e) ? e.all('.reveal') : Y.all('.reveal');

                if (els) {



                    els.each(function () {

                        //Y.log('revealing stuff. this is: ' + this);

                        /**

                         * If element has class 'owner'

                         * this means it should be revealed only to the

                         * owner, in which case it must also

                         * have a class uid-{ownerID}

                         * where {ownerID} must match the ViewerID

                         */

                        if (this.test('.owner')) {

                            //Y.log('got owner class');

                            if (this.test('.oid-' + getViewerId())) {

                                //Y.log('got owner matched viewer, revealing');

                                this.removeClass('hidden');

                            }

                        } else {

                            //Y.log('no gots owner');

                            this.removeClass('hidden');

                        }

                    });

                }

            },





        // A function handler to use for successful requests:

            handleSuccess = function (ioId, o, args) {

                hideLoading();

                Y.log("args from Y.io: " + Y.dump(args));

                var data, target, paginated, scoreDiv, comDivID, eDiv, eRepliesDiv, sContentType = Y.Lang.trim(o.getResponseHeader("Content-Type"));

                if ('text/json; charset=UTF-8' !== sContentType) {

                    alert('Invalid Content-Type header: ' + sContentType);

                    return;

                }

                /**

                 * Check that we have o.responseText. Check that we have 'rcomment' in

                 * data after parsing json

                 *

                 */

                if (undefined === o.responseText) {

                    alert('No text in response');

                    return;

                }



                //Y.log('Content-Type: ' + sContentType, "info");

                //Y.log("The success handler was called.  Id: " + ioId + ".", "info", "example");



                /**

                 * Parse json find 'replies' div under the comments div if not already

                 * exists then create one and append under comments div append div from

                 * response to 'replies' div scroll into view visually animate it

                 * (maybe)

                 */

                try {

                    data = Y.JSON.parse(o.responseText);

                } catch (e) {

                    alert("Error parsing response object" + e + "<br>o.responseText: " + o.responseText);

                    return;

                }





                if (data.exception) {



                    if (data.type && 'Lampcms\\MustLoginException' === data.type) {

                        ensureLogin(true);

                    } else {

                        alert(data.exception);

                    }

                    //return;

                }





                if (data.alert) {

                    alert(data.alert);

                    //return;

                }



                if (data.success) {

                    alert(data.alert);

                    //return;

                }



                if (data.replace && data.replace.target && data.replace.content) {

                    Y.log('got something to replace in ' + data.replace.target);

                    Y.one("#" + data.replace.target).set('innerHTML', data.replace.content);

                    foldGroup.fetch();

                    initTooltip();

                    revealHidden();

                    //return;

                }





                if (data.reload) {

                    //Y.log('have data.reload');

                    if (data.reload > 0) {

                        Y.later(data.reload, this, function () {

                            window.location.reload(true);

                        });

                    } else {

                        window.location.reload(true);

                    }

                }



                if (data.formError) {

                    //Y.log('Form Error: ' + data.formError);

                    /**

                     * @todo write setFormError function to test if we have div with

                     *       form_err id then set its innerHTML otherwise just alert

                     *       error;

                     */

                    if (Y.one(".form_error")) {

                        Y.one(".form_error").set('innerHTML', data.formError);

                    } else {

                        alert(data.formError);

                    }



                    return;

                }



                if (data.formElementError) {

                    setFormError(data.formElementError);



                    return;

                }



                if (data.setmeta && data.setmeta.key && data.setmeta.val) {

                    setMeta(data.setmeta.key, data.setmeta.val);

                }



                if (data.paginated) {

                    paginated = Y.one(".paginated");

                    //Y.log('paginated: ' + paginated);

                    if (paginated) {

                        paginated.setContent(data.paginated);

                        /**

                         * Fire image loader again

                         * so content of newly downloaded div

                         * gets populated with images

                         */

                        foldGroup.fetch();

                        initTooltip();

                        return;

                    }

                }





                if (data.comment && data.comment.res && data.comment.html) {

                    Y.log('got comment: ' + Y.dump(data.comment));



                    /**

                     * If data.comment has id

                     * and div with comment-id exists

                     * then it is an edit,

                     * otherwise it is a new comment

                     */

                    if (data.comment.id && Y.one('#comment-' + data.comment.id)) {

                        //Y.log('this is an edit');

                        Y.one('#comment-' + data.comment.id).replace(data.comment.html);

                    } else {

                        /**

                         * If this was a reply

                         * then find the div with reply form

                         * and replace it with

                         * this new comment div

                         */

                        if (data.comment.parent && data.comment['parent'] > 0) {

                            if (Y.one('#comm_wrap_' + data.comment['parent'])) {

                                Y.one('#comm_wrap_' + data.comment['parent']).replace(data.comment['html']);

                            }

                        } else {

                            Y.one('#comm_wrap_' + data.comment.res).remove();

                            Y.one('#comments-' + data.comment.res).insert(data.comment.html, Y.one('#comments-' + data.comment.res).one('.add_com'));

                        }

                    }



                    return;



                }



                if (data.vote && data.vote.hasOwnProperty('v') && data.vote.rid) {

                    //Y.log(data.vote.rid);

                    scoreDiv = Y.one('#score' + data.vote.rid);

                    //Y.log('scoreDiv ' + scoreDiv);



                    if (scoreDiv) {

                        scoreDiv.set('innerHTML', data.vote.v);

                    }

                } else {



                    if (data.redirect || data.answer) {

                        Y.StorageLite.removeItem(getStorageKey());

                        removeTitle();

                        removeTags();

                        if (data.redirect) {

                            getAlerter('<h3>Success</h3>')

                                .set("bodyContent", 'Item saved! Redirecting to <br><a href="' + data.redirect + '">' + data.redirect + '</a>')

                                .show();



                            Y.later(1000, this, function () {

                                window.location.assign(data.redirect);

                            });

                        }



                        /**

                         * This is an answer table, append it to end of answers div

                         * @todo update answers count, change collor

                         * scrollIntoView

                         */

                        if (Y.one("#answers")) {

                            if (editor) {

                                editor.setEditorHTML('<br>');

                            }

                            Y.one("#answers").append(data.answer).scrollIntoView();

                            /**

                             * If Code editor is enable

                             * then run HighlightAll to highlight

                             * code inside the  newly added answer

                             */

                            if (typeof dp !== 'undefined') {

                                dp.SyntaxHighlighter.HighlightAll('code');

                            }

                        }

                    }

                }

            }, //

            /**

             * Save value of id_title input

             * to Storage

             */

                saveTitle = function () {

                var title = Y.one("#id_title");

                if (title) {

                    //Y.log('2201 saving title to storage: ' + title.get('value'), 'warn');

                    Y.StorageLite.setItem('title', title.get('value'));

                }

            }, //

            /**

             * Save value of "tags" from "tags" input to

             * Storage

             */

                saveTags = function () {

                var tags = Y.one("#id_tags");

                if (tags) {

                    Y.StorageLite.setItem('tags', tags.get('value'));

                }

            }, //

            /**

             * Remove 'title' key

             * from StorageLite

             * but only if id_title element

             * exists on page. This way it will not

             * be removed from the Answer page, only

             * from the Ask page.

             */

                removeTitle = function () {

                var title = Y.one("#id_title");

                if (title) {

                    Y.StorageLite.removeItem('title');

                }

            }, //

            /**

             * Remove 'tags' key from LocalStorage

             * but only if element with id id_tags

             * is on the page

             */

                removeTags = function () {

                var tags = Y.one("#id_tags");

                if (tags) {

                    Y.StorageLite.removeItem('nuts');

                }

            }, //

            /**

             * Set error message for the form element

             * The form should have div or span

             * with id name like 'formField_e'

             * where formField is the actual field like

             * 'title', so error div for title will be

             * title_d

             * If such div/span cannot be found, then

             * set form-wide error inside the div/span

             * with form_error class and if that cannot

             * be found then just show error in alert

             */

                setFormError = function (o) {

                var field, eErr;

                for (field in o) {

                    if (o.hasOwnProperty(field)) {

                        eErr = (Y.one("#" + field + "_e"));

                        if (eErr) {

                            //Y.log('got err: ' + eErr);

                            eErr.set('text', o[field]);

                        } else {

                            //Y.log('no element eErr, looking for .form_error');

                            eErr = Y.one(".form_error");

                            if (eErr) {

                                //Y.log('youth gots eFormErr: ' + eFormErr);

                                eErr.set('text', o[field]);

                            }

                        }



                        if (eErr) {

                            eErr.scrollIntoView();

                        } else {

                            alert(o[field]);

                        }

                    }

                }

            }, //



            handleFailure = function (ioId, o) {

                hideLoading();

                //Y.log("The failure handler was called.  Id: " + ioId + ".", "info", "example");

                alert('Error occured. Server returned status ' + o.status + ' response: ' + o.statusText);

            };



        // Subscribe our handlers to IO's global custom events:

        Y.on('io:success', handleSuccess);

        Y.on('io:failure', handleFailure);

        //Y.on('io:complete', hideLoading);



        /**

         * Submit question or answer form via ajax

         */

        MysubmitForm = function (e) {



            var request, cfg, mbody, title, tags, reason, form = e.currentTarget;



            title = form.one("#id_title");

            tags = form.one("#id_tags");

            reason = form.one("#id_reason");

            if (reason && (1 > reason.get("value").length)) {

                alert('You must include reason for editing');

                e.halt();

                return;

            }

            //



            mbody = getEditedText();

            /**

             * Replace attribute "codepreview" to "code" this way the final text

             * submitted to server will have "code" attribute. The reason for this

             * is that we have 2 types of code preview: one in preview div during

             * editing and another is actual content of the view question/answers

             * page.

             *

             * Since the HighlightAll executes every time the content of editor

             * changes we don't want this to also highlight the actual code on the

             * question/answers that are already on the page, thus we need 2

             * separate code previews

             */

            mbody = mbody.replace(/"codepreview"/g, '"code"');

            /**

             * Instead of saveHTML() which will do cleanHTML yet again and will mess

             * up our already cleaned body, we will just set the value of form's

             * qbody textarea to the mbody which we already have and it's alread

             * properly parsed, especially cleaned inside the 'pre' tags

             */

            form.one("textarea[name=qbody]").set("value", mbody);



            //Y.log('1117 mbody: ' + mbody);



            cfg = {

                method:'POST',

                form:{

                    id:form,

                    useDisabled:true

                }

            };



            if (Y.one("#dostuff") && Y.one("#dostuff").ancestor('div')) {

                showLoading(Y.one("#dostuff").ancestor('div'));

            }



            request = Y.io('/index.php', cfg);



            e.halt();

            return false;



        };



        var getYTbutton = function () {

            var ret = {type:'separator'};

            if ('1' == getMeta('btn_yt')) {

                ret = {

                    type:'push',

                    label:'Insert YouTube Video',

                    value:'insertmedia',

                    id:'btn_youtube'

                };

            }



            return ret;

        };



        var getCodeButton = function () {

            var ret = {type:'separator'};

            if (typeof dp !== 'undefined') {

                ret = {

                    group:'sourcecode',

                    label:'Code style',

                    buttons:[

                        {

                            type:'select',

                            label:'Select',

                            value:'codestyle',

                            disabled:true,

                            menu:[

                                {

                                    text:'None',

                                    value:'nocode',

                                    checked:true

                                },

                                {

                                    text:'JavaScript',

                                    value:'javascript'

                                },

                                {

                                    text:'HTML/XML',

                                    value:'xml'

                                },

                                {

                                    text:'CSS',

                                    value:'css'

                                },

                                {

                                    text:'Python',

                                    value:'python'

                                },

                                {

                                    text:'Ruby',

                                    value:'ruby'

                                },

                                {

                                    text:'PHP',

                                    value:'php'

                                },

                                {

                                    text:'C',

                                    value:'c'

                                },

                                {

                                    text:'C++',

                                    value:'cpp'

                                },

                                {

                                    text:'C#',

                                    value:'csharp'

                                },

                                {

                                    text:'Java',

                                    value:'java'

                                },

                                {

                                    text:'SQL',

                                    value:'sql'

                                },

                                {

                                    text:'VB',

                                    value:'vb'

                                },

                                {

                                    text:'Delphi',

                                    value:'delphi'

                                }



                            ]

                        }

                    ]



                };

            }



            return ret;

        };





        var makeEditor = function () {

            var codeButtons,

                btnSeparator = {type:'separator'};

            if (Y.one("#id_qbody") && Y.all('.com_hand').isEmpty()) {

                codeButtons = getCodeButton();



                /**

                 * Instantiate editor

                 */

                editor = new YAHOO.widget.Editor('id_qbody', {

                    dompath:false, // without dompath resize does not work

                    width:'660px',

                    height:'140px',

                    autoHeight:true,

                    extracss:'pre { margin-left: 10px; margin-right: 10px; padding: 2px; background-color: #EEE; } a.ytplay{position: absolute; display: block; height: 44px; width: 44px; top: 23px; left: 38px;} .yui-media { height: 90px; width: 120px; border: 1px solid black; background-color: #f2f2f2; background-image: url( "/images/media.gif" ); background-position: 45% 45%; background-repeat: no-repeat; }  .ytvideo {border: 1px solid black; cursor: pointer; position: relative; clear: both; margin-bottom: 5px;}',

                    animate:true,

                    toolbar:{

                        buttons:[

                            {

                                group:'saveclear',

                                label:'Save / New',

                                buttons:[

                                    {

                                        type:'push',

                                        label:'Save Draft',

                                        value:'save'

                                    },

                                    {

                                        type:'push',

                                        label:'New Document',

                                        value:'clear'

                                    }

                                ]

                            },

                            {

                                group:'textstyle',

                                label:'Font Style',

                                buttons:[

                                    {

                                        type:'push',

                                        label:'Bold CTRL + SHIFT + B',

                                        value:'bold'

                                    },

                                    {

                                        type:'push',

                                        label:'Italic CTRL + SHIFT + I',

                                        value:'italic'

                                    },

                                    {

                                        type:'push',

                                        label:'Underline CTRL + SHIFT + U',

                                        value:'underline'

                                    },

                                    {

                                        type:'push',

                                        label:'Strike Through',

                                        value:'strikethrough'

                                    }

                                ]

                            },

                            btnSeparator,

                            {

                                group:'blockquote',

                                label:'Quote',

                                buttons:[

                                    {

                                        type:'push',

                                        label:'Indent',

                                        value:'indent',

                                        disabled:true

                                    },

                                    {

                                        type:'push',

                                        label:'Outdent',

                                        value:'outdent',

                                        disabled:true

                                    }

                                ]

                            },

                            btnSeparator,

                            {

                                group:'indentlist',

                                label:'Lists',

                                buttons:[

                                    {

                                        type:'push',

                                        label:'Create an Unordered List',

                                        value:'insertunorderedlist'

                                    },

                                    {

                                        type:'push',

                                        label:'Create an Ordered List',

                                        value:'insertorderedlist'

                                    }

                                ]

                            },

                            btnSeparator,

                            codeButtons,

                            btnSeparator,

                            {

                                group:'insertitem',

                                label:'Link / Image',

                                buttons:[

                                    {

                                        type:'push',

                                        label:'HTML Link CTRL + SHIFT + L',

                                        value:'createlink',

                                        disabled:true

                                    },



                                    {

                                        type:'push',

                                        label:'Insert Image',

                                        value:'insertimage',

                                        disabled:false

                                    },

                                    getYTbutton()



                                ]

                            },

                            btnSeparator,

                            {

                                group:'undoredo',

                                label:'Undo/Redo',

                                buttons:[

                                    {

                                        type:'push',

                                        label:'Undo',

                                        value:'undo',

                                        disabled:true

                                    },

                                    {

                                        type:'push',

                                        label:'Redo',

                                        value:'redo',

                                        disabled:true

                                    }



                                ]

                            }

                        ]

                    }

                });



                /**

                 * Original code from YUI2 Editor has genocidal behaviour in

                 * Chrome. Replacing it now!

                 */

                editor.filter_safari = function (html) {

                    if (this.browser.webkit) {

                        //<span class="Apple-tab-span" style="white-space:pre">	</span>

                        html = html.replace(/<span class="Apple-tab-span" style="white-space:pre">([^>])<\/span>/gi, '&nbsp;&nbsp;&nbsp;&nbsp;');

                        html = html.replace(/Apple-style-span/gi, '');

                        html = html.replace(/style="line-height: normal;"/gi, '');

                        html = html.replace(/yui-wk-div/gi, '');

                        html = html.replace(/yui-wk-p/gi, '');



                        //Remove bogus LI's

                        html = html.replace(/<li><\/li>/gi, '');

                        html = html.replace(/<li> <\/li>/gi, '');

                        html = html.replace(/<li>  <\/li>/gi, '');

                        //Remove bogus DIV's - updated from just removing the div's to replacing /div with a break

                        if (this.get('ptags')) {

                            html = html.replace(/<div([^>]*)>/g, '<p$1>');

                            html = html.replace(/<\/div>/gi, '</p>');

                        }

                    }

                    return html;

                };



                editor.on('windowinsertmediaClose', function () {

                    _handleWindowClose.call(this);

                }, editor, true);



                editor.cmd_insertmedia = function () {

                    this.execCommand('insertimage', ''); // 'none'

                    var el = this._swapEl(this.currentElement[0], 'div', function (el) {

                        el.className = 'yui-media';

                        YAHOO.util.Dom.setStyle(el, 'fontSize', '100px');

                    });

                    this.currentElement = [el];

                    _handleMediaWindow.call(this);



                    return [false];

                };





                editor.on('toolbarLoaded', function () {



                    Y.log('2507 this is ' + this, 'warn'); // Editor



                    this.on('afterNodeChange', function (o) {

                        var ytbtn = this.toolbar.getButtonByValue('insertmedia'),

                            btn = this.toolbar.getButtonByValue('codestyle');

                        if (btn) {

                            if (this._hasSelection()) {

                                this.toolbar.enableButton(btn);

                            } else {

                                this.toolbar.disableButton(btn);

                            }

                        }



                        if (ytbtn) {

                            if (this._hasSelection()) {

                                this.toolbar.disableButton('insertmedia');

                            } else {

                                this.toolbar.enableButton('insertmedia');

                                var el = this._getSelectedElement();

                                el = new Y.Node(el);

                                if (el.hasClass('yui-media')) {

                                    this.toolbar.selectButton('insertmedia');

                                } else {

                                    this.toolbar.deselectButton('insertmedia');

                                }

                            }

                        }



                        preview();

                    }, this, true);



                    editor.toolbar.on('insertmediaClick', function () {

                        Y.log('this is: ' + this);

                        var el = editor._getSelectedElement();

                        Y.log('2618 el: ' + el);

                        if (YAHOO.util.Dom.hasClass(el, 'yui-media')) {

                            editor.currentElement = [el];

                            _handleMediaWindow.call(editor);

                            return false;

                        }

                    }, this, true);



                    this.on('editorKeyUp', function () {

                        preview();

                    });





                    /**

                     * Handler for codeselectClick event Desired result: If selected

                     * element is NOT

                     *

                     * 'pre' then create element pre and set its innterHTML and

                     * replaceChild on parent, same way the editor handles 'b' element!

                     *

                     * If, however the parent is &lt;pre&gt; then we run 'deselect'

                     * routine which will have to replace the &lt;pre&gt; with contents

                     * of its innerHTML

                     *

                     * @todo may have to experiment with currentSelection and range

                     *       objects instead, then work with just html strings and

                     *       offset and length from range.

                     *

                     * Firefix handles selections like shit. It wraps each line inside

                     * the pre tags and then removes name=&quot;code&quot; from every

                     * line after first occurance.

                     *

                     */

                    editor.toolbar.on('codestyleClick', function (ev) {

                        Y.log('2606 codestyleClick', 'warn');

                        var escaped, //

                            html, //

                            sel = this._getSelection(), //

                            newEl, //

                            el = editor._getSelectedElement(), //

                            codetype = ev.button.value.toLowerCase();



                        Y.log('2613 sel: ' + sel.toString(), 'warn');

                        /**

                         * Need to escape html to turn html

                         * into entities! otherwise html is just html tags

                         *

                         * Super important to call toString() because sel is an object

                         * and without calling toString it will modify

                         * the Actual object and everything

                         * will get messed up down the line!

                         */

                        escaped = Y.Escape.html(sel.toString());

                        Y.log('2619 escaped: ' + escaped, 'warn');

                        /**

                         * Case 1. User selected nocode and was inside the pre element.

                         * This means we must de-pre the selection

                         *

                         * Case 2. User selected the code style while inside the pre

                         * element. In this case we must change the 'className' or the

                         * pre element 'el'

                         *

                         * Case 3. User selected the code outside of the pre element. In

                         * this case we must create the new pre element and set its

                         * className and set selection as innerHTML

                         *

                         * @todo if changing from pre to not-pre then we need to replace

                         *       spaces with &nbsp; and line breaks with <br>

                         *       tags, otherwise they are lost instantly and its

                         *       impossible to change back to pre - it will all be one

                         *       line Must find a function that does that. I think

                         *       cleanHTML actually does this! none of the built in

                         *       filters seem to work. Probably the swapTag() is the one

                         *       that messes everything up and strips all whitespaces

                         *       and linebreaks and then it's too late to fix it as all

                         *       formatting is gone

                         *

                         */

                        switch (true) {

                            case ('nocode' === codetype && editor._isElement(el, 'pre')):

                                Y.log('2641 element is turning to nocode ', 'warn');

                                editor._swapEl(el, 'code');

                                html = editor.getEditorHTML();

                                html = html.replace(/<code([^>]*)>/gi, '');

                                html = html.replace(/<\/code>/gi, '');

                                editor.setEditorHTML(html);

                                break;



                            case (editor._isElement(el, 'pre')):

                                Y.log('2651 element is pre ', 'warn');

                                el.className = codetype;

                                break;



                            default:

                                Y.log('2657 default - wrapping in pre tag ', 'warn');

                                editor.execCommand('inserthtml', '<pre alt="codepreview" class="' + codetype + '">' + escaped + '</pre>');

                        }



                        return false;



                    }, this, true);



                    /**

                     * Listen to "Clear" button click

                     */

                    editor.toolbar.on('clearClick', function () {

                        if (confirm('Are you sure you want to reset the Editor?')) {

                            editor.setEditorHTML('<br>');

                            write('Editor content cleared..');

                        }

                    });

                    editor.toolbar.on('saveClick', saveToStorage);

                });



                editor.on('windowRender', function () {

                    var body = document.createElement('div');

                    body.innerHTML = '<p>Paste Link to YouTube Video here:</p>';

                    body.innerHTML += '<p>Click "Share" button on YouTube Video page<br>then copy the link from there and paste it into this form</p>';

                    body.innerHTML += '<div id="media_control"><form>URL: <input id="embed_url" type="text" value="" size="30" style="font-size: 1.5em; padding: 2px;"></form></div>';

                    body.innerHTML += '<br><div id="media_cont" class="fl cb" style="margin-left: 35px;"><button id="btn_addvideo" type="button" style="padding: 4px; font-size: 1em; cursor: pointer;">Add YouTube Video</button></div><br>';

                    body.className = 'pad10';

                    editor._windows.insertmedia = {

                        body:body

                    };



                });



                if (!Y.one('#iedit')) {

                    Y.later(5000, editor, function () {

                        if (editor.editorDirty) {

                            editor.editorDirty = null;

                            saveToStorage();

                        }

                    }, {}, true);

                }



                Y.StorageLite.on('storage-lite:ready', function () {

                    var title, tags, editorValue, body = Y.one('#id_qbody');

                    editorValue = Y.StorageLite.getItem(getStorageKey());

                    if (body && !Y.one('#iedit') && null !== editorValue && '' !== editorValue) {

                        body.set('value', editorValue);

                        if (Y.one("#id_title")) {

                            title = Y.StorageLite.getItem('title');

                            tags = Y.StorageLite.getItem('tags');

                            if (title) {

                                Y.one("#id_title").set('value', title);

                            }

                            if (title) {

                                Y.one("#id_tags").set('value', tags);

                            }

                        }

                        write('Loaded content draft from Local Storage');

                    } else {

                        write('Editor ready');

                    }

                    editor.render();

                });





                /**

                 * Preview result html from editor

                 *

                 */

                getEditedText = function () {

                    var i, pre, holder, html = editor.getEditorHTML();

                    html = editor.cleanHTML(html);

                    //Y.log(' got html from editor: ' + html);



                    /**

                     * Lines below are part of code editing

                     * function.

                     *

                     */

                    if (typeof dp !== 'undefined') {



                        html = html.replace(/alt="codepreview"/g, 'rel="codepreview"');



                        /**

                         * Now need to remove 'br' tags from inside the pre block and also

                         * replace &nbsp; with just spaces because inside the 'pre' tags

                         * there should not be &nbsp tags: one space is just one char vs 6

                         * chars in &nbsp;

                         */

                        holder = document.createElement('div');

                        holder.innerHTML = html;

                        pre = holder.getElementsByTagName('pre');

                        for (i = 0; i < pre.length; i++) {

                            pre[i].innerHTML = "\n" + pre[i].innerHTML.replace(/<br>/g, "\n") + "\n";

                            pre[i].innerHTML = "\n" + pre[i].innerHTML.replace(/&nbsp;/g, " ") + "\n";

                        }



                        html = holder.innerHTML;

                        Y.log('html after replacing: ' + html, 'warn');

                    }



                    return html;

                };



                previewDiv = Y.one('#tmp_preview');



                preview = function () {

                    previewDiv = (previewDiv) ? previewDiv : null;

                    if (previewDiv) {

                        previewDiv.set('innerHTML', getEditedText());

                    }



                    // activate hightlighter here

                    // dp.sh.ClipboardSwf = '/js/min/clipboard.swf';

                    if ((typeof dp !== 'undefined') && dp.SyntaxHighlighter) {

                        dp.SyntaxHighlighter.HighlightAll('codepreview');

                    }



                };

            }

        };// end makeEditor





        showFlagForm = function (o) {

            var oAlert, form, faction = 'flagger';

            if (ensureLogin()) {

                if (o.rtype && 'c' === o.rtype) {

                    faction = 'flagcomment';

                }

                form = '<div id="div_flag" style="text-align: left">'

                    + '<form name="form_flag" action="'+ getMeta('web_root') + '">'

                    + '<input type="hidden" name="a" value="' + faction + '">'

                    + '<input type="hidden" name="rid" value="{rid}">'

                    + '<input type="hidden" name="token" value="' + getToken() + '">'

                    + '<input type="hidden" name="qid" value="' + getMeta('qid') + '">'

                    + '<input type="hidden" name="rtype" value="{rtype}">'

                    + '<input type="radio" name="reason" value="spam"><label> Spam</label><br>'

                    + '<input type="radio" name="reason" value="inappropriate"><label> Inappropriate</label><br>'

                    + '<hr>'

                    + '<label for="id_note">Comments?</label>'

                    + '<textarea name="note" cols="40" rows="2" style="display: block;"></textarea>'

                    + '<input type="submit" class="btn" value="Report">'

                    + '</form>'

                    + '</div>';



                form = Y.Lang.sub(form, o);

                oAlert = getAlerter('<h3>Report to moderator</h3>');

                oAlert.set("bodyContent", form);

                oAlert.show();

            }



        };





        showCloseForm = function (qid) {

            var oAlert, form;

            if (ensureLogin()) {

                form = '<div style="text-align: left">'

                    + '<form name="form_close" id="id_close" action="'+ getMeta('web_root') + '">'

                    + '<input type="hidden" name="a" value="close">'

                    + '<input type="hidden" name="token" value="' + getToken() + '">'

                    + '<input type="hidden" name="qid" value="' + qid + '">'

                    + '<input type="radio" name="reason" value="Not a question" checked><label>Not a real question</label><br>'

                    + '<input type="radio" name="reason" value="Off topic"><label>Way off Topic</label><br>'

                    + '<input type="radio" name="reason" value="Unproductive debate"><label>Turned into unproductive debate</label><br>'

                    + '<input type="radio" name="reason" value="Duplicate"><label>Duplicate question</label><br>'

                    + '<hr>'

                    + '<label for="id_note">Comments?</label>'

                    + '<textarea name="note" cols="40" rows="2" style="display: block;"></textarea>'

                    + '<input type="submit" class="btn" value="Close this question">'

                    + '</form>'

                    + '</div>';



                oAlert = getAlerter('<h3>Close this question</h3>');

                oAlert.set("bodyContent", form);

                oAlert.show();

            }



        };





        showRetagForm = function () {

            var oAlert, form, oTags, sTags = '';

            if (ensureLogin()) {

                oTags = Y.all('td.td_question > div.tgs a');

                //Y.log('oTags count: ' + oTags.size());

                oTags.each(function () {

                    sTags += this.get('text') + ' ';

                });

                sTags = Y.Lang.trimRight(sTags);

                //Y.log('sTags: ' + sTags);



                form = '<div id="div_flag" style="text-align: left">'

                    + '<form name="form_flag" id="id_flag" action="'+ getMeta('web_root') + '">'

                    + '<input type="hidden" name="a" value="retag">'

                    + '<input type="hidden" name="token" value="' + getToken() + '">'

                    + '<input type="hidden" name="qid" value="' + getMeta('qid') + '">'

                    + '<hr>'

                    + '<label for="id_note">At least one tag, max 5 tags separated by spaces</label>'

                    + '<input type="text" class="ta1" id="id_retag" size="40" name="tags" value="' + sTags + '"></input>'

                    + '<br>'

                    + '<input type="submit" class="btn" value="Save">'

                    + '</form>'

                    + '</div>';



                oAlert = getAlerter('<h3>Edit Tags</h3>');

                oAlert.set("bodyContent", form);

                initTagInput(Y.one("#id_retag"));

                oAlert.show();



            }



        };



        var deleteComment = function (resID) {

            var comment, f, myform, cfg, request;

            if (confirm('Really delete this comment?')) {

                comment = Y.one("#comment-" + resID);

                if (comment) {

                    myform = '<form name="form_del" action="'+ getMeta('web_root') + '">'

                        + '<input type="hidden" name="a" value="deletecomment">'

                        + '<input type="hidden" name="rid" value="' + resID + '">'

                        + '<input type="hidden" name="token" value="' + getToken() + '">';



                    f = comment.appendChild(myform);

                    //Y.log('f is: ' + f);

                    cfg = {

                        method:'POST',

                        form:{

                            id:f,

                            useDisabled:true

                        }

                    };



                    request = Y.io('/index.php', cfg);

                    comment.hide('fadeOut');



                    Y.later(1000, comment, function () {

                        comment.remove();

                    });



                }

            }

        };



        showDeleteForm = function (o) {

            var oAlert, form, banCheckbox = '', a = 'delete';

            if (ensureLogin()) {

                if (o.rtype && 'c' === o.rtype) {

                    a = 'deletecomment';

                }



                if (isModerator()) {

                    banCheckbox = '<br><input type="checkbox" name="ban"><label> Ban poster</label><br>';

                }

                form = '<div id="div_del" style="text-align: left">'

                    + '<form name="form_del" action="'+ getMeta('web_root') + '">'

                    + '<input type="hidden" name="a" value="' + a + '">'

                    + '<input type="hidden" name="rid" value="{rid}">'

                    + '<input type="hidden" name="token" value="' + getToken() + '">'

                    + '<input type="hidden" name="qid" value="' + getMeta('qid') + '">'

                    + '<input type="hidden" name="rtype" value="{rtype}">'

                    + '<hr>'

                    + '<label for="id_note">Reason for delete (optional)</label>'

                    + '<textarea name="note" cols="40" rows="2" style="display: block;"></textarea>'

                    + banCheckbox

                    + '<br><input type="submit" class="btn" value="Delete">'

                    + '</form>'

                    + '</div>';



                form = Y.Lang.sub(form, o);

                oAlert = getAlerter('<h3>Delete item</h3>');

                oAlert.set("bodyContent", form);

                oAlert.show();

            }

        };

        /**

         * Same as comment form but for the

         * reply to a comment

         * this form does NOT have resID in the id

         * instead in has only id of parent comment

         * Also it will be wrapped inside the

         * div with class cb fl com_wrap

         * and that div will have id reply_$id

         *

         * @param el Node representing the a element

         * a linked that was clicked ("reply" link)

         * That link has id of parent_$id

         * and we then extract $id part

         * and use it as parentid in form

         *

         */

        showCommentForm = function (el) {

            var minrep, vid, form, rep, resID;

            rep = getReputation();

            vid = getViewerId();

            minrep = getMeta('min_com_rep');

            Y.log('rep: ' + rep + ' minrep: ' + minrep);

            //Y.log('rid' + el.get('id'));

            if (ensureLogin()) {

                //if( isModerator() || (reputation > 0) || el.test('.uid-' + getViewerId())){

                if (('1' === getMeta('comment')) || (getMeta('asker_id') == vid) || (rep > minrep) || el.test('.uid-' + vid)) {

                    resID = el.get('id');

                    resID = resID.substr(8);



                    form = Y.one('#add-comment-' + resID);

                    if (!form) {

                        // new way:

                        form = Y.Lang.sub(tplComform, {

                                extraClass:'',

                                divID:resID,

                                resID:resID,

                                formID:resID,

                                token:getToken(),

                                parentID:'0',

                                comment:'comment',

                                commentTip:commentTip,

                                web_root: getMeta('web_root')

                            }

                        );



                        el.insert(form, 'after');



                    } else {

                        if (form._isHidden()) {

                            form.show('fadeIn');

                        } else {

                            form.hide('fadeOut', null, function (o) {

                                Y.log('3280 fadeout o is: ' + o + ' this is: ' + this, 'warn'); // this HTMLForm element

                            });

                        }

                    }



                } else {

                    alert('You must have a reputation of at least <b>' + minrep + '</b><br>'

                        + 'to be able to add comments<br>'

                        + 'Your current reputation is: <b>' + rep + '</b>');

                    return;

                }

            }





        };



        /**

         * Same as comment form but for the

         * reply to a comment

         * this form does NOT have resID in the id

         * instead in has only id of parent comment

         * Also it will be wrapped inside the

         * div with class cb fl com_wrap

         * and that div will have id reply_$id

         *

         * @param el Node representing the a element

         * a linked that was clicked ("reply" link)

         * That link has id of parent_$id

         * and we then extract $id part

         * and use it as parentid in form

         *

         */

        showCommentReplyForm = function (el) {

            var minrep, vid, form, rep, resID, parentDiv, parentID;

            rep = getReputation();

            vid = getViewerId();

            Y.log('3248 vid: ' + vid);

            Y.log('askerid: ' + getMeta('asker_id'));

            minrep = getMeta('min_com_rep');

            Y.log('rep: ' + rep + ' minrep: ' + minrep);

            parentDiv = el.ancestor("div.com_wrap");

            Y.log('parendDiv' + parentDiv);

            resID = parentDiv.ancestor("div.comments").get('id');

            Y.log('3252 resID: ' + resID);

            resID = resID.substr(9);

            Y.log('3254 resID: ' + resID);

            //return;

            if (ensureLogin()) {

                /**

                 * Allow comment to

                 * if viewer is asker of question (even if comment on the answer)

                 *

                 * if viewer is owner of commented resource (question or answer)

                 * this is passed by adding uid-$id as the class of the a element

                 *

                 * if there is a meta tag "comment" with value 1 (set for moderators,

                 * so they can always comment)

                 *

                 * if viewer has enough reputation

                 */

                if (('1' === getMeta('comment')) || (getMeta('asker_id') == vid) || (rep > minrep) || el.test('.uid-' + vid)) {

                    parentID = el.get('id');

                    Y.log('3322 parentID: ' + parentID); //

                    parentID = parentID.substr(8);

                    Y.log('3259 parentID: ' + parentID); //



                    form = Y.one('#comm_wrap_' + parentID);

                    if (!form) {

                        form = Y.Lang.sub(tplComform, {

                            extraClass:' com_wrap',

                            divID:parentID,

                            resID:resID,

                            formID:parentID,

                            token:getToken(),

                            comment:'reply',

                            commentTip:commentTip,

                            web_root: getMeta('web_root'),

                            parentID:parentID});



                        parentDiv.insert(form, 'after');



                    } else {

                        if (form._isHidden()) {

                            form.show('fadeIn');

                        } else {

                            form.hide('fadeOut');

                        }

                    }



                } else {

                    alert('You must have a reputation of at least <b>' + minrep + '</b><br>'

                        + 'to be able to add comments<br>'

                        + 'Your current reputation is: <b>' + rep + '</b>');

                    return;

                }

            }





        };



        showEditComment = function (resID) {

            var form, wrapDiv, body, content;

            /**

             * Check for comment edit timeout

             * and don't allow editing comments

             * older than 5 minutes

             */

            wrapDiv = Y.one("#comment-" + resID);

            //Y.log('wrapDiv: ' + wrapDiv);

            if (wrapDiv) {

                body = wrapDiv.one('.com_b');

                content = body.get('innerHTML');

                //Y.log('body: ' + body);

                //Y.log('text: ' + content);

                content = mmdDecode(content);

                //Y.log('1555 mmdDecoded: ' + content);



                form = '<div id="comm_wrap_' + resID + '" class="fl cb">'

                    + '<form action="'+ getMeta('web_root' )+ '" id="edit-comment-' + resID + '" class="comform" method="post">'

                    + '<input type="hidden" name="a" value="editcomment">'

                    + '<input type="hidden" name="commentid" value="' + resID + '">'

                    + '<input type="hidden" name="token" value="' + getToken() + '">'

                    + '<table class="cb fr tbl_comment">'

                    + '<tr><td width="60px" class="com_icons" valign="top"></td>'

                    + '<td class="com_main">'

                    + '<textarea name="com_body" cols="60" rows="4" class="com_bo" style="display: block; padding: 2px;">' + content + '</textarea>'

                    + '</td>'

                    + '<td class="com_button" valign="top">'

                    + '<input type="submit" name="doit" class="btn_comment" value="save">'

                    + '</td>'

                    + '</tr>'

                    + commentTip

                    + '</table>'

                    + '</form></div>';



                wrapDiv.insert(form, 'replace');

            }

        };



        showShredForm = function (uid) {

            var id = uid.substr(5);

            //Y.log('uid: ' +id);

            form = '<div id="div_del" style="text-align: left">'

                + '<form name="form_shred" id="id_shred" action="'+ getMeta('web_root') + '">'

                + '<input type="hidden" name="a" value="shred">'

                + '<input type="hidden" name="uid" value="' + id + '">'

                + '<input type="hidden" name="token" value="' + getToken() + '">'

                + '<p>Shredding user will completely delete all posts made by the user<br>'

                + 'as well as all user tags'

                + '<br>It will also change user status to *deleted*'

                + '<br>and ban all IP addresses ever used by that user</p>'

                + '<p>Proceed only if you absolutely sure you want to do this'

                + '<hr>'

                + '<input type="submit" class="btn_shred" value="Shred">'

                + '</form>'

                + '</div>';



            oAlert = getAlerter('<h3>Shred User</h3>');

            oAlert.set("bodyContent", form);

            oAlert.show();

        };



        setMeta = function (metaName, value) {

            var node = getMeta(metaName, true);

            if (node && value) {

                node.set('content', value);

            }

        };



        ensureLogin = function (bForceAlert) {

            var message;

            if (bForceAlert || !isLoggedIn()) {

                message = '<div class="larger"><p>You must login to perform this action</p>'

                    + '<p>Please login or <a class="close" href="#" onClick=oSL.getQuickRegForm(); return false;>Click here to register</a></div>';



                getAlerter('Please Login').set("bodyContent", message).show();



                return false;

            }



            return true;

        };



        /**

         * Get value of 'mytoken' meta tag which serves as a security token for form

         * validation.

         */

        getToken = function () {

            return getMeta('version_id');

        };



        /**

         * Set (update) the value of meta name="mytoken" meta tag with the new value

         */

        setToken = function (val) {

            setMeta('version_id', val);

        };



        getViewerId = function () {

            var uid;

            //Y.log('starting getViewerId');

            if (null === viewerId) {

                //Y.log('viewerId not set');

                uid = getMeta('session_uid');

                //Y.log('uid: ' + uid);

                viewerId = (!uid) ? 0 : parseInt(uid, 10);

            }



            return viewerId;

        };



        /**

         * Test to determine if page is being viewed by a logged in user a logged in

         * user has the session-tid meta tag set to value of twitter userid

         */

        isLoggedIn = function () {



            var ret, uid = getViewerId();

            //Y.log('isLoggedIn uid: ' + uid);

            ret = (uid && (uid !== '') && (uid !== '0'));



            return ret;

        };





        /**

         * Check if current viewer is moderator

         *

         * @return bool true if moderator or admin

         */

        isModerator = function () {

            var role;

            if (bModerator < 2) {

                role = getMeta('role');

                if (role && (('administrator' === role) || ('moderator' === role) )) {

                    bModerator = 3;

                } else {

                    bModerator = 2;

                }

            }



            return (3 === bModerator);

        };





        /**

         * Get reputation score of current viewer

         *

         * @return int reputation score

         */

        getReputation = function () {

            var score;

            if (!reputation) {

                score = getMeta('rep');

                reputation = (!score) ? 1 : parseInt(score, 10);

            }



            return reputation;

        };



        /**

         * Add <span> elements inside .contols

         * only if viewer is moderator or

         * has enough reputation to use them

         */

        addAdminControls = function () {



            var controls = Y.all('div.controls');

            //Y.log('controls ' + controls);

            if (controls) {

                //Y.log('adding adminControls');

                controls.each(function () {

                    //Y.log('this is: ' + this);

                    if (this.test('.question')) {

                        if (isModerator() || this.test('.uid-' + getViewerId()) || (500 < getReputation())) {

                            this.append(' <span class="ico retag ajax" title="Retag this item">retag</span>');

                        }

                        if (!Y.one('#closed') && (isModerator() || this.test('.uid-' + getViewerId()) )) {

                            this.append(' <span class="ico close ajax"  title="Close this question">close</span>');

                        }

                        if ('administrator' === getMeta('role')) {

                            if (!this.test('.sticky')) {

                                this.append(' <span class="ico stick ajax"  title="Make sticky">stick</span>');

                            } else {

                                this.append(' <span title="Unstick" class="ico unstick ajax">unstick</span>');

                            }

                        }

                    }



                    /**

                     * If is moderator or Owner of item,

                     * meaning controls has class uid-1234

                     * where 1234 is also id of viewer  + getViewerId()

                     */

                    if (isModerator() || this.test('.uid-' + getViewerId()) || 2000 < getReputation()) {



                        /**

                         * If is moderator or Owner of item,

                         * meaning controls has class uid-1234

                         * where 1234 is also id of viewer  + getViewerId()

                         */

                        if (isModerator() || this.test('.uid-' + getViewerId())) {

                            this.append(' <span title="Delete "class="ico del ajax">delete</span>');

                        }



                        /**

                         * If this is a comment tool

                         * then check the timeout

                         * and don't add edit link if comment

                         * is older than 5 minutes // || isEditable(this)

                         */

                        if (!this.test('.com_tools') || isEditable(this)) {

                            this.append(' <span  title="Edit" class="ico edit ajax">edit</span>');

                        }

                    }



                });

            }



        };





        /**

         * Check that comment is not older

         * than 5 minutes.

         * Comments older than 5 minutes are not editable

         * unless viewer is moderator

         */

        isEditable = function (controls) {



            var timeOfComment, timeDiff, maxDiff;

            //Y.log('controls passed to isEditable: ' + controls);



            if (isModerator()) {

                //Y.log('isEditable does not apply to moderators');

                return true;

            }



            maxDiff = getMeta('comments_timeout');

            //Y.log('maxDiff: ' + maxDiff);

            if (!maxDiff) {

                //Y.log('unable to resolve comments_timeout meta tag');

                return true;

            }



            /**

             * Convert minutes to milliseconds

             */

            maxDiff = maxDiff * 60000;

            timeOfComment = controls.one('div.com_ts').get('title');

            if (!timeOfComment) {

                //Y.log('unable to resolve timeOfComment meta tag');

                return true;

            }



            timeOfComment = new Date(timeOfComment);

            timeDiff = ((new Date()).getTime() - timeOfComment.getTime());

            Y.log('3042 timeDiff: ' + timeDiff);



            if (timeDiff > maxDiff) {

                Y.log('comment is older than maxDiff', 'warn');



                return false;

            }

            Y.log('Comment is editable');



            return true;



        };





        /**

         * Start the Facebook Login process

         * using Facebook Javascript API

         */

        initFBSignup = function () {

            Y.log('initFBSignup');

            var callback, fbPerms;

            if (typeof FB !== 'undefined') {

                fbPerms = getMeta('fbperms');

                if (!fbPerms) {

                    fbPerms = '';

                }



                Y.log('fbPerms: ' + fbPerms);



                /**

                 * If user is logged in then this is a request

                 * to Connect Facebook to existing user

                 * in this case we send IO request to special

                 * controller that will do its thing and

                 * return some json data which will result

                 * in setting meta 'fb' to '1'

                 * and replacing a div of "connect" button with

                 * link to FB profile

                 */

                if (isLoggedIn()) {

                    callback = function (response) {

                        Y.log('Connecting Facebook account', 'warn');

                        if (response.authResponse) {

                            Y.log('FB Signed in response: ' + Y.dump(response));

                            if (response.status === 'connected') {

                                showLoading(null, 'Connecting<br>Facebook account');

                                Y.io('/index.php?a=connectfb');

                            } else {

                                Y.log('No permissions from Facebook', 'error');

                            }

                        }

                    };

                } else {

                    Y.log('before logging it to facebook');

                    callback = function (response) {

                        if (response.authResponse && response.status === 'connected') {

                            Y.log('FB Signed in response: ' + Y.dump(response));

                            window.top.location.reload(true);

                        } else {

                            Y.log('Facebook login did not work', 'error');

                        }

                    };

                }



                FB.login(callback, {scope:fbPerms});

                Y.log('after login to facebook');

            }



            return;

        };





        /**

         * Get fbOverlay, reuse existing one

         */

        getAlerter = function (header) {

            if (!oAlerter) {

                oAlerter = new Y.Overlay({

                    srcNode:'#fbOverlay',

                    width:'500px',

                    height:'300px',

                    zIndex:100,

                    centered:true,

                    constrain:true,

                    render:true,

                    visible:false,

                    plugins:[



                        {

                            fn:Y.Plugin.OverlayModal

                        },

                        {

                            fn:Y.Plugin.OverlayKeepaligned

                        }



                    ]



                });



                Y.one('#hide-fbOverlay').on('click', function () {

                    oAlerter.hide();

                });

            }



            if (!header) {

                header = 'Alert';

            }

            oAlerter.set("headerContent", '<h3>' + header + '</h3>');



            return oAlerter;

        };



        getMeta = function (metaName, asNode) {

            var ret, node;

            //Y.log('looking for meta: ' + metaName + ' oMetas ' + oMetas);

            if (!oMetas[metaName]) {

                node = Y.one('meta[name=' + metaName + ']');

                //Y.log('meta node for meta ' + metaName+ ' is: ' + node);

                oMetas[metaName] = node;

            }



            if (!oMetas[metaName]) {

                //Y.log('no value in oMetas.metaName for ' + metaName);

                return false;

            }



            if (asNode) {

                return oMetas[metaName];

            }



            ret = oMetas[metaName].get('content');

            //Y.log('ret: ' + ret);



            return ret;



        };



        /**

         * When user clicked on checkbox

         * like "post to Twitter"

         * we check to make sure Viewer has

         * Twitter account connected, else

         * initiate Twitter dance

         */

        checkExtApi = function (el) {

            Y.log('3126 is Checked: ' + el.get('checked'));

            if ((el.get('tagName') === 'INPUT') && el.get('checked')) {

                saveToStorage();

                switch (true) {

                    case ((el.get('id') === 'api_tweet') && (!getMeta('tw'))):

                        Twitter.startDance();

                        break;



                    case ((el.get('id') === 'api_facebook') && ('1' !== getMeta('fb'))):

                        initFBSignup();

                        break;



                    case ((el.get('id') === 'api_tumblr') && ('1' !== getMeta('tm'))):

                        Y.log('3222 api_tumblr');

                        Twitter.startDance('/index.php?a=logintumblr', 800, 540);

                        break;



                    case ((el.get('id') === 'api_linkedin') && ('1' !== getMeta('linkedin'))):

                        Y.log('3879 api_linkedin');

                        Twitter.startDance('/index.php?a=loginlinkedin', 640, 480);

                        break;



                    case ((el.get('id') === 'api_blogger') && ('1' !== getMeta('blgr'))):

                        Y.log('3227 api_blogger');

                        Twitter.startDance('/index.php?a=connectblogger', 680, 540);

                        break;



                }

            }

        };



        revealComments = function () {

            var comments, limit = getMeta('max_comments');

            if (limit && 0 < parseInt(limit, 10)) {

                comments = Y.all('div.nocomments');

                if (comments) {

                    comments.removeClass('nocomments');

                }

            }

        };



        Twitter = {

            /**

             * Popup window object

             */

            popupWindow:null,





            /**

             * Interval object There should be only one of this if we already have an

             * interval then we should not start another login process OR clear previous

             * interval first

             */

            oInterval:null,



            /**

             * Start the oAuth login process by opening the popup window

             */

            startDance:function (url, w, h) {

                showLoading();

                //Y.log('1084 starting oAuth dance this is: ' + this, 'window'); // Object Twitter

                var u, mydomain, popupParams, height, width; //



                width = (w) ? w : 800;

                height = (h) ? h : 800;

                popupParams = 'location=0,status=0,width=' + width + ',height=' + height + ',alwaysRaised=yes,modal=yes';



                u = (!url) ? 'http://' + window.location.hostname + '/index.php?a=logintwitter&ajaxid=1' : url;





                /**

                 * Prevent user from opening more than one Twitter oAuth popup windows.

                 * This is helpful when the already opened window has gone out of focus

                 * (turned into popunder) accedentally

                 *

                 */

                if (this.popupWindow && !this.popupWindow.closed) {

                    this.popupWindow.location.href = u;

                    this.popupWindow.focus();

                    hideLoading();

                    return;

                }



                this.popupWindow = window.open(u, 'twitterWindow', popupParams);

                hideLoading();

                if (!this.popupWindow) {

                    alert('Unable to open login window. Please make sure to disable popup blockers in your browser');

                    return;

                }



                /**

                 * This is very important to cancel any already running intervaled jobs,

                 * otherwise the next one will override prev one but the job will still

                 * be running in the background, so it will never be cancelled,

                 * resulting in continuesly issuing asyncRequests to the server like

                 * crazy

                 *

                 * This can happend when someone opens multiple browser windows by

                 * clickin on 'signin with twitter' several times

                 */

                if (this.oInterval) {

                    // alert('1109 something is still running');

                    window.clearInterval(this.oInterval);

                    this.oInterval = null;

                }



                this.oInterval = window.setInterval(this.checkLogin, 500);

                //Y.log('1085 this.oInterval ' + this.oInterval, 'warn');

            },



            /**

             * This method is check via oInterval, every half a second to check if popup

             * window has been closed on not. If popup has been closed then we assume

             * that the first step in oAuth dance is done and can check with the server

             * to see if session now has user object

             */

            checkLogin:function () {



                if (!Twitter.popupWindow || Twitter.popupWindow.closed) {



                    Twitter.cancelIntervals();



                    /**

                     * Now it just reload the page Simple, just like most other sites

                     * doing it.

                     *

                     */

                    window.location.reload(true);

                }

            },

            /**

             * In case there are any jobs still running at intervals we must cancell the

             * job and null the interval

             *

             * This will also be called from the processLogin() method as well as from

             * the checkLogin() when we detect that popup has been closed

             */

            cancelIntervals:function () {



                //Y.log('Cancellng pending intervals this: ' + this, 'window');

                if (this.oInterval) {

                    //Y.log(' 1131 killing interval');

                    window.clearInterval(this.oInterval);

                    this.oInterval = null;

                }

            },

            toString:function () {

                return 'object Twitter';

            }

        };



        initTooltip = function () {

            var TTT = Y.all('.ttt');

            if (TTT && TTT.size() > 0) {

                if (ttB) {

                    ttB.destroy();

                }

                ttB = new YAHOO.widget.Tooltip("ttB", {

                    context:TTT._nodes,

                    autodismissdelay:5500,

                    width:'300px',

                    hidedelay:350,

                    xyoffset:[-10, -45],

                    effect:{effect:YAHOO.widget.ContainerEffect.FADE, duration:0.20}

                });



            }



        };



        if (TTT2 && TTT2.size() > 0) {

            //Y.log('TTT2 dom nodes: ' + TTT2._nodes, 'warn');

            ttB2 = new YAHOO.widget.Tooltip("ttB2", {

                context:TTT2._nodes,

                autodismissdelay:5500,

                hidedelay:350,

                xyoffset:[-10, -45],

                effect:{effect:YAHOO.widget.ContainerEffect.FADE, duration:0.20}

            });

        }



        initAutoComplete = function () {

            var isearch, id_title;

            if ("1" === getMeta('noac')) {

                return;

            }

            isearch = Y.one('#id_q');

            id_title = Y.one('#id_title');

            if (isearch) {

                isearch.plug(

                    Y.Plugin.AutoComplete,

                    {

                        minQueryLength:3,

                        resultHighlighter:'wordMatch',

                        resultListLocator:'ac',

                        resultTextLocator:'title',

                        source:'/index.php?a=titlehint&q={query}&ajaxid=1&callback={callback}'

                    });

            }





            if (id_title) {

                id_title.plug(

                    Y.Plugin.AutoComplete,

                    {

                        minQueryLength:3,

                        resultHighlighter:'wordMatch',

                        resultListLocator:'ac',

                        resultTextLocator:'title',

                        source:'/index.php?a=titlehint&q={query}&ajaxid=1&callback={callback}',

                        resultFormatter:function (query, results) {

                            return Y.Array.map(results, function (result) {

                                var tpl = '<a href="/q{_id}/{url}">{t}</a><br>{intro}<br><div class="c6">Asked {hts} (<span class="c_{status}">{i_ans} answer{ans_s})</span></div>';

                                var raw = result.raw;

                                return Y.Lang.sub(tpl, {

                                    _id:raw._id,

                                    url:raw.url,

                                    intro:raw.intro,

                                    t:result.highlighted,

                                    hts:raw.hts,

                                    i_ans:raw.i_ans,

                                    ans_s:raw.ans_s,

                                    status:raw.status

                                });

                            });

                        }

                    });

                /**

                 * Click on selected item in this autocomplete must

                 * NOT do the default thing but instead take

                 * to the url of the question. The purpose of this

                 * form is not really to autocomplete the form but

                 * to show questions with similar titles and if user click on one

                 * of them then take user to url of that question.

                 */

                id_title.ac.on('select', function (e) {

                    var qlink, result = e.result;



                    if (result.raw && result.raw._id && result.raw.url) {

                        e.preventDefault();

                        qlink = '/q' + result.raw._id + '/' + result.raw.url;

                        window.location.assign(qlink);

                    }



                });

            }

        };



        initTooltip();

        makeEditor();

        if (editor) {



        }

        revealComments();

        revealHidden();

        setReadLinks();

        storeReadEtag();



        aComHand = Y.all('.com_hand');

        if (aComHand && !aComHand.isEmpty()) {

            aComHand.on('focus', getQuickRegForm);

        }



        var changeLang = function (e) {



            var url, redirect = window.location.href;

            url = '/index.php?a=locale&locale=' + e.currentTarget.get('value') + '&redirect=' + redirect;

            //alert('url: ' + url);

            //return;

            window.location.assign(url);

            //alert('changed ' + e.target + ' curr: ' + e.currentTarget + ' val ' + e.currentTarget.get('value'));



        }



        /*if(Y.one('#id_locale')){

         var oMenuButtonLang = new YAHOO.widget.Button({ 

         id: 'mylangs',

         label: "<em class=\"yui-button-label\">Option 1</em>", 

         type: "menu",  

         menu: "id_locale",

         container: "id_langs"

         });



         oMenuButtonLang.on("selectedMenuItemChange", function(e){

         var url, redirect = window.location.href;

         url = '/index.php?a=locale&locale=' + e.newValue.value +'&redirect=' + redirect;

         window.location.assign(url);

         }); 



         }*/



        Y.on('submit', MysubmitForm, '.qa_form');

        Y.on('change', changeLang, '#id_locale');

        //Y.on('submit', Editcat, '#id_edit_category');

        if (Y.hasOwnProperty('categoryEditor')) {

            Y.categoryEditor.Editor();

        } else {

            Y.log('no cat editor here');

        }



        /**

         * Listening the clicks on links inside #lastdiv

         * allows us to dynamically add modals and panels

         * to lastdiv and already subscriebed listeners will

         * just work

         */

        Y.delegate("click", handleAjaxLinks, "body", '.ajax');

        Y.one('body').delegate("hover", handleOver, handleOut, '.mo'); //.following



        /**

         * Any forms inside the alerter modal window will be

         * handled by handleModalForm()

         */

        Y.delegate("submit", handleModalForm, "#fbOverlay", 'form');

        /**

         * Any forms inside the add_com will be

         * handled by handleCommentForm

         */

        Y.delegate("submit", handleCommentForm, "#qview-body", '.comform');

        /**

         * Any links with class .close inside the alerter modal

         * window will also cause the modal alerter to close

         */

        Y.delegate("click", function () {

            getAlerter().hide();

        }, "#fbOverlay", 'a.close');

        /**

         * Replace default JS alert with out custom

         * Fb looking alerter

         */

        window.alert = function (text) {

            var oAlert = getAlerter();

            oAlert.set("bodyContent", text);

            oAlert.show();

        };





        if (Y.one('#regdiv')) {

            dnd = Y.Cookie.get("dnd");

            //Y.log('dnd: ' + dnd);

            /**

             * Don't show regform if use has 'dnd' (do not disturb) cookie

             */

            if (!dnd) {

                //Y.log('going to show regform');

                oSL.Regform.getInstance().show();

            }

        }





        foldGroup = new Y.ImgLoadGroup({

            foldDistance:2

        });

        foldGroup.set('className', 'imgloader');



        initAutoComplete();

        initTagInput();

        addAdminControls();



        /**

         * Add code highlighter scripts

         * only if code highlight is enabled

         */

        if (typeof dp !== 'undefined') {

            //dp.sh.ClipboardSwf = '/js/min/clipboard.swf';

            dp.SyntaxHighlighter.HighlightAll('code');

        }

    });
