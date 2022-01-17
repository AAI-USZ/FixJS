function resizeWidth()
{
  var main_area = document.getElementById("main_area");
  try {
    main_area.style.width = parseInt(window.innerWidth - 155) + "px";
  } catch (e) {
    main_area.style.width = parseInt(document.documentElement.clientWidth - 138) + "px";
  }

  var current_toonlist = document.getElementById("current_toonlist");
  var finished_toonlist = document.getElementById("finished_toonlist");

  if (current_toonlist && finished_toonlist)
  {
    toon1 = document.getElementById("current_toonlist").getElementsByTagName("div");
    toon2 = document.getElementById("finished_toonlist").getElementsByTagName("div");
    for (i = 0; i < toon1.length; i++)
      toon1[i].style.width = parseInt(parseInt(main_area.style.width) / 7 - 2) + "px";
    for (i = 0; i < toon2.length; i++)
      toon2[i].style.width = parseInt(parseInt(main_area.style.width) / 7 - 2) + "px";
  }
  // only for Yahoo 웹툰
  if (document.getElementById("special_toonlist"))
  {
    toon = document.getElementById("special_toonlist").getElementsByTagName("div");
    for (i = 0; i < toon.length; i++)
      toon[i].style.width = parseInt(parseInt(main_area.style.width) / 7 - 2) + "px";
  }

  try {
    document.getElementById("remote").style.top = parseInt(window.innerHeight / 2 - 160) + "px";
  } catch (e) {
    document.getElementById("remote").style.top = parseInt(document.documentElement.clientHeight / 2 - 160) + "px";
  }
}