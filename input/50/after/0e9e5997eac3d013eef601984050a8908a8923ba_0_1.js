function toggle_topic(toggler,toggleNum)
{
    if(document.getElementById)
    {
        imageSwitch = toggler;
        targetElement = toggler.parentNode.parentNode.nextSibling; // Called from a <td>  or <div> inside a <tr> or <li> so find the next <tr> or <li>.

        toggleexacttopic(targetElement,imageSwitch,toggleNum,false,true);
    }
}