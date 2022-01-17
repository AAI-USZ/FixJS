function() {
            if (sync_delete(this, '/bindings/:vhost/:queue/:exchange/:properties_key'))
                update();
            return false;
        }