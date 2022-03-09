# FixJS
The FixJS dataset contains information on every publicly available bug-fixing commit that affected JavaScript files in the first half of 2012. We started from scratch, and created ~300k samples in three settings including different source code representations. In the table below we summarize the assembled datasets. There we can see that the **Large** subset contains the majority of the samples, this and the sheer size of the functions implies that its size in megabytes is also the greatest.

# FixJS: A Dataset of Bug-fixing JavaScript Commits

This repository contains open science data used in the paper 

> V. Csuvik and L. Vidacs,  **FixJS: A Dataset of Bug-fixing JavaScript Commits**

submitted at the Proceedings of the [19th International Conference on Mining Software Repositories (MSR '22)](https://conf.researchr.org/track/msr-2022/msr-2022-data-showcase).

FixJS contains both single- and multi-line bugs. Before- and after state of the mined functions are differentiated using their Abstract Syntax Tree, meaning that if only comments have changed the samples are filtered out.

The repository contains 2 folders:
 - commits: raw information about the commits
 - input: contains the constructed dataset

In each directory we procide a README file that describes the structure of the folder in question.
 

[![DOI](https://zenodo.org/badge/448797879.svg)](https://zenodo.org/badge/latestdoi/448797879)
