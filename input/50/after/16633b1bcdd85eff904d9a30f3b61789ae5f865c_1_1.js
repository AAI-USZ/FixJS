function remove_a_dev(dev) {
    var devToBeRemoved = $(dev).siblings(".dev_name").text();

    removeDevFromDevNamesCookie(devToBeRemoved);
    removeDevFromPairCookie(devToBeRemoved);

    location.reload();
}