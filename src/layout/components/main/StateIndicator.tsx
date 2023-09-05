import { useStore } from "@nanostores/react";
import { useEffect, useRef, useState } from "react";
import { isMonthly } from "../../../states/dataPeriod";
import publishData from "../../../data/publishData.json";
import locales from "../../../locales/locales";

export default () => {
    const $isMonthly = useStore(isMonthly);
    const ref = useRef<HTMLDivElement | null>(null);
    const [arcHeight, setArcHeight] = useState(6);
    const [width, setWidth] = useState<undefined | number>(undefined);

    useEffect(() => {
        setWidth(ref.current?.clientWidth);
        if (width !== undefined) setArcHeight(3000 / width);
    }, [ref, width]);

    return (
        <div
            onClick={() => isMonthly.set(!$isMonthly)}
            ref={ref}
            className="cursor-pointer"
        >
            {width !== undefined && width !== 0 ? ( // width it's 0 when the container of this element is hidden
                $isMonthly ? (
                    <svg
                        viewBox={`0 ${50 - arcHeight} 100 ${arcHeight}`}
                        className=" absolute z-30"
                    >
                        <path
                            className=" fill-expo"
                            d={`M0 ${arcHeight} a50 ${arcHeight} 0 0 1 100 0`}
                            transform="rotate(180 50 25)"
                        ></path>
                        <text
                            x="50"
                            y={`${width ? 50 - 1000 / width : 49}`}
                            textAnchor="middle"
                            fill="#000000"
                            fontSize={`${arcHeight / 35}rem`}
                        >
                            Ver valores de enero-
                            {locales.date(publishData.reportDate, {
                                month: "long",
                                year: "numeric",
                            })}
                        </text>
                    </svg>
                ) : (
                    <svg
                        viewBox={`0 ${50 - arcHeight} 100 ${arcHeight}`}
                        className=" absolute z-30"
                    >
                        <path
                            className=" fill-impo"
                            d={`M0 ${arcHeight} a50 ${arcHeight} 0 0 1 100 0`}
                            transform="rotate(180 50 25)"
                        ></path>
                        <text
                            x="50"
                            y={`${width ? 50 - 1000 / width : 49}`}
                            textAnchor="middle"
                            fill="#000000"
                            fontSize={`${arcHeight / 35}rem`}
                        >
                            Ver valores de{" "}
                            {locales.date(publishData.reportDate, {
                                month: "long",
                                year: "numeric",
                            })}
                        </text>
                    </svg>
                )
            ) : null}
        </div>
    );
};
