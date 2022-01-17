function closePrimaryUser(callback) {
    this.close("primary_user", helpers.extend(primaryInfo, {
      email: email,
      requiredEmail: true,
      add: !!auth_level
    }));

    callback && callback();
  }