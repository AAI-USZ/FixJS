function init() {
        $('select.enable-if-js').removeAttr('disabled');

        var $body = $('body');

        if ($body.is('.new')) {
            initPrepopulatedSlugs();
        }
        initDetailsTags();

        if ($body.is('.document') || $body.is('.home')) {  // Document page
            //initForTags();
            //updateShowforSelectors();
            initHelpfulVote();
            initSectionEditing();
        } else if ($body.is('.review')) { // Review pages
            //initForTags();
            //updateShowforSelectors();
            initApproveReject();
        }
        if ($body.is('.document')){
            initSyntaxHighlighter();
        }

        if ($body.is('.home')) {
            initClearOddSections();
        }

        if ($body.is('.edit, .new, .translate')) {
            initMetadataEditButton();
            initSaveAndEditButtons();
            initArticlePreview();
            // initTitleAndSlugCheck();
            // initDrafting();
        }
        if ($body.is('.edit.is-template') ||
                $body.is('.new.is-template')) {
            var textarea = $('textarea#id_content').hide();
            
            var editor = window.ace_editor = ace.edit("ace_content");
            editor.setTheme("ace/theme/dreamweaver");
            
            var JavaScriptMode = require("ace/mode/javascript").Mode;

            var session = editor.getSession();
            session.setMode(new JavaScriptMode());
            session.setValue(textarea.val());
            session.on('change', function(){
              textarea.val(editor.getSession().getValue());
            });
        }
    }