function() {
            if (sync_post(this, '/bindings/:vhost/e/:source/:destination_type/:destination'))
                update();
            return false;
        }