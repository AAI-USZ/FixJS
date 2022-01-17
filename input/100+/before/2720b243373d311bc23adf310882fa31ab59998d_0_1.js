function FileStream( files, type ){

  if( !(this instanceof FileStream) ){
    throw new Error("FileStream is a constructor. Try using `new`");
  }

  stream.Stream.call( this );
  this.readable  = true;
  this.type = type;
  this.encodings = {
    binary:  'readAsBinaryString',

    buffer:  'readAsArrayBuffer',

    url:     'readAsDataURL',
    dataUrl: 'readAsDataURL',
    dataURL: 'readAsDataURL',

    string:  'readAsText',
    text:    'readAsText'
  };

  // Iterate over FileLists
  if( files instanceof FileList ){

    for( var i = 0; i < files.length; i++ ){
      this.read( files[i] );
    }

  // Or just pass a File
  } else if( files ){
    this.read( files );
  }

}