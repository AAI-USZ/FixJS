function(json){
        if(!parseInt(json.total)) return;
        var htmlStr=_mtt.lang.get('workspaces') + '&nbsp;&nbsp;&nbsp;';
        $.each(json.list, function(i,item){
            if (i==0) _mtt.project=item.project.id;
            htmlStr += '<a href="#" id="project_'+item.project.id+'_'+item.role+'" class="weak">'+item.project.title+'</a>&nbsp;&nbsp;&nbsp;';
        });
        $('#projectList').html(htmlStr);
        this.loadProject(_mtt.project);
    }