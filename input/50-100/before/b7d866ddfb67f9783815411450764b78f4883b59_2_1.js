function(event) {
        console.debug("moveItemUp:  currentjsTreeData:",this.currentjsTreeData);
        console.debug("moveItemUp: data.rslt.obj.attr('id'): ",jsTreeObject.currentjsTreeData.rslt.obj.attr("id"));

        console.debug("move item down next:",$("#xfDoc"));
        console.debug("move item down next:",$("#xfDoc").jstree);

        // console.debug("move item down tree index:",$("#xfDoc").jstree("get_next",this.currentjsTreeData.rslt.obj));
        console.debug("move item down tree index:",$.jstree._reference("#xfDoc").get_index());


        // console.debug("moveItemUp: data.inst._get_parent(this).attr('id'): ",this.currentjsTreeData.inst._get_parent(this).attr("id"));
        // console.debug("moveItemUp: data.rslt.obj.attr('rel'): ",this.currentjsTreeData.rslt.obj.attr("rel"));
        //console.debug("move item up :",$.tree_reference('xfDoc').get_prev());
    }