function(areConditionsMet)

{

    if (areConditionsMet)

    {

        if (this.targetItem.item != null)

        {

            if (this.destItem.item != null)

            {

                this.targetItem.item.moveItem(this.destItem.item);

            }

            else

            {

                // Delete the item

                // TODO

            }

        }

    }

    return true;

}