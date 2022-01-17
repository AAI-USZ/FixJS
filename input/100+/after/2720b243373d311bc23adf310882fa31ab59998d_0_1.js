function FileStream( files, type ){

  var self = this;

  stream.Stream.call( self );
  self.readable  = true;
  self.type = type;
  self.encodings = {
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
      self.read( files[i] );
    }

  // Or just pass a File
  } else if( files ){
    self.read( files );
  }

}