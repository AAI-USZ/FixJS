function showAliasedContent(req, res, template, block, next) {

  var allowedFormats = ["html","json"];
  var format = req.moduleParams.format;
  var alias = req.moduleParams.alias;

  // Check type
  if(calipso.lib._.any(allowedFormats,function(value) { return value === format; })) {

    var Content = calipso.db.model('Content');

    Content.findOne({alias:alias},function (err, content) {

        if(err || !content) {
          // Create content if it doesn't exist
          if(req.session.user && req.session.user.isAdmin) {
            res.redirect("/content/new?alias=" + alias + "&type=Article") // TODO - make this configurable
          } else {
            res.statusCode = 404;
          }
          next();

        } else {

          calipso.modules.user.fn.userDisplay(req,content.author,function(err, userDetails) {
            if(err) {
              next(err);
            } else {
              // Add the user display details to content
              content.set('displayAuthor',userDetails);
              showContent(req,res,template,block,next,err,content,format);
            }
          });

        }

    });

  } else {

    // Invalid format, just return nothing
    next();

  }

}