function (aAddon) {
    do_check_neq(aAddon, null);
    do_check_eq(aAddon.screenshots.length, 1);
    do_check_true(aAddon.screenshots[0].width === null);
    do_check_true(aAddon.screenshots[0].height === null);
    do_check_true(aAddon.screenshots[0].thumbnailWidth === null);
    do_check_true(aAddon.screenshots[0].thumbnailHeight === null);
    AddonRepository.shutdown();
  }