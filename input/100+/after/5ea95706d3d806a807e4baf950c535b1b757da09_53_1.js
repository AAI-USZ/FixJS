function () {

            var self = this,
                editor = self.editor,
                statusbar = editor.get("statusBarEl"),
                cfg = this.config;
            cfg.draft = cfg.draft || {};
            self.draftInterval = cfg.draft.interval
                = cfg.draft.interval || INTERVAL;
            self.draftLimit = cfg.draft.limit
                = cfg.draft.limit || LIMIT;
            var holder = new Node(
                "<div class='ks-editor-draft'>" +
                    "<span class='ks-editor-draft-title'>" +
                    "内容正文每" +
                    cfg.draft.interval
                    + "分钟自动保存一次。" +
                    "</span>" +
                    "</div>").appendTo(statusbar);
            self.timeTip = new Node("<span class='ks-editor-draft-time'/>")
                .appendTo(holder);

            var save = new Node(
                    "<a href='#' " +
                        "onclick='return false;' " +
                        "class='ks-editor-button ks-editor-draft-save-btn ks-inline-block' " +
                        "style='" +
                        "vertical-align:middle;" +
                        "padding:1px 9px;" +
                        "'>" +
                        "<span class='ks-editor-draft-save'>" +
                        "</span>" +
                        "<span>立即保存</span>" +
                        "</a>"
                ).unselectable().appendTo(holder),
                versions = new MenuButton({
                    render:holder,
                    collapseOnClick:true,
                    width:"100px",
                    prefixCls:"ks-editor-",
                    menuCfg:{
                        width:"225px",
                        align:{
                            points:['tr', 'br']
                        }
                    },
                    matchElWidth:false,
                    autoRender:true,
                    content:"恢复编辑历史"
                });
            self.versions = versions;
            // 点击才开始 parse
            versions.on("beforeCollapsedChange", function (e) {
                if (!e.newValue) {
                    versions.detach("beforeCollapsedChange", arguments.callee);
                    self.sync();
                }
            });
            save.on("click", function (ev) {
                self.save(false);
                //如果不阻止，部分页面在ie6下会莫名奇妙把其他input的值丢掉！
                ev.halt();
            });

            addRes.call(self, save);

            /*
             监控form提交，每次提交前保存一次，防止出错
             */
            if (editor.get("textarea")[0].form) {
                (function () {
                    var textarea = editor.get("textarea"),
                        form = textarea[0].form;

                    function saveF() {
                        self.save(true);
                    }

                    Event.on(form, "submit", saveF);
                    addRes.call(self, function () {
                        Event.remove(form, "submit", saveF);
                    });

                })();
            }

            var timer = setInterval(function () {
                self.save(true);
            }, self.draftInterval * 60 * 1000);

            addRes.call(self, function () {
                clearInterval(timer);
            });

            versions.on("click", self.recover, self);
            addRes.call(self, versions);
            self.holder = holder;
            if (cfg.draft['helpHtml']) {

                var help = new Node('<a ' +
                    'tabindex="0" ' +
                    'hidefocus="hidefocus" ' +
                    'class="ks-editor-draft-help" ' +
                    'title="点击查看帮助" ' +
                    'href="javascript:void(\'点击查看帮助 \')">点击查看帮助</a>')
                    .unselectable()
                    .appendTo(holder);

                help.on("click", function () {
                    help[0].focus();
                    if (self.helpPopup && self.helpPopup.get("visible")) {
                        self.helpPopup.hide();
                    } else {
                        self._prepareHelp();
                    }
                });
                help.on("blur", function () {
                    self.helpPopup && self.helpPopup.hide();
                });
                self.helpBtn = help;
                addRes.call(self, help);
                Editor.Utils.lazyRun(self, "_prepareHelp", "_realHelp");
            }
            addRes.call(self, holder);
        }