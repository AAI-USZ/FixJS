function() {
            if (sync_delete(this, '/bindings/:vhost/e/:source/:destination_type/:destination/:properties_key'))
                update();
            return false;
        }