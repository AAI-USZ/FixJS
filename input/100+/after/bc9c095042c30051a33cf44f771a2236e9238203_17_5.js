function(data, category) {
            var groups = [];
            if (data) {
                for (var i in data.results) {
                    if (data.results.hasOwnProperty(i)) {
                        var tempGroup = {
                            'dottedname': sakai.api.Util.applyThreeDots(data.results[i]['sakai:group-title'], 100),
                            'name': data.results[i]['sakai:group-title'],
                            'url': data.results[i].homePath
                        };
                        if (data.results[i]['sakai:group-visible'] == 'members-only' || data.results[i]['sakai:group-visible'] == 'logged-in-only') {
                            tempGroup['css_class'] = 'topnavigation_group_private_icon';
                        } else {
                            tempGroup['css_class'] = 'topnavigation_group_public_icon';
                        }
                        groups.push(tempGroup);
                    }
                }
                renderObj.groups = renderObj.groups ||
                {};
                renderObj.groups[category] = groups;
                renderObj.groups[category + 'total'] = data.total;
                renderResults();
            }
        }