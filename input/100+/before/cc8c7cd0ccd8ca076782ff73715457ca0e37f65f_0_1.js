function FPSViewer( params ) {
    console.log( "Constructing FPSViewer" );
    this._model = params.exposedModel;
    this._key = params.key;
    this._bbKey = params.boundingBoxKey;

    //...


    var viewDirection = vec3.createFrom( 0, 0, -1 );
    var viewRight = vec3.createFrom( 1, 0, 0 );
    var viewUp = vec3.createFrom( 0, 1, 0 );

    this._orientation = quat4.fromAxes( viewDirection, viewRight, viewUp );

    this._rotationStart = vec3.createFrom(0, 0, 0);

    this._cameraPosition = vec3.createFrom( 0, 0, 5 );
    this._lookAtPosition = vec3.createFrom( 0, 0, -1 );

    this._bbmin = vec3.create();
    this._bbmax = vec3.create();
    this.getBoundingBoxFromModel();

    this._modelView = mat4.identity( mat4.create() );
    this._projection = mat4.identity( mat4.create() );
    this._near  = 0.0001;
    this._far = 1.0;

    var viewer = this._model.getElementValue(  this._key );
    this._width = viewer.getElementValue( "width" );
    this._height = viewer.getElementValue( "height" );
    this._aspect = this._width / this._height ;

    this.calculateMatrices();

}