# FixJS
The FixJS dataset contains information on every publicly available bug-fixing commit that affected JavaScript files in the first half of 2012. We started from scratch, and created ~300k samples in three settings including different source code representations. In the table below we summarize the assembled datasets. There we can see that the **Large** subset contains the majority of the samples, this and the sheer size of the functions implies that its size in megabytes is also the greatest.

## FixJS: A Dataset of Bug-fixing JavaScript Commits

This repository contains open science data used in the paper 

> V. Csuvik and L. Vidacs,  **FixJS: A Dataset of Bug-fixing JavaScript Commits**

submitted at the Proceedings of the [19th International Conference on Mining Software Repositories (MSR '22)](https://conf.researchr.org/track/msr-2022/msr-2022-data-showcase).

FixJS contains both single- and multi-line bugs. Before- and after state of the mined functions are differentiated using their Abstract Syntax Tree, meaning that if only comments have changed the samples are filtered out.

The repository contains 2 folders:
 - commits: raw information about the commits
 - input: contains the constructed dataset

In each directory we procide a README file that describes the structure of the folder in question.
 
## Get your hands dirty!
1. Clone the repository and pick a dataset size (50, 100 or 100+)
```bash
git clone https://github.com/RGAI-USZ/FixJS.git
cd FixJS/input/50/
```

2. Load the before_ _rep_.txt and after_ _rep_.txt (where _rep_ can be [idiom, mapped, tokenized])
```python
from pathlib import Path
 
buggy_data = Path('./before_tokenized.txt').read_text(encoding='utf-8').splitlines()
fixed_data = Path('./after_tokenized.txt').read_text(encoding='utf-8').splitlines()
```

3. Split the dataset and train the model
```python
data_len = len(buggy_data)
indices = np.arange(data_len)
np.random.seed(13)
np.random.shuffle(indices)
 
buggy_data = np.array(buggy_data, dtype=object)[indices].tolist()
fixed_data = np.array(fixed_data, dtype=object)[indices].tolist()
valid_start = int(data_len * 0.8)
test_start = valid_start + int(data_len * 0.1)
 
train_input, train_target = buggy_data[:valid_start], fixed_data[:valid_start]
valid_input, valid_taret = buggy_data[valid_start:test_start], fixed_data[valid_start:test_start]
test_input, test_target = buggy_data[test_start:], fixed_data[test_start:]
 
train_model(train_input, train_target, valid_input, valid_taret)
```

4. Evaluate the model on the test set
```python
evaluate_model(test_input, test_target)
```

[![DOI](https://zenodo.org/badge/448797879.svg)](https://zenodo.org/badge/latestdoi/448797879)
