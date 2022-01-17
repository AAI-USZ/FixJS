function (resList, callback)
{
  var
    data = [],
    Database = require(process.env.APP_PATH + "/lib/database").Database,
    postLink = require(process.env.APP_PATH + "/models/response/postLink").postLink,
    Post_Decorator_Names = require(process.env.APP_PATH + "/models/post/decorator/names").Post_Decorator_Names,
    Post_Decorator_Tags = require(process.env.APP_PATH + "/models/post/decorator/tags").Post_Decorator_Tags,
    Post_Decorator_Rate = require(process.env.APP_PATH + "/models/post/decorator/rate").Post_Decorator_Rate,
    Post_Decorator_Views = require(process.env.APP_PATH + "/models/post/decorator/views").Post_Decorator_Views,
    usersIds = {},
    databaseQuery = [],
    postsIds = {};

  //get all users ids
  for (var lp in resList) {
    if (resList.hasOwnProperty(lp)) {
      var
        post = resList[lp],
        userId = post.getUserId();

      usersIds[userId] = '';
      postsIds[post.getId()] = '';
    }
  }

  var
    userNamesObj = new Post_Decorator_Names(usersIds),
    postRateObj = new Post_Decorator_Rate(postsIds),
    postViewsObj = new Post_Decorator_Views(postsIds),
    postTagsObj = new Post_Decorator_Tags(postsIds);

  //prepare on big database query batch
  databaseQuery.push(userNamesObj.prepareKeys());
  databaseQuery.push(postRateObj.prepareKeys());
  databaseQuery.push(postViewsObj.prepareKeys());
  databaseQuery.push(postTagsObj.prepareKeys());

  Database.batch(databaseQuery, function (err, resBatch) {

    userNamesObj.load(resBatch[0]);
    postRateObj.load(resBatch[1]);
    postViewsObj.load(resBatch[2]);
    postTagsObj.load(resBatch[3]);

    for (var lp in resList) {
      if (resList.hasOwnProperty(lp)) {
        var
          post = resList[lp];

        data.push(new postLink(post, userNamesObj, postTagsObj, postRateObj, postViewsObj));
      }
    }

    return callback(null, data);
  });
}