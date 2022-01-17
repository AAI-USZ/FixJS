function install(product, receipt) {
        var data = {};
        $(window).trigger('app_install_start', product);
        $.post(product.recordUrl).success(function(response) {
            if (response.error) {
                $('#pay-error').show().find('div').text(response.error);
                installError(product);
                return;
            }
            if (response.receipt) {
                data['data'] = {'receipts': [response.receipt]};
            }
            $.when(apps.install(product, data))
             .done(installSuccess)
             .fail(installError);
        }).error(function(response) {
            // Could not record/generate receipt!
            installError(product);
        });
    }