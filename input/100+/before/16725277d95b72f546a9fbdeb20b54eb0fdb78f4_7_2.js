function() {
            var maxLines = 10;
            var convertToHumanReadable = function(bytes) {
                var factors = [[1, 'B'], [1024, 'KB'], [1048576, 'MB'], [1073741824, 'GB']];
                var ret = "";
                for (var i = 0; i < factors.length; i++) {
                    if (i + 1 >= factors.length || (bytes > factors[i][0] && bytes < factors[i + 1][0]) || bytes === 0) {
                        ret = Math.floor((bytes / (factors[i][0])) * 100 ) / 100 + factors[i][1];
                        break;
                    }
                }
                return ret;
            };

            var sumBytes = 0;

            var dataArray = options.stats.dataCount;
            for (var i in options.stats.dataCount) {
                if (!(i === "" || typeof i == "undefined" || isNaN(dataArray[i]))) {
                    sumBytes += dataArray[i];
                }
            }

            var now = new Date();
            var diff = (now - start) / 1000 / 60;
            var sdiff = (now - start) / 1000;
            var served = ( options.stats.parasoups || 0 );
            var spm = Math.floor(( served / diff ) * 10) / 10;
            var bpm = Math.floor(( sumBytes / sdiff ) * 10) / 10;

            var status = "";

            status += "total data served: " + convertToHumanReadable(sumBytes) + " " + convertToHumanReadable(bpm) + "/s\n";
            status += "assets on server: " + options.stats.assetCount + "\n";
            status += "parasoups served: " + served + " " + spm + "/min\n";
            status += "parasoup asset cache: " + options.stats.parasoupAssetCache;

            return status;
        }