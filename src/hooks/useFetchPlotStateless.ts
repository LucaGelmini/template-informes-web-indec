// It is not really statless, but it is not responsive to global states

import { useState, useEffect } from "react";
import type { PlotDataTitle } from "../ui/reactPlotlyPlot/Grafico";

const BASE_URL = import.meta.env.BASE_URL;

const useFetchPlotStateless = (endpoint: string, inView: boolean) => {
    const [data, setData] = useState<PlotDataTitle | undefined>(undefined);

    useEffect(() => {
        if (inView && data === undefined) {
            endpoint = BASE_URL + endpoint + ".json";
            fetch(endpoint)
                .then((res) => res.json())
                .then(setData)
                .catch((err) => {
                    throw new Error(
                        `problem fetching data of this endpoint: ${endpoint}\n ${err}`
                    );
                });
        }
    }, [inView]);

    return data;
};

export default useFetchPlotStateless;
