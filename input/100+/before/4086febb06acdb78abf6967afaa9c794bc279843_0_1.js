function (mongoose) {
  var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    models = {};

  var UserSchema = new Schema({
    name:         String,
    password:     { type: String, required: true },
    email:        { type: String, required: true },
    handins:      [{ type: ObjectId, ref: 'Handin' }],
    courses:      [{ type: ObjectId, ref: 'Course' }],
    staffCourses: [{ type: ObjectId, ref: 'Course' }]
  });
  models.User = mongoose.model('User', UserSchema);

  var CommentSchema = new Schema({
    text:       String,
    user:       UserSchema,
    timestamp:  Date,
    startLine:  Number,
    startChar:  Number,
    endLine:    Number,
    endChar:    Number
  });
  models.Comment = mongoose.model('Comment', CommentSchema);

  var FileSchema = new Schema({
    name:       String,
    text:       String,
    timestamp:  Date,
    comments:   [CommentSchema]
  });
  models.File = mongoose.model('File', FileSchema);

  var CourseSchema = new Schema({
    name:         String,
    staff:        [UserSchema],
    students:     [UserSchema],
    assignments:  [String]
  });
  models.Course = mongoose.model('Course', CourseSchema);

  var HandinSchema = new Schema({
    assignment: String,
    course:     CourseSchema,
    user:       UserSchema,
    files:      [FileSchema]
  });
  models.Handin = mongoose.model('Handin', HandinSchema);

  return models;
}