function (size, useKey) {
  size = size || 'large';
  return this.links.images.profile[size] + (!!useKey ? ('?r=' + this.getProfilePicKey()) : '');
}