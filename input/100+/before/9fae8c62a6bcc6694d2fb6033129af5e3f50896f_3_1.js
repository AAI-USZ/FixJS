function(){
    var fbtn = $('.follow-toggle');
    if (fbtn.length === 1){
        var follow_user = new FollowUser();
        follow_user.decorate(fbtn);
        follow_user.setUserName(askbot['data']['viewUserName']);
    }
    if (askbot['data']['userIsAdminOrMod']){
        var group_editor = new UserGroupsEditor();
        group_editor.decorate($('#user-groups'));
    } else {
        $('#add-group').remove();
    }
}