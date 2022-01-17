function(obj) {
            if (obj.val() < 0) return;
            get_hypervisors( obj, function(hvlist) {
                set_suggests( hvlist );
                $('select.host_hypervisor').html( $(get_suggests()).slice(0,10) ).prepend(suggest_head()).append(suggest_foot());
                $('span.loading.hypervisor').hide();
                $('select.host_hypervisor').show();
            });
        }