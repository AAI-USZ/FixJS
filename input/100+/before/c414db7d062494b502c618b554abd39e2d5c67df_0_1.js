function(resource,list,config){
            var path = config.path
            var partitionPath = config.partitionPath
            var dataType = config.dataType
            var partitions = {}
            for (var i=0; i< list.length; i++){
                var elem = list[i][resource]
                var value = path ? parseInt(explore_path(elem,path),10) : 1
                var partition = explore_path(elem, partitionPath)

                //Things on cluster none
                if ((partitionPath == "CLUSTER" && !partition.length) ||
                    (partitionPath == "CLUSTER_ID" && partition == "-1"))
                    partition = "none"

                if (!partitions[partition])
                    partitions[partition] = value
                else
                    partitions[partition] += value
            }

            var series = []
            var axis_labels = []
            var i = 0;
            for (partition in partitions) {
                var value = partitions[partition]
                var data;
                switch (dataType){
                case "pie":
                    data = value; break
                case "bars":
                    data = [[i,value]]; break
                case "horizontal_bars":
                    data = [[value,i]]; break
                default:
                    data = value;
                }
                axis_labels.push([i,partition])
                var color = config.colorize ? config.colorize(partition) : null
                series.push({ label: partition,
                             data: data,
                             color: color
                           })
                i++
            }

            if (config.plotOptions.xaxis &&
                config.plotOptions.xaxis.customLabels == true){
                config.plotOptions.xaxis.ticks = axis_labels
                config.plotOptions.xaxis.tickSize = 1
            }

            return series
        }