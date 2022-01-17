function(data) {
        switch(tab) {
            case "usr":  	target = "#ap_ext_s1"; break
            case "grp":  	target = "#ap_ext_s2"; break
            case "status":  target = "#ap_ext_s3"; break
            case "adv":  	target = "#ap_ext_s4"; break
            case "db":   	target = "#ap_ext_s5"; break
            case "knd":  	target = "#ap_ext_s6"; break
            case "pct": 	target = "#ap_ext_s7"; break
            case "evt": 	target = "#ap_ext_s8"; break
        }
        $(target).html(data);
    }