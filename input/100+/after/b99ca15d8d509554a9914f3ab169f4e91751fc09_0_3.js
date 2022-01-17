function() {

            config = $.global('$CONFIG');

            if(!config && attempTimes) {

                attempTimes -= 1;

                setTimeout(wbp.init, 30);

            } else {

                $uid = config['uid'];

                if(this.scope() < 0) return;

                this.Config.init();

                this.Window.showSettingsBtn(); //显示按钮

                if($.find('.feed_lists').length > 0) {

                    wbp.Filter.filterFeeds();

                }

                $(doc).on('DOMNodeInserted', this.handleInsert);

                this.Module.operate();  //屏蔽模块

                console.log('启动时间=' + (new Date - beginTime) + 'ms');

            }

        }