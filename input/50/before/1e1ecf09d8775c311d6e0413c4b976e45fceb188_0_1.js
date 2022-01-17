function () { // artificial delay to make bruteforcing less practical
        logout(req);
        throw new UserError('Wrong authentication.', 400);
      }