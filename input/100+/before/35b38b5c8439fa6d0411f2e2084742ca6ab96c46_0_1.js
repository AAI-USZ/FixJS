function () {
        var regexes = [ 
            [/Unit (\d+)/, 'unit'], 
            [/Problem Set (\d+)/, 'ps'],
            [/(\d+). Problem Set/, 'ps'],
            [/(\d+). .*/, 'unit']
        ];

        return (function (hash, data) {
            if (hash[0]==='#') {
                hash = hash.slice(1);
            }
            var nuggetIndex = hash.indexOf("/Nugget/");
            var unitPath = hash.slice(0, nuggetIndex);
            var nuggetID = parseInt(hash.slice(nuggetIndex + 8), 10);

            //Find unit that matches the URL hash
            var units = data.payload.course_rev.units;
            var unit = units.filter(function(u) { return u.path === unitPath; })[0];
            if (!unit) { return null; }
            
            //Find tag prefix
            var tagPrefix=null;
            for (var i=0; i<regexes.length; i++) {
                var r = regexes[i][0].exec(unit.name); 
                if (r !== null) {
                    tagPrefix = regexes[i][1]+r[1];
                    break;
                }
            }
            if (!tagPrefix) { return null; }
            
            //Find key of nugget that matches the ID in the URL
            var nuggetKey = (unit.nuggets.filter(function(n) { return n.id===nuggetID; })[0]).key;
            
            var findNuggetIndex = function (nuggetLayout, nuggetKey) {
                for(var i=0; i<nuggetLayout.length; i++) {
                    for(var j=0; j<nuggetLayout[i].length; j++) {
                        if (nuggetLayout[i][j].nugget_key===nuggetKey) {
                            return i;
                        }
                    }
                }
                return null;
            }
            //Find index of nugget with given key
            var nuggetIndex = findNuggetIndex(unit.nuggetLayout, nuggetKey);
            if (nuggetIndex===null) { return null }
            
            return tagPrefix+"-"+(nuggetIndex+1);
        });
    }