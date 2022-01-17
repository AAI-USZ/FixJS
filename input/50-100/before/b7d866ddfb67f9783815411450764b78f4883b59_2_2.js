function(event) {
        console.debug("move item down event:",event, "currentjsTreeData:",this.currentjsTreeData);
        console.debug("moveItemUp: data.rslt.obj.attr('id'): ",this.currentjsTreeData.rslt.obj.attr("id"));
        console.debug("move item down next:",$("#xfDoc"));
        console.debug("move item down next:",$("#xfDoc").jstree);

        var data = this.currentjsTreeData.rslt.obj;


        // console.debug("move item down tree index:",$("#xfDoc").jstree("get_next",data.ui.selected,false));
        console.debug("move item down tree index:",$.jstree._reference("#xfDoc").get_index());

        //console.debug("move item down next:",$.tree_reference('xfDoc').get_next());
        // console.debug("moveItemUp: data.inst._get_parent(this).attr('id'): ",this.currentjsTreeData.inst._get_parent(this).attr("id"));
        // console.debug("moveItemUp: data.rslt.obj.attr('rel'): ",this.currentjsTreeData.rslt.obj.attr("rel"));

    }