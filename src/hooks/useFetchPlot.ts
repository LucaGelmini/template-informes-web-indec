import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { isMonthly } from "../states/dataPeriod";
import type { PlotDataTitle } from "../ui/reactPlotlyPlot/Grafico";

const BASE_URL = import.meta.env.BASE_URL;

const useFetchPlot = (
    endpoint: string,
    dataStates: boolean,
    inView: boolean
) => {
    const [[monthlyData, accumData], setData] = useState<
        Array<PlotDataTitle | undefined>
    >([undefined, undefined]);

    const $isMonthly = useStore(isMonthly);

    useEffect(() => {
        /*
        It fetchs when:
         - The plot is in view,
         - If the plot is state sensible:
            - When it has not the data for the state required
         - If it is not state sensible:
            - If mothlyData is undefined. In this callback
            always the data is tranfered to monthlyData even if it was fetched in
            the other state
        */
        if (
            inView &&
            ((dataStates &&
                (($isMonthly && monthlyData === undefined) ||
                    (!$isMonthly && accumData === undefined))) ||
                (!dataStates && monthlyData === undefined))
        ) {
            if (dataStates) {
                endpoint = $isMonthly
                    ? endpoint + "_mensual"
                    : endpoint + "_acumulado";
            }
            endpoint = BASE_URL + endpoint + ".json";
            fetch(endpoint)
                .then((res) => res.json())
                .then((resData) =>
                    setData(
                        $isMonthly
                            ? [resData, accumData]
                            : [monthlyData, resData]
                    )
                )
                .catch((err) => {
                    throw new Error(
                        `problem fetching data of this endpoint: ${endpoint}\n ${err}`
                    );
                });
        }
        if (!dataStates) {
            setData(
                monthlyData !== undefined
                    ? [monthlyData, monthlyData]
                    : accumData !== undefined
                    ? [accumData, accumData]
                    : [undefined, undefined]
            );
        }
    }, [$isMonthly, inView]);

    return $isMonthly ? monthlyData : accumData;
};

export default useFetchPlot;
