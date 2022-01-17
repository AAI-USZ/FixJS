function closePrimaryUser(callback) {
    this.close("primary_user", _.extend(primaryInfo, {
      email: email,
      requiredEmail: true,
      add: !!auth_level
    }));

    callback && callback();
  }