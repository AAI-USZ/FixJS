function(){
        var rel = KYT.State.get("Relationships");
        $('#FieldColor',this.el).miniColors();
        this.pendingGridView = new KYT.Views.DahsboardGridView({
            el:"#pendingTaskGridContainer",
            url:this.options.pendingGridUrl,
            gridContainer: "#pendingGridHolder",
            id:"pending",
            parentId:rel.entityId,
            rootId: rel.parentId,
            route:"task"
        });
        this.completedGridView = new KYT.Views.DahsboardGridView({
            el:"#completedTaskGridContainer",
            url:this.options.completedGridUrl,
            gridContainer: "#completedGridHolder",
            id:"completed",
            parentId:rel.entityId,
            rootId: rel.parentId,
            route:"taskdisplay"
        });
        this.photoGridView = new KYT.Views.DahsboardGridView({
            el:"#photoGridContainer",
            url:this.options.photoGridUrl,
            gridContainer: "#photoGridHolder",
            id:"photo",
            route:"photo",
            parentId:rel.entityId,
            rootId: rel.parentId,
            parent:"Field"
        });
        this.documentGridView = new KYT.Views.DahsboardGridView({
            el:"#documentGridContainer",
            url:this.options.documentGridUrl,
            gridContainer: "#documentGridHolder",
            id:"documents",
            route:"document",
            parentId:rel.entityId,
            rootId: rel.parentId,
            parent:"Field"
        });

        this.pendingGridView.render();
        this.completedGridView.render();
        this.photoGridView.render();
        this.documentGridView.render();
        this.storeChild(this.pendingGridView);
        this.storeChild(this.completedGridView);
        this.storeChild(this.photoGridView);
        this.storeChild(this.documentGridView);
    }