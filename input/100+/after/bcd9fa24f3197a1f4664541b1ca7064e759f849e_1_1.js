function () {
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    models = {};

  var UserSchema = new Schema({
    name:         String,
    password:     { type: String, required: true },
    email:        { type: String, required: true, lowercase: true, trim: true },
    assignments:  [{ type: ObjectId, ref: 'Assignment' }],
  });
  models.User = mongoose.model('User', UserSchema);

  var CommentSchema = new Schema({
    text:       { type: String, required: true },
    user:       { type: ObjectId, ref: 'User', required: true } ,
    timestamp:  { type: Date, required: true },
    startLine:  { type: Number, required: true },
    startChar:  { type: Number, required: true },
    endLine:    { type: Number, required: true },
    endChar:    { type: Number, required: true }
  });
  models.Comment = mongoose.model('Comment', CommentSchema);

  var FileSchema = new Schema({
    name:       { type: String, required: true },
    slug:       { type: String, unique: true },
    path:       { type: String, required: true },
    timestamp:  { type: Date, required: true },
    comments:   [{ type: ObjectId, ref: 'Comment' }]
  });
  models.File = mongoose.model('File', FileSchema);

  var CourseSchema = new Schema({
    name:         { type: String, required: true },
    slug:         { type: String, unique: true },
    staff:        [{ type: ObjectId, ref: 'User', required: true }],
    students:     [{ type: ObjectId, ref: 'User' }],
    assignments:  [String]
  });
  models.Course = mongoose.model('Course', CourseSchema);

  var AssignmentSchema = new Schema({
    name:       { type: String, required: true },
    slug:       { type: String, required: true},
    course:     { type: ObjectId, ref: 'Course', required: true },
    user:       { type: ObjectId, ref: 'User', required: true },
    files:      [{ type: ObjectId, ref: 'File' }]
  });
  models.Assignment = mongoose.model('Assignment', AssignmentSchema);

  return models;
}