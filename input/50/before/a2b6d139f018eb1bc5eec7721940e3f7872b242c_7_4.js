function(d) {
                var data = d.data;
                if (data.value == 0)
                    return "";
                return labelFunction(d);
            }