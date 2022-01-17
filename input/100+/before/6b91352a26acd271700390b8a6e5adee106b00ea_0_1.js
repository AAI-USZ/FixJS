function () {
            var $figs = $("#figs", doc)
            ,   $tof = $("#tof", doc)
            ;
            expect($figs.find("div.figure").length).toEqual(2);
            expect($figs.find("div.figure div.figcaption").length).toEqual(2);
            expect($figs.find("div.figure div.figcaption").first().text()).toEqual("Fig. 1 PREFIG");
            expect($figs.find("div.figure div.figcaption").last().text()).toEqual("Fig. 2 IMGTIT");
            expect($tof.find("h3:contains('Table of Figures')").length).toEqual(1);
            expect($tof.find("ul li").length).toEqual(2);
            expect($tof.find("ul li a").first().text()).toEqual("Fig. 1 PREFIG");
            expect($tof.find("ul li a").last().text()).toEqual("Fig. 2 IMGTIT");
            flushIframes();
        }