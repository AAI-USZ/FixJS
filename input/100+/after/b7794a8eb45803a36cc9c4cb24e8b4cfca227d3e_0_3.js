function findInBuffer(buffer, bytes)
{
	var ptr = 0, idx = 0;
	while (ptr < buffer.length)
	{
		if (buffer[ptr] === bytes[idx])
		{
			idx++;
			if (idx === bytes.length)
				return (ptr - bytes.length + 1);
		}
		else
			idx = 0;
		ptr++;
	}
	return -1;
}