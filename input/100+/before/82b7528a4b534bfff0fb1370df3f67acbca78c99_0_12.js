function(err, data) {
            for (row in data.rows) {
                if (data.rows[row].value && 'crate' in data.rows[row].value) {
                    var board = data.rows[row].key[1];
                    var status = data.rows[row].value.status ? data.rows[row].value.status : 'none';
                    var tag = {
                        none: 'tag_unknown.png',
                        gold: 'tag_gold.png',
                        silver: 'tag_silver.png',
                        bad: 'tag_bad.png',
                        bone: 'tag_bone.png'
                    }[status];
                    $('#tag-' + board).attr('src', utils.getBaseURL() + '/static/images/' + tag);
                }
            }
        }