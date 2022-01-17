function getAndValidateEmail(target) {
    var email = (dom.getInner(target) || "").trim();

    if(!validation.email(email)) return null;

    return email;
  }