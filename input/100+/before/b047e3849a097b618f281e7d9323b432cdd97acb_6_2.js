function(co, overwrite, automatic, onlyJson, callback) {

  var onlyJson = onlyJson || false;

  // Get the category path of the CO json
  var catpath = co.CategoryPath.split('/');
  // And check if the folders for those categories exist
  // in the file system, if not create them
  var fileOutputPath = basepath;
  var webOutputUrl = publicOutputUrl;

  for ( var p = 0; p < catpath.length; p++) {
    fileOutputPath += '/' + catpath[p];
    webOutputUrl += '/' + catpath[p];
    if (!path.existsSync(fileOutputPath)) {
      if (fs.mkdirSync(fileOutputPath, 0755)) {
        break;
      }
    }
  }

  baseName = co.Name.replace(/\s/g, '_').replace(/[|&;$%@"<>()+,]/g, '').replace(/\//g,'-');

  // Set the general output path for this content object
  fileOutputPath += '/';

  console.log("StoreData: Name=" + baseName + ' (' + co.Name + ')');

  // Check if the folder for this content object already exists
  path.exists(fileOutputPath + baseName + '.json', function(exists) {
    // Pre check
    if (exists && overwrite === false) {
      console.log('File exists!');
      callback('File already exists and overwrite was not allowed', null);
      return;
    }

    // Write JSON file
    fs.writeFile(fileOutputPath + baseName + '.json', JSON.stringify(co),
            function(error) {
              if (error) {
                throw error;
              }

              console.log('JSON file '
                  + (exists === false ? 'created' : 'overwritten') + ' under '
                  + fileOutputPath + baseName + '.json');

              if (onlyJson !== true) {
                // Create RUCoD for Content Object data
                exports.publishRUCoD(co, fileOutputPath, webOutputUrl, automatic,callback);
              } else {
                callback(null, {
                  message : "JSON successfully saved.",
                  urls : [ webOutputUrl + '/' + baseName + '.json' ]
                });
              }

            });

  });
}