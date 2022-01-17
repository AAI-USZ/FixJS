function init() {
    ui.Template.reg_url = ''//ui.Template.reg_vaild_preceding_chars
    + '('
        + ui.Template.reg_url_proto_chars
        + ui.Template.reg_url_path_chars
    + '+)';

    ui.Template.reg_user = new RegExp('(^|[^a-zA-Z0-9_!#$%&*@＠])'
        + ui.Template.reg_user_name_chars, 'g');

    ui.Template.reg_list = new RegExp('(^|[^a-zA-Z0-9_!#$%&*@＠])'
        + ui.Template.reg_list_name_template, 'ig');

    ui.Template.reg_link = new RegExp(ui.Template.reg_url);

    ui.Template.reg_link_g = new RegExp(ui.Template.reg_url, 'g');

    ui.Template.reg_hash_tag = new RegExp(ui.Template.reg_hash_tag_template
        .replace(new RegExp('{%LATIN_CHARS%}', 'g'), ui.Template.reg_hash_tag_latin_chars)
        .replace(new RegExp('{%NONLATIN_CHARS%}', 'g'), ui.Template.reg_hash_tag_nonlatin_chars)
    , 'ig');

    ui.Template.tweet_m = {
          ID:'', TWEET_ID:'', RETWEET_ID:''
        , REPLY_ID:'',SCREEN_NAME:'',REPLY_NAME:'', USER_NAME:''
        , PROFILE_IMG:'', TEXT:'', SOURCE:'', SCHEME:''
        , IN_REPLY:'', RETWEETABLE:'', REPLY_TEXT:'', RETWEET_TEXT:''
        , RETWEET_MARK:'', SHORT_TIMESTAMP:'', TIMESTAMP:'', FAV_CLASS:''
        , DELETABLE:'', TWEET_FONT_SIZE:'', TWEET_FONT: ''
        , STATUS_INDICATOR:'', TRANS_Delete:''
        , TRANS_Official_retweet_this_tweet:'', TRANS_Reply_All:''
        , TRANS_Reply_this_tweet:'', TRANS_RT_this_tweet:''
        , TRANS_Send_Message:'', TRANS_Send_Message_to_them:''
        , TRANS_via:'', TRANS_View_more_conversation:''
        , TWEET_BASE_URL: '', IN_THREAD: ''
        , COLOR_LABEL: ''
    };

    ui.Template.trending_topic_m = {
        ID:'', NAME:''
    };

    ui.Template.retweeted_by_m = {
          ID:'', TWEET_ID:'', RETWEET_ID:''
        , REPLY_ID:'',SCREEN_NAME:'',REPLY_NAME:'', USER_NAME:''
        , PROFILE_IMG:'', TEXT:'', SOURCE:'', SCHEME:''
        , IN_REPLY:'', RETWEETABLE:'', REPLY_TEXT:'', RETWEET_TEXT:''
        , RETWEET_MARK:'', SHORT_TIMESTAMP:'', TIMESTAMP:'', FAV_CLASS:''
        , DELETABLE:'', TWEET_FONT_SIZE:'', TWEET_FONT:''
        , STATUS_INDICATOR:'', TRANS_Delete:''
        , TRANS_Official_retweet_this_tweet:'', TRANS_Reply_All:''
        , TRANS_Reply_this_tweet:'', TRANS_RT_this_tweet:''
        , TRANS_Send_Message:'', TRANS_Send_Message_to_them:''
        , TRANS_via:'', TRANS_View_more_conversation:''
        , TRANS_retweeted_by:'', TRANS_Show_retweeters:''
        , TRANS_Click_to_show_retweeters:''
        , TWEET_BASE_URL: ''
    };

    ui.Template.message_m = {
          ID:'', TWEET_ID:'', SCREEN_NAME:'', RECIPIENT_SCREEN_NAME:''
        , USER_NAME:'', PROFILE_IMG:'', TEXT:''
        , SCHEME:'', TIMESTAMP:''
        , TWEET_FONT_SIZE:'', TWEET_FONT:''
        , TRANS_Reply_Them:''
    };

    ui.Template.search_m = {
          ID:'', TWEET_ID:'', SCREEN_NAME:''
        , USER_NAME:'', PROFILE_IMG:'', TEXT:'', SOURCE:''
        , SCHEME:'', SHORT_TIMESTAMP:'', TIMESTAMP:''
        , TWEET_FONT_SIZE:'', TWEET_FONT:''
        , TRANS_via:''
        , TWEET_BASE_URL: ''
    };

    ui.Template.people_m = {
          USER_ID:'', SCREEN_NAME:'', USER_NAME:'', DESCRIPTION:''
        , PROFILE_IMG:'', FOLLOWING:'', TWEET_FONT_SIZE:'', TWEET_FONT:''
    };

    ui.Template.list_m = {
          LIST_ID:'', SCREEN_NAME:'', SLUG:'', NAME:'', MODE:''
        , DESCRIPTION:'', PROFILE_IMG:'', FOLLOWING:''
        , TWEET_FONT_SIZE:'', TWEET_FONT:''
    };

    ui.Template.view_m = {
        ID:'', CLASS:'tweetview', NAME: '', CAN_CLOSE: '', ROLE: ''
    };

    ui.Template.indicator_m = {
        TARGET: '', TITLE: '', ICON: '', ROLE: ''
    };

    ui.Template.kismet_rule_m = {
          TYPE:'', DISABLED:'', FIELD:'', PATTERN:''
        , METHOD:'', ACTIONS: '', ADDITION: '', NAME: ''
    };

    ui.Template.status_draft_m = {
          MODE:'', TEXT:'', REPLY_TO_ID: '', REPLY_TEXT: ''
        , RECIPIENT: ''
    };

    ui.Template.update_trans();
}