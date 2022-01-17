function(query,callback) {
  trimQuery(query);
  if(blankQuery(query)) { callback(null,{"books":[]}) };
  course.Course.find({})
    .regex('_id', new RegExp("^" + utils.sanitizeForRegex(query.course_number) + ".*","i"))
    .regex('name', new RegExp(".*" + utils.sanitizeForRegex(query.course_name) + ".*","i"))
    .exec(function(err,courses){
      if(err) {
        console.log("There's an error but I haven't figured out how to propagate it yet.")
      }
      else {
        var course_ids = [];
        var course_dictionary = {};

        /* Build array of course_ids */
        courses.forEach(function(course){ course_ids.push(course._id) });
        /* Build course_dictionary where key is course_id and value is course */
        courses.forEach(function(course){ course_dictionary[course._id] = course; });

        book.Book.find({"course_ids":{"$in":course_ids }})
          .regex('title', new RegExp(".*" + utils.sanitizeForRegex(query.textbook_name) + ".*","i"))
          .limit(10)
          .exec(function(err,books) {
            callback(err,{"books":books,"course_dictionary":course_dictionary})
          });
      }
    });
}