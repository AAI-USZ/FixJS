function fill_people_vcard(user_obj, vcard_container) {
    var created_at = new Date(Date.parse(user_obj.created_at));
    var now = new Date();
    var differ = Math.floor((now-created_at)/(1000 * 60 * 60 * 24));

    var created_at_str = ui.Template.format_time(created_at);

    vcard_container.find('.profile_img_wrapper')
        .attr('href', user_obj.profile_image_url.replace(/_normal/, ''))
        .attr('style', 'background-image:url('+user_obj.profile_image_url+');');
    vcard_container.find('.screen_name')
        .attr('href', conf.get_current_profile().preferences.base_url + user_obj.screen_name)
        .text(user_obj.screen_name);
    vcard_container.find('.name').text(user_obj.name);
    vcard_container.find('.tweet_cnt').text(user_obj.statuses_count);
    vcard_container.find('.tweet_per_day_cnt').text(
        Math.round(user_obj.statuses_count / differ * 100)/ 100);
    vcard_container.find('.follower_cnt').text(user_obj.followers_count);
    vcard_container.find('.friend_cnt').text(user_obj.friends_count);
    vcard_container.find('.listed_cnt').text(user_obj.listed_count);
    vcard_container.find('.bio').text('').text(user_obj.description);
    vcard_container.find('.location').text('').text(user_obj.location);
    vcard_container.find('.join').text(created_at_str);
    if (user_obj.url) {
        vcard_container.find('.web').text(user_obj.url)
        vcard_container.find('.web').attr('href', user_obj.url);
    } else {
        vcard_container.find('.web').text('')
        vcard_container.find('.web').attr('href', '#');
    }
    vcard_container.find('.people_vcard_radio_group .mochi_button_group_item').attr('name', 'people_'+user_obj.screen_name+'_vcard')
    vcard_container.find('.people_view_toggle .mochi_button_group_item').attr('name', 'people_'+user_obj.screen_name+'_views')
}