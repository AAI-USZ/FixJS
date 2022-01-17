function ia_init() {
  userCode=document.getElementById('code').value;
  ia_green_update_user=function (me) {
    try {
      eval(userCode);
    }
    catch (err) {
      window.alert(err);
      stop();
      return (false);
    }
    return (true);
  }
}