function(module, exports, require){
var resourceful = require("../resourceful");

var Account = exports.Account = resourceful.define("account");

Account.withCredentials.create = true;

Account.find = function (params, callback) {
  this._request
    .get(this.url())
    .send(params)
    .set('Accept', this.schema.mediaType)
    .set(this.auth())
    .on('error', callback)
    .end(this.parseResponse(callback));
};

Account.initPasswordReset = function (email, callback) {
  this._request
    .post(this.url() + '/pwforgot')
    .send({ email: email })
    .set('Accept', this.schema.mediaType)
    .on('error', callback)
    .end(this.parseResponse(callback));
};

Account.resetPassword = function (resetParams, callback) {
  this._request
    .post(this.url() + '/pwreset')
    .send(resetParams)
    .set('Accept', this.schema.mediaType)
    .on('error', callback)
    .end(this.parseResponse(callback));
};

Account.prototype.setProfilePicCrop = function (cropSelection, callback) {
  var r = this.constructor._request
    .put(this.url() + '/profilepic')
    .send(cropSelection)
    .set(this.auth())
    .set('Accept', this.constructor.schema.mediaType)
    .on('error', callback)
    ;
  this.constructor.acceptCookiesFor(r);
  r.end(this.constructor.parseResponse(callback));
};

Account.prototype.getFullName = function () {
  var first = this.get('first_name') || '';
  var last = this.get('last_name') || '';
  if (!first && !last) {
    return this.get('slug');
  }
  return first + ((first || last) ? ' ' : '') + last;
}

Account.prototype.getShortName = function () {
  return this.get('first_name') || this.get('slug');
}

Account.prototype.productGroups = function (callback) {
  if(!this.links || !this.links.productGroups) return callback();

  this.constructor._request
    .get(this.links.productGroups.href)
    .on('error', callback)
    .end(this.constructor.parseResponse(callback));
};

Account.prototype.hasCustomProfilePic = function () {
  return !!this.get('profile_pic_exists');
};

Account.prototype.getProfilePic = function (size) {
  size = size || 'large';
  return this.links.images.profile[size];
};

Account.prototype.getProfilePicOriginal = function () {
  return this.getProfilePic('original');
};

Account.prototype.getProfilePicLarge = function () {
  return this.getProfilePic('large');
};

Account.prototype.getProfilePicSmall = function () {
  return this.getProfilePic('small');
};

Account.prototype.getLastProfilePicCropSelection = function () {
  //TODO: make defaults configurable
  return {
    x1: this.get('profile_pic_crop_x1') || 1,
    y1: this.get('profile_pic_crop_y1') || 1,
    x2: this.get('profile_pic_crop_x2') || 200,
    y2: this.get('profile_pic_crop_y2') || 90
  }
};

}