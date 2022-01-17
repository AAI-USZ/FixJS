function(){
            var sel = $(this);
            if (sel.hasClass('wiki-l10n')) {
                location.href = sel.val();
            } else {
                this.form.submit();
            }
        }