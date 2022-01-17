function () {
        jQuery('#acl__info')
            .html('<img src="'+DOKU_BASE+'lib/images/throbber.gif" alt="..." />')
            .load(
                DOKU_BASE + 'lib/plugins/acl/ajax.php',
                jQuery('#acl__detail form').serialize() + '&ajax=info'
            );
        return false;
    }