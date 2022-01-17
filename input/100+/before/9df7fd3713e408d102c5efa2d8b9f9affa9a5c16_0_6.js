function (e) {

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

            }