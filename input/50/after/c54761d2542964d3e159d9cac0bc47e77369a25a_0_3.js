function logout() {
      window.console.log('Logout');
      clearStorage();

      document.location =
              'https://m.facebook.com/logout.php?next=' +
                  encodeURIComponent(getLocation() + '?logout=1') +
                  '&access_token=' + accessToken;
    }