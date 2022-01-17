function update_counter(vl) {
        var area = 0;
        for (i in vl.selectedFeatures) {
            sf = vl.selectedFeatures[i];
            area += sf.data.area;
        }
        $('area').innerHTML = area / 2589988.11; // convert to sq mi 
        $('counter').innerHTML = vl.selectedFeatures.length;
    }