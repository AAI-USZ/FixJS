function (row, index) {
             return {
                relic_id       : row.relic_id,
                nid_id         : row.nid_id,
                name           : row.identification,
                name_action    : row.identification_action,
                address        : row.street,
                address_action : row.street_action,
                date           : row.dating,
                date_action    : row.dating_action,
                categories     : row.categories
             };
        }