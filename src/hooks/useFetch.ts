import type { DependencyList } from "react";
import { useState, useEffect } from "react";

const useFetch = (endpoint: string, dependencies: DependencyList) => {
    const [data, setData] = useState<any | null>(null);

    useEffect(() => {
        fetch(endpoint)
            .then((res) => res.json())
            .then(setData)
            .catch((err) => {
                throw new Error(
                    `problem fetching data of this endpoint: ${endpoint}\n ${err}`
                );
            });
    }, dependencies);
    return data;
};

export default useFetch;
