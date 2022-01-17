The three folders contain datasets of different sizes:

 - 50: functions with less than 50 tokens
 - 50-100: number of tokens range between 50 and 100
 - 100+: the function length exceeds 100 tokens (no upper bound)

Each of these folders contain the following files and folders:

 - `before`: this folder contains the before commit state of each JavaScript function. The file namings here follow the pattern `[commit_hash]_[file_index]_[function_index]`
 - `after`: same as for the before folder, but here the after state is stored. Note that the naming convention is the same, so pairing before- and after files is quite simple.
 - `{before/after}_idiom_{50, 1000, 2000}.txt`: the dataset in idiomized representation with different idiom sets (N = {50, 1000, 2000})
 - `{before/after}_mapped.txt`: the mapped dataset (same as idiomized where the idiom set is empty)
 - `{before/after}_tokenized.txt`: the tokenized dataset
 - `map.txt`: contains the mapping (real world identifiers) for the idiomized and mapped datasets.