function(url, params, flashvars){
            if (!url){
                url = "/devwidgets/video/jwplayer/player.swf";
            }
            var so = new SWFObject(url,'ply', '100%', params.height || '100%','9','#000000');
            so.addParam('allowfullscreen','true');
            if (params.allowscriptaccess) {
                so.addParam('allowscriptaccess', params.allowscriptaccess);
            } else {
                so.addParam('allowscriptaccess', 'always');
            }
            so.addParam('wmode','opaque');
            sakai.api.Util.TemplateRenderer("documentviewer_video_template", {"tuid":tuid}, $documentviewerPreview);
            return so;
        }