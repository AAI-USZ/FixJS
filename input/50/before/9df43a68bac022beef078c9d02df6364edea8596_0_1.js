function () {
        jQuery('#acl__info').load(
            DOKU_BASE + 'lib/plugins/acl/ajax.php',
            jQuery('#acl__detail form').serialize() + '&ajax=info'
        );
        return false;
    }