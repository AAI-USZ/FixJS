function select_assigned()
{
    var assigned = $('milestone_assigned_projects');
    for (x = 0; x < assigned.options.length; x++)
    {
        assigned.options[x].selected = true;
    }
    return true;
}