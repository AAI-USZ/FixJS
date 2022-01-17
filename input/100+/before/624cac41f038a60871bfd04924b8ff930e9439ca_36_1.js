function(hash){
            $newsharecontentLinkURL.val(contentObj.shareUrl);

            var cantShareFiles = _.filter(contentObj.data, function(file) {
                return !sakai.api.Content.canCurrentUserShareContent(file.body);
            });
            var shareFiles = getCanShareFiles(contentObj.data);
            var filenames = sakai.api.Util.TemplateRenderer('newsharecontent_filenames_template', {
                'files': shareFiles
            });
            var shareURLs = sakai.api.Util.TemplateRenderer('newsharecontent_fileURLs_template', {
                'files': shareFiles,
                'sakai': sakai
            });
            var shareData = {
                'filename': filenames,
                'data': shareFiles,
                'path': shareURLs,
                'user': sakai.api.User.getFirstName(sakai.data.me.profile)
            };
            $newsharecontentMessage.html(sakai.api.Util.TemplateRenderer("newsharecontent_share_message_template", shareData));

            renderCantShare(cantShareFiles);

            if (shareFiles.length) {
                $newsharecontentCanShareContainer.show();
                $newsharecontentTitle.show();
            } else {
                $newsharecontentCanShareContainer.hide();
                $newsharecontentTitle.hide();
            }

            if (hash) {
                hash.w.show();
            }
            var tbx = $('#toolbox');
            if (tbx.find("a").length) {
                tbx.find("a").remove();
            }
            var svcs = {facebook: 'Facebook', twitter: 'Twitter', delicious:'Delicious', stumbleupon: 'StumbleUpon', blogger:'Blogger', wordpress:'Wordpress', google:'Google', expanded: 'More'};
            var addThisTitle ="";
            for (var s in svcs) {
                if (s==='twitter'){
                    addThisTitle = sakai.api.i18n.getValueForKey("SHARE_EXT_MSG1",'newsharecontent')+shareData.filename.replace(/"/gi,'')+' '+sakai.api.i18n.getValueForKey("SHARE_EXT_MSG2",'newsharecontent')+' ' +sakai.api.i18n.getValueForKey("TITLE_PLAIN");
                }
                else{
                    addThisTitle =  shareData.filename.replace(/"/gi,'')+' '+sakai.api.i18n.getValueForKey("SHARE_EXT_MSG2",'newsharecontent')+' ' + sakai.api.i18n.getValueForKey("TITLE_PLAIN");
                }
                tbx.append('<a class="addthis_button_'+s+'" addthis:url="'+shareData.path+'" addthis:title="'+addThisTitle+'"></a>');
            }
            addthis.toolbox("#toolbox");
        }