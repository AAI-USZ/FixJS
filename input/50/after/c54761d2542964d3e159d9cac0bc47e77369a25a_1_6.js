function logout(accessToken) {
      window.console.log('Logout');
      clearStorage();

      document.location =
              'https://www.facebook.com/logout.php?next=' +
                  encodeURIComponent(getLocation() + '#state=logout') +
                  '&access_token=' + accessToken;
    }