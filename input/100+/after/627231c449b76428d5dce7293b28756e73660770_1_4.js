function () {

        var sectionDiv = $('#' + self.uniqueId);

        //$(window).animate({'scrollLeft': sectionDiv.offset().left});

        $(window).scrollLeft(sectionDiv.offset().left-100);

    }