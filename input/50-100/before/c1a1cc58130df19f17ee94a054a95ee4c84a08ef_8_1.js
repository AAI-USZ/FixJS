function (request,response) {
            // when we receive quotas we parse them and create an
            // quota objects with html code (<li>) that can be inserted
            // in the dialog
            var parsed = parseQuotas(response.USER);
            $('.current_quotas table tbody',$user_quotas_dialog).append(parsed.VM);
            $('.current_quotas table tbody',$user_quotas_dialog).append(parsed.DATASTORE);
            $('.current_quotas table tbody',$user_quotas_dialog).append(parsed.IMAGE);
            $('.current_quotas table tbody',$user_quotas_dialog).append(parsed.NETWORK);
        }