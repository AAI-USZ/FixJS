function(info) {
            if (this.lastLoadedURL && this.lastLoadedURL != info.url) {
                this.clearView();
            } else if (this.lastLoadedURL == info.url) {
                return;
            }
            var self = this;
            this.lastLoadedURL = info.url;
            if (!this.defaultHTML) {
                this.defaultHTML = $(this.container.get(0)).clone(true);
                this.images = null;
                this.selectedImage = null;
                this.currentEntry = null;
                this.titleLoaded = false;
            }

            var user = UserManager.user;
            this.usericon.attr('src', user.view.icon);
            this.usernameEL.text(user.name);
            if (user.plususer) {
                this.plusInputs.removeClass('none');
            } else {
                this.setupOptionHelp('private');
                this.plusInputs.remove();
            }
            if (user.canUseTwitter) {
                if (user.postTwitterChecked === 'on' ||
                    (user.postTwitterChecked === 'inherit' &&
                     Config.get('popup.bookmark.postTwitter'))) {
                    this.postTwitter.attr('checked', 'checked');
                }
                this.postTwitter.bind('change', function() {
                    Config.set('popup.bookmark.postTwitter', this.checked);
                });
            } else {
                this.setupOptionHelp('post-twitter');
            }
            if (user.canUseFacebook) {
                if (user.postFacebookChecked === 'on' ||
                    (user.postFacebookChecked === 'inherit' &&
                     Config.get('popup.bookmark.postFacebook'))) {
                    this.postFacebook.attr('checked', 'checked');
                }
                this.postFacebook.bind('change', function() {
                    Config.set('popup.bookmark.postFacebook', this.checked);
                });
            } else {
                this.setupOptionHelp('post-facebook');
            }
            if (user.canUseMixiCheck) {
                if (user.postMixiCheckChecked === 'on' ||
                    (user.postMixiCheckChecked === 'inherit' &&
                     Config.get('popup.bookmark.postMixiCheck'))) {
                    this.postMixiCheck.attr('checked', 'checked');
                }
                this.postMixiCheck.bind('change', function() {
                    Config.set('popup.bookmark.postMixiCheck', this.checked);
                });
            } else {
                this.setupOptionHelp('post-mixi-check');
            }
            $('#private').click(Ten.Function.method(this, 'privateClickHandler'));
            this.privateClickHandler();

            if (info.title) {
                this.setTitle(info.title);
            } else {
                this.setTitleByURL(info.url);
            }
            this.faviconEL.attr('src', info.faviconUrl);

            var url = info.url;

            this.port.postMessage({
                message: 'bookmarkedit_bridge_get',
                data: {
                    url: url,
                }
            });

            var lastCommentValueConf = Config.get('popup.bookmark.lastCommentValue');
            if (lastCommentValueConf && lastCommentValueConf.url == url) {
                // Config.set('popup.bookmark.lastCommentValue', {});
                this.commentEL.attr('value', lastCommentValueConf.comment);
                var cLength = lastCommentValueConf.comment.length;
                this.commentEL.get(0).setSelectionRange(cLength, cLength);
            }

            if (request_uri.param('error')) {
                $('#bookmark-error').text('申し訳ありません、以下の URL のブックマークに失敗しました。しばらく時間をおいていただき、再度ブックマークください。')
                .removeClass('none');
                this.commentEL.attr('value', request_uri.param('comment'));
            }

            // debug /
            /*
            setTimeout(function() {
                self.updatePageData({
                    'canonical': 'http://www.hatena.ne.jp/',
                    'images': ['http://www.hatena.ne.jp/images/badge-u-hover.gif', 'http://www.hatena.ne.jp/images/badge-u-hover.gif', 'http://www.hatena.ne.jp/images/badge-u-hover.gif', 'http://www.hatena.ne.jp/images/badge-u-hover.gif', 'http://www.hatena.ne.jp/images/badge-u-hover.gif', 'http://www.hatena.ne.jp/images/badge-u-hover.gif', 'http://www.hatena.ne.jp/images/badge-u-hover.gif', 'http://www.hatena.ne.jp/images/badge-d-used-hover.gif'],
                });
            }, 100);
            */

            if (!url || info.url.indexOf('http') != 0) {
                this.form.hide();
                this.message.text('この URL ははてなブックマークに追加できません');
                this.message.show();
                return;
            }

            if (url.indexOf('http://b.hatena.ne.jp/entry/') == 0) {
                var canURL = url;
                if (url.indexOf('http://b.hatena.ne.jp/entry/s/') == 0) {
                    canURL = canURL.replace('/s/', '/').replace('http://', 'https://');
                }
                canURL = canURL.replace('b.hatena.ne.jp/entry/', '');
                $('#canonical-tips').text('エントリーページをブックマークしようとしています。');
                this.setCanonical(canURL);
            }

            if (Config.get('popup.bookmark.confirmBookmark')) {
                this.confirmBookmark.attr('checked', 'checked');
            }
            this.confirmBookmark.bind('change', function() {
                Config.set('popup.bookmark.confirmBookmark', this.checked);
            });

            this.setURL(url);
            this.tagCompleter = TagCompleter;
            this.tagCompleter.register(this.commentEL, {
                updatedHandler: function(inputLine) {
                    // darty...
                    var m = inputLine.value;
                    var byte = Utils.countCommentToBytes(m);
                    byte = Math.floor(byte / 3);
                    self.typeCount.text(byte);
                    if (byte > 100) {
                        self.typeCount.addClass('red');
                    } else {
                        self.typeCount.removeClass('red');
                    }
                    $('dd span.tag').each(function(i, el) {
                        if (m.indexOf('[' + el.textContent + ']') == -1) {
                            $(el).removeClass('selected');
                        } else {
                            $(el).addClass('selected');
                            console.log(el.parentNode);
                            console.log(el.className);
                        }
                    });
                    rememberLastComment(m);
                    setTimeout(function() {
                        self.commentEL.focus();
                    }, 10);
                }
            });

            var lastCommentValue;
            function rememberLastComment(value) {
                if (lastCommentValue != value) {
                    lastCommentValue = value;
                    Config.set('popup.bookmark.lastCommentValue', {
                        url: url,
                        comment: lastCommentValue,
                    });
                }
            }

            var form = this.form;
            if (!form.data('keypressBound')) {
                form.data('keypressBound', true);
                form.keypress(function(e) {
                    if (e.keyCode !== 13 || e.target !== self.commentEL.get(0))
                        return;
                    $('#edit-submit').click();
                    return false;
                });
            }

            this.form.show();
            this.commentEL.focus();
            if (Config.get('popup.tags.allTags.enabled') || Config.get('popup.tags.complete.enabled')) {
                HTTPCache.usertags.get(user.name).next(function(res) {
                    if (Config.get('popup.tags.complete.enabled')) {
                        self.tagCompleter.addSuggestTags(res.tagsKeys);
                        self.tagCompleter.tagsObject = res.tags;
                    }
                    if (Config.get('popup.tags.allTags.enabled')) {
                        self.setUserTags(res)
                    }
                });
            }

            HTTPCache.entry.get(url).next(function(res) { self.setEntry(res) });
            Model.Bookmark.findByUrl(url).next(function(res) { self.setByBookmark(res) });
        }