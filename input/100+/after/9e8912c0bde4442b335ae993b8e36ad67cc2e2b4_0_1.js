function (nb, l, c) {
	/* Check if the number isn't already present in the line */
	for (i = 0; i < 9; i++)
		if (i != c && this.grid[l][i] == nb)
			return false;
	
	/* Check if the number isn't already present in the column */
	for (i = 0; i < 9; i++)
		if (i != l && this.grid[i][c] == nb)
			return false;
	
	/* Check if the number isn't already present in the 3*3 square */
	for (i = ~~(l / 3); i < (~~(l / 3) + 3); i++)
		for (j = ~~(c / 3); j < (~~(c / 3) + 3); j++)
			if ((i != l || j != c) && this.grid[i][j] == nb)
				return false;
	
	return true;
}