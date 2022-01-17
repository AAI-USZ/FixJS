function(event, ui) {
        $axis = $(event.target).parent().parents('.fields_list_body');
        var source = "";
        var target = "ROWS";
        
        if ($axis.hasClass('rows')) { source = "ROWS"; target= "COLUMNS"; }
        if ($axis.hasClass('columns')) { source = "COLUMNS"; target="ROWS"; }
        if ($axis.hasClass('filter')) { source = "FILTER"; target="COLUMNS"; }

        var sortOrder = "";
        if ($(event.target).hasClass('none')) sortOrder = "none";
        if ($(event.target).hasClass('BASC')) sortOrder = "BASC";
        if ($(event.target).hasClass('BDESC')) sortOrder = "BDESC";

        var memberpath = $(event.target).parent().find('a').attr('href').replace('#', '').split('/');
        var member = "-";
        if ($(event.target).parent().hasClass('d_dimension')) {
            member = memberpath[2] + ".CurrentMember.Name";
            $axis.find('.d_dimension .sort').removeClass('BASC').removeClass('BDESC').addClass('none');
            $axis.parent().parent().find("." + target.toLowerCase() + " .d_measure .sort").removeClass('BASC').removeClass('BDESC').addClass('none');
            target = source;
        } else {
            member = memberpath[memberpath.length -1];
            $axis.find('.d_measure .sort').removeClass('BASC').removeClass('BDESC').addClass('none');
            $axis.parent().parent().find("." + target.toLowerCase() + " .d_dimension .sort").removeClass('BASC').removeClass('BDESC').addClass('none');
        }

        var futureSortOrder = "none";
        if (sortOrder == "none") futureSortOrder = "BASC";
        if (sortOrder == "BASC") futureSortOrder = "BDESC";
        if (sortOrder == "BDESC") futureSortOrder = "none";
        


        $(event.target).removeClass('none').addClass(futureSortOrder);

        if (futureSortOrder == "none") {
            var url = "/axis/" + target + "/sort/";
            this.workspace.query.action.del(url, {
                success: this.workspace.query.run
            });
        } else {
            var url = "/axis/" + target + "/sort/" + futureSortOrder + "/" + member;
            this.workspace.query.action.post(url, {
                success: this.workspace.query.run
            });
        }

    }