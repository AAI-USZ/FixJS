function nodeNameCmp(first, second) {
                a = first.cluster.name;
                b = second.cluster.name;
                if (a.toString() < b.toString()) return -1;
                if (a.toString() > b.toString()) return 1;
                return 0;
            }