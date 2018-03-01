/**
 * Sort array of object by key
 *
 * @param arr
 * @param key
 */
export const sortArrayOfObject = (arr, key) => {
        return arr.sort((a,b)=>{
                                    let itemA = typeof key === 'string' ? a[key].toUpperCase() : a[key];
                                    let itemB = typeof key === 'string' ? b[key].toUpperCase() : b[key];

                                    if (itemA < itemB) {
                                        return -1;
                                    }
                                    if (itemA > itemB) {
                                        return 1;
                                    }

                                    return 0;
                                });
};