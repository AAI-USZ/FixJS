function(ev){
    var lk = link_quick_short.body();
    var qk = quote_quick_short.body();
    var k = quick_short.body();
    var tcheck = tumble_check.body();
    var gcheck = enableGooglePlusPages_check.body();
    var enable_webhook = enable_webhook_check.body();
    var webhook_url = webhook_url_input.body();
    if(!Shortcutkey.isConflict(lk, qk, k)){
      background.TBRL.configSet({
        'services' : services.body(),
        'post'     : {
          'tag_provider'     : provider.body(),
          'tag_auto_complete': tag_check.body(),
          'notification_on_posting': notification_check.body(),
          'ldr_plus_taberareloo': ldr_check.body(),
          'disable_tumblr_default_keybind': disable_keybind_check.body(),
          'dashboard_plus_taberareloo': dashboard_check.body(),
          'dashboard_plus_taberareloo_manually': dashboard_manually_check.body(),
          'googlereader_plus_taberareloo': gr_check.body(),
          'play_on_tumblr_play': play_play_check.body(),
          'play_on_tumblr_like': play_like_check.body(),
          'play_on_tumblr_count': play_count_check.body(),
          "shortcutkey_ldr_plus_taberareloo"  : ldr_short.body(),
          "shortcutkey_dashboard_plus_taberareloo"  : dashboard_short.body(),
          "shortcutkey_dashboard_plus_taberareloo_manually"  : dashboard_manually_short.body(),
          "shortcutkey_googlereader_plus_taberareloo"  : gr_short.body(),
          "shortcutkey_play_on_tumblr_play"  : play_play_short.body(),
          "shortcutkey_play_on_tumblr_like"  : play_like_short.body(),
          "shortcutkey_play_on_tumblr_count" : play_count_short.body(),
          'keyconfig' : keyconfig_check.body(),
          "evernote_clip_fullpage": clip_fullpage.body(),
          "remove_hatena_keyword" : remove_hatena_keyword.body(),
          "tumblr_default_quote"  : tumblr_default_quote.body(),
          'shortcutkey_linkquickpost': lk,
          "shortcutkey_quotequickpost" : qk,
          "shortcutkey_quickpost" : k,
          "always_shorten_url" : shorten_check.body(),
          "multi_tumblelogs"   : tcheck,
          "post_with_queue"    : queue_check.body(),
          "enable_google_plus_pages" : gcheck,
          'taberareloo_on_google_plus' : enableGooglePlusKey_check.body(),
          "shortcutkey_taberareloo_on_google_plus" : googlePlusKey_short.body(),
          'enable_webhook' : enable_webhook,
          'webhook_url' : webhook_url
        },
        'entry'    : {
          'amazon_affiliate_id' : amazon.body(),
          'thumbnail_template' : thumbnail.body(),
          'twitter_template' : twittemp.body(),
          'trim_reblog_info'   : reblog_check.body(),
          'append_content_source'   : append_check.body(),
          'not_convert_text'   : notconvert_check.body()
        }
      });
      if(!tcheck){
        tumble_list.remove();
      }
      if(!gcheck){
        googlePlusPages_list.remove();
      }
      if(enable_webhook && webhook_url){
        background.Models.addWebHooks();
      }
      else {
        background.Models.removeWebHooks();
      }
      chrome.extension.sendRequest({request: "initialize"});
      this.close();
    } else {
      alert(chrome.i18n.getMessage('error_keyConfliction'));
    }
  }