function init() {
        var $body = $('body');

        if($body.is('.new-question')) {
            initNewQuestion();
        }

        if($body.is('.questions')) {
            initTagFilterToggle();
        }

        if($body.is('.answers')) {
            // Put last search query into search box
            $('#support-search input[name=q]')
                .val(k.unquote($.cookie('last_search')));

            initHaveThisProblemTooAjax();
            initEmailSubscribeAjax();
            initHelpfulVote();
            new k.AjaxPreview($('#preview'));
        }

        Marky.createSimpleToolbar('.editor-tools', '#reply-content, #id_content', !$body.is('.new-question'));
    }