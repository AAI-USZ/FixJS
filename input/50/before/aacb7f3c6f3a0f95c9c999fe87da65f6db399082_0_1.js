function(data, textStatus, jqXHR) {
                    // XXX: Page is sometimes reloaded before the update is done ; why?
                    setTimeout(location.reload, 300);  
                }