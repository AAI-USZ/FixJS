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
    user:       { type: ObjectId, ref: 'UserSchema', required: true } ,
    timestamp:  { type: Date, required: true },
    startLine:  { type: Number, required: true },
    startChar:  { type: Number, required: true },
    endLine:    { type: Number, required: true },
    endChar:    { type: Number, required: true }
  });
  models.Comment = mongoose.model('Comment', CommentSchema);

  var FileSchema = new Schema({
    name:       { type: String, required: true },
    text:       { type: String, required: true },
    timestamp:  { type: Date, required: true },
    comments:   [{ type: ObjectId, ref: 'CommentSchema' }]
  });
  models.File = mongoose.model('File', FileSchema);

  var CourseSchema = new Schema({
    name:         { type: String, required: true },
    staff:        [{ type: ObjectId, ref: 'UserSchema', required: true }],
    students:     [{ type: ObjectId, ref: 'UserSchema' }],
    assignments:  [String]
  });
  models.Course = mongoose.model('Course', CourseSchema);

  var AssignmentSchema = new Schema({
    name:       { type: String, required: true },
    course:     { type: ObjectId, ref: 'CourseSchema', required: true },
    user:       { type: ObjectId, ref: 'UserSchema', required: true },
    files:      [{ type: ObjectId, ref: 'FileSchema' }]
  });
  models.Assignment = mongoose.model('Assignment', AssignmentSchema);

  return models;
}