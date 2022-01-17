function (token) {
  console.log('Received auth data.');

  this.storeTokenToCookies(token);
  instaedit.signedToGithub = true;
  instaedit.displayNotification('Succesfully logged to github with token ' + token, 'notification');
  instaedit.githubToken = token;
  document.getElementById('commit').innerHTML = 'Commit';
}