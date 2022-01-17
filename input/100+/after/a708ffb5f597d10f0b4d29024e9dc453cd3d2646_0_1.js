function(resource,list,config){
            var partitions = {
                "Idle" : 0,
                "Ok" : 0,
                "Used" : 0,
                "Working" : 0,
                "Overloaded" : 0
            }

            if (!list.length) return [];

            for (var i=0; i< list.length; i++){
                var elem = list[i][resource]
                var value = elem.HOST_SHARE.USED_CPU * 100 /
                    elem.HOST_SHARE.MAX_CPU
                if (value > 80)
                    partitions["Overloaded"]++
                else if (value > 60)
                    partitions["Working"]++
                else if (value > 40)
                    partitions["Used"]++
                else if (value > 20)
                    partitions["Ok"]++
                else
                    partitions["Idle"]++
            }

            var series = [];
            for (partition in partitions) {
                var data = partitions[partition]
                var color = config.colorize ? config.colorize(partition) : null
                series.push({ label: partition,
                              data: data,
                            })
            }
            return series
        }