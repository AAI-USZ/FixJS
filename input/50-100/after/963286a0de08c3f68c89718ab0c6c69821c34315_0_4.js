function(data) {
        switch(tab) {
            case "users":  	target = "#adminPanel_extension_s1"; break
            case "groups":  	target = "#adminPanel_extension_s2"; break
            case "status":  target = "#adminPanel_extension_s3"; break
            case "advanced":  	target = "#adminPanel_extension_s4"; break
            case "database":   	target = "#adminPanel_extension_s5"; break
            case "customers":  	target = "#adminPanel_extension_s6"; break
            case "projects": 	target = "#adminPanel_extension_s7"; break
            case "activities": 	target = "#adminPanel_extension_s8"; break
        }
        $(target).html(data);
    }