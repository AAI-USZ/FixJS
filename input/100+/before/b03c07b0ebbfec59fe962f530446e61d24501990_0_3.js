function(){
        var rel = KYT.State.get("Relationships");
        $('#FieldColor',this.el).miniColors();
        var pendingGridView = new KYT.Views.DahsboardGridView({
            el:"#pendingTaskGridContainer",
            url:this.options.pendingGridUrl,
            gridContainer: "#pendingGridContainer",
            id:"pending",
            parentId:rel.entityId,
            rootId: rel.parentId,
            route:"task"
        });
        var completedGridView = new KYT.Views.DahsboardGridView({
            el:"#completedTaskGridContainer",
            url:this.options.completedGridUrl,
            gridContainer: "#completedGridContainer",
            id:"completed",
            parentId:rel.entityId,
            rootId: rel.parentId,
            route:"taskdisplay"
        });
        var photoGridView = new KYT.Views.DahsboardGridView({
            el:"#photoGridContainer",
            url:this.options.photoGridUrl,
            gridContainer: "#photoGridContainer",
            id:"photo",
            route:"photo",
            parentId:rel.entityId,
            rootId: rel.parentId,
            parent:"Field"
        });
        var documentGridView = new KYT.Views.DahsboardGridView({
            el:"#documentGridContainer",
            url:this.options.documentGridUrl,
            gridContainer: "#documentGridContainer",
            id:"documents",
            route:"document",
            parentId:rel.entityId,
            rootId: rel.parentId,
            parent:"Field"
        });

        pendingGridView.render();
        completedGridView.render();
        photoGridView.render();
        documentGridView.render();
        this.storeChild(pendingGridView);
        this.storeChild(completedGridView);
        this.storeChild(photoGridView);
        this.storeChild(documentGridView);
    }