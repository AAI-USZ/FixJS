function (aAddon) {
    do_check_neq(aAddon, null);
    do_check_eq(aAddon.screenshots.length, 1);
    do_check_true(aAddon.screenshots[0].width === null);
    do_check_true(aAddon.screenshots[0].height === null);
    do_check_true(aAddon.screenshots[0].thumbnailWidth === null);
    do_check_true(aAddon.screenshots[0].thumbnailHeight === null);
    do_check_eq(aAddon.iconURL, undefined);
    do_check_eq(JSON.stringify(aAddon.icons), "{}");
    AddonRepository.shutdown();
  }