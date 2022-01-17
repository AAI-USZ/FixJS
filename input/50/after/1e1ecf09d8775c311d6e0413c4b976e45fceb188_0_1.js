function () { // artificial delay to make bruteforcing less practical
        logout(req);
        next(new UserError('Wrong authentication.', 400));
      }