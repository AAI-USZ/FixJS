function () {
    
    for (var m in this.modelMap) {
        this.modelMap[m].primitive.built = false;
    }

    function replacer(key, value) {
        if (key === "bufferStreams")
        {
            var nStreams = value.length;
            for (iStream=0;  iStream<nStreams;  iStream++)
            {
                var arr = value[iStream];
                var n = arr.length;
                for (var i=0;  i<n;  i++)
                {
                    var val = arr[i];
                    arr[i] = val.toFixed ? Number(val.toFixed(4)) : val;
                }
            }
        }

        return value;
    }

    return JSON.stringify(this.modelMap, replacer);
}