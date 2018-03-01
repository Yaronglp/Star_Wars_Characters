function createRequest(url, method){
    return (new Request(url, {
                                method: method,
                                mode: 'cors'
                              }
                       ));
}

function fetchData(url, method){
    let request = createRequest(url, method);
    let fetchedData = [];

    return fetch(request)
            .then((res, rej) => {
                return (res.status === 200) ? res.json() : rej(new Error('Status is not valid'));
            })
            .then((res) => {
                if(res.results)
                    fetchedData = [...fetchedData, ...res.results];
                else
                    fetchedData.push(res);

                if(res.next){
                    return fetchAllPages(url,
                                         res.results.length,
                                         res.count,
                                         fetchedData);
                }

                return fetchedData;
            })
            .catch((e) => {
                console.error(e.message);
                throw new Error("Problem getting Star wars data from the API");
            });
}

export function fetchDataFromURL(url) {
    return fetchData(url, 'GET');
}

export function fetchDataFromURLS(list){
    let fetchCalls = [];
    let fetchedData = [];

    for(let item of list){
        fetchCalls.push(fetchData(item, 'GET'));
    }

    return Promise.all(fetchCalls)
        .then(res => {
            res.forEach((item) => {
                fetchedData.push(...item);
            });

            return fetchedData;
        })
        .catch(e => {
            console.error(e.message);
        });
}

const fetchAllPages = (url, resCount, totalCount, fetchedData) => {
    const fetchCalls = [];
    let pageCount = Math.ceil(totalCount / resCount);

    for(let i=2 ; i <= pageCount ; ++i){
        let request = createRequest(`${url}?page=${i}`, 'GET');

        fetchCalls.push(fetch(request));
    }

    return Promise.all(fetchCalls)
        .then((responseArr) => {
            return Promise.all(responseArr.map((item) => item.json()));
        })
        .then((result) => {
            result.forEach((item) => {
                fetchedData = [
                    ...fetchedData,
                    ...item.results
                ];
            });

            return fetchedData;
        })
        .catch(() => {
            throw new Error("Unable to fetch all Star Wars pages");
        });
};