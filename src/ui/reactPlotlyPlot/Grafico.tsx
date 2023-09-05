import type { PlotlyDataLayoutConfig, Data } from "plotly.js";

import { useLayoutEffect, lazy, useState, Suspense, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import useFetchPlot from "../../hooks/useFetchPlot";

import Spinner from "./components/Spinner";

import { useStore } from "@nanostores/react";
import { listenKeys } from "nanostores";
import { isMonthly } from "../../states/dataPeriod";
import { sectionsStore } from "../../states/sectionsStates";

import "./mainStyles.css";
import DownloadPlotTable from "./components/downloadPlotTable/DownloadPlotTable";

const Plot = lazy(() => import("react-plotly.js"));

export interface Props {
    sectionName: string;
    divClassName?: string;
    titleClassName?: string;
    toFetch?: boolean;
    dataPath: string | PlotDataTitle;
    slider?: boolean;
    dataStates?: boolean;
    downloadTable?: boolean;
}

export type PlotDataTitle = { plot: PlotlyDataLayoutConfig; title: string };

const Grafico = ({
    divClassName = "w-full h-[500px]",
    toFetch = true,
    dataPath,
    titleClassName = "hidden",
    slider = false,
    dataStates = false,
    downloadTable = true,
    sectionName,
}: Props) => {
    const $isMonthly = useStore(isMonthly);
    const { ref, inView, entry } = useInView({ threshold: 0 });
    const plotDataTitle = toFetch
        ? useFetchPlot(dataPath as string, dataStates, inView)
        : (dataPath as PlotDataTitle);

    const [plotRange, setPlotRange] = useState([0, 1]);
    const [plotData, setPlotData] = useState<Data[] | undefined>(
        plotDataTitle?.plot.data
    );
    const [[width, height], setDivSize] = useState([0, 0]);

    useEffect(() => {
        const sectionState = sectionsStore.get()[`${sectionName}`];
        const initThumbs: [number, number] =
            sectionState && sectionState.rangeSlider
                ? sectionState.rangeSlider
                : [0, 1];

        setPlotRange(initThumbs);

        listenKeys(sectionsStore, [`${sectionName}.rangeSlider`], (state) => {
            const stateRange = state[sectionName].rangeSlider;
            setPlotRange(stateRange !== undefined ? stateRange : [0, 1]);
        });
    }, []);

    useEffect(() => {
        if (!slider) return setPlotData(plotDataTitle?.plot.data);
        const inRangeData = plotDataTitle?.plot.data.map((d) => {
            const datum = d as Plotly.PlotData;
            const x = datum.x.slice(
                plotRange[0] * datum.x.length,
                plotRange[1] * datum.x.length
            );

            const y = datum.y.slice(
                plotRange[0] * datum.y.length,
                plotRange[1] * datum.y.length
            );

            const customdata =
                datum.customdata !== undefined
                    ? datum.customdata.slice(
                          plotRange[0] * datum.customdata.length,
                          plotRange[1] * datum.customdata.length
                      )
                    : [null];

            return { ...datum, x, y, customdata };
        });
        return setPlotData(inRangeData);
    }, [plotRange, plotDataTitle?.plot.data]);

    useLayoutEffect(() => {
        if (inView) {
            if (entry === undefined) return;
            const t = entry.target as HTMLElement;
            setDivSize([t.offsetWidth, t.offsetHeight]);
        }
    }, [inView, entry]);

    return (
        <div className="h-full w-full">
            {plotDataTitle?.title !== undefined ? (
                <h3
                    className={`mx-auto text-lg font-semibold ${titleClassName}`}
                >
                    {plotDataTitle.title}
                </h3>
            ) : null}
            <div ref={ref} className={divClassName}>
                <Suspense
                    fallback={<Spinner className="m-auto h-full w-full" />}
                >
                    {plotDataTitle == null || plotData == null ? (
                        <Spinner className="h-full w-full" />
                    ) : (
                        <Plot
                            data={plotData}
                            layout={{
                                width,
                                height,
                                // margin: { l: 55, r: 0, t: 0, b: 10 },
                                //pad: { l: 0, r: 0, t: 0, b: 0 },
                                ...plotDataTitle.plot.layout,
                            }}
                            config={{
                                modeBarButtonsToRemove: [
                                    "pan2d",
                                    "select2d",
                                    "lasso2d",
                                    "autoScale2d",
                                    "resetScale2d",
                                    "zoom2d",
                                    "zoomOut2d",
                                    "zoomIn2d",
                                    "toImage",
                                ],
                                displaylogo: false,
                                responsive: true,
                            }}
                        />
                    )}
                </Suspense>
            </div>
            {toFetch && typeof dataPath === "string" && downloadTable ? (
                <DownloadPlotTable
                    fetchPath={`${dataPath.replace("/plots/", "/cuadros/")}${
                        dataStates
                            ? $isMonthly
                                ? "_mensual"
                                : "_acumulado"
                            : ""
                    }.xlsx`}
                    fileName={`${
                        dataPath.split("/")[dataPath.split("/").length - 1]
                    }${
                        dataStates
                            ? $isMonthly
                                ? "_mensual"
                                : "_acumulado"
                            : ""
                    }.xlsx`}
                />
            ) : null}
        </div>
    );
};

export default Grafico;
