function defaultPrefs() {
  return {
    domainBlacklist: [
      'facebook.com',
      'youtube.com',
      'twitter.com',
      'myspace.com',
      'livejournal.com',
      'digg.com',
      'reddit.com',
      'kongregate.com',
      'newgrounds.com',
      'addictinggames.com',
      'hulu.com'
    ],
    domainWhitelist: [
      'google.com/calendar',
      'rememberthemilk.com',
      '750words.com'
    ],
    durations: { // in seconds
      work: 25 * 60,
      break: 5 * 60
    },
    shouldRing: true,
    clickRestarts: false,
    whitelist: false
  }
}