function() {
            if (sync_post(this, '/bindings/:vhost/:queue/:exchange'))
                update();
            return false;
        }