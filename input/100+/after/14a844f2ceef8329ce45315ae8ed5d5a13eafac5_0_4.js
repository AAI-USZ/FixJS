function githubUser () {
    if (!user) {
        var box = document.getElementById("user");
        user = box.getElementsByClassName("name")[0].innerHTML;
    }
    return user;
}