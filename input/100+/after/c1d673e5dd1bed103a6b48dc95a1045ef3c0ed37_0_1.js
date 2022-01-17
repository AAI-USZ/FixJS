function(i) {
            if (group_id !== undefined && typeof group_id == "number")
                list += '<tr data-id="' + contacts[i].id + '" data-group-id="' + group_id + '">';
            else
                list += '<tr data-id="' + contacts[i].id + '">'
            list += '<td><a data-remote="true" href="'+account_prefix_path+'/contacts/' + contacts[i].id + '">' + contacts[i].last_name + ', '
                    + contacts[i].first_name + '</a>'
                    + '<td class="text-right" width="40px"><span class="mgm-contact hide">'
                    + '<span data-tooltip="Add me to another group me by dragging into a group on the left" class="om-icon-only om-blue-icon ui-icon-arrow-4-diag"></span>'
                    + '<a  data-remote="true" data-method="delete" href="'+account_prefix_path+'/contacts/' + contacts[i].id + '" class="remove-contact">'
                    + '<span class="om-icon-only om-blue-icon ui-icon-trash" data-tooltip="Delete this contact from the database"></span></a>'
                    + '</span></td>'
                    + '</td></tr>';

        }