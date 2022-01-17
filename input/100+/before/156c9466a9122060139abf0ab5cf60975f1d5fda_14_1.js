function(ev, $el) {
            var content = false;
            var contentType = 'link';
            var dt = ev.originalEvent.dataTransfer;
            var validURL = false;
            var text = dt.getData('Text');
            if (text && isUrl(text)) {
                validURL = text.indexOf(sakai.config.SakaiDomain.substring(7, sakai.config.SakaiDomain.length)) < 0 ||
                           text.indexOf(sakai.config.SakaiDomain) < 0;
            }
            if (dt.files.length) {
                // We only support browsers that have XMLHttpRequest Level 2
                if (!window.FormData) {
                    return false;
                }
                sakai.api.Util.progressIndicator.showProgressIndicator(
                    sakai.api.i18n.getValueForKey('INSERTING_YOUR_EXTERNAL_CONTENT', 'contentauthoring'),
                    sakai.api.i18n.getValueForKey('PROCESSING'));
                contentType = 'file';
                content = dt.files;
                uploadExternalFiles(content, $el);
            } else if (validURL) {
                sakai.api.Util.progressIndicator.showProgressIndicator(
                    sakai.api.i18n.getValueForKey('INSERTING_YOUR_EXTERNAL_CONTENT', 'contentauthoring'),
                    sakai.api.i18n.getValueForKey('PROCESSING'));
                content = text;
                uploadExternalLink(content, $el);
            }
        }