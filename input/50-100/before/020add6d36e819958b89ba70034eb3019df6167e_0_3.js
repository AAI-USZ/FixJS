function(res) {
              clearTimeout(failSafe);
              ok(res, 'The login response has data');
              equal(res.status, 'okay', 'Login status is "okay"');
              ok(res.email, 'The login has an email: ' + res.email);
              equal(res.email, butter.cornfield.user(), "Email is stored");
              start();
            }