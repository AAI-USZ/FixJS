function chkcomment(form) {
    if(checkInProgress(form)) {
        var r = confirm("Request still in progress\n(click Cancel to attempt to stop the request)");
        if (r==false)
          tagInProgress(form, false);
        return false;
    }

    tagInProgress(form, true);
    if(form.replace.value) {
      return post_form(form, 'editcomment', null, null, true, null,
                       function() { tagInProgress(form, false)});
    }
    else {
      return post_form(form, 'comment', null, null, true, null,
                       function() { tagInProgress(form, false)});
    }
}