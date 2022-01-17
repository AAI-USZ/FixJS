function (jObj)
{
    if (jObj.webGL)
    {
        // start RDGE
        rdgeStarted = true;
        var id = this._canvas.getAttribute( "data-RDGE-id" );
        this._canvas.rdgeid = id;
        RDGE.globals.engine.registerCanvas(this._canvas, this);
        RDGE.RDGEStart(this._canvas);
        this._canvas.task.stop()
    }

    // import the objects
    // there should be exactly one child of the parent object
    if (jObj.children)
    {
        for (var i=0;  i<jObj.children.length;  i++)
            this.importObjectsJSON( jObj.children[i] );
    }
    else
        throw new Error ("unrecoverable canvas import error - inconsistent root object: " + jObj.children );

    if (!this._useWebGL)
    {
        // render using canvas 2D
        this.render();
    }
    else
        this.restartRenderLoop();
}