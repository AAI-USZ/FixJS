function move_selected_milestone_to_assigned()
{
    move('available_milestones', 'milestone_assigned_milestones');
}