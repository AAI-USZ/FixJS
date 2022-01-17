function (request,response) {
            var parsed = parseQuotas(response.GROUP,quotaListItem);
            $('.current_quotas table tbody',$group_quotas_dialog).append(parsed.VM);
            $('.current_quotas table tbody',$group_quotas_dialog).append(parsed.DATASTORE);
            $('.current_quotas table tbody',$group_quotas_dialog).append(parsed.IMAGE);
            $('.current_quotas table tbody',$group_quotas_dialog).append(parsed.NETWORK);
        }