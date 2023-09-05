import { FC, ReactNode, useEffect, useRef, useState } from "react";
import "./tooltip.css";
// import { useInView } from "react-intersection-observer";

interface Props {
    tooltipMsg: string;
    className?: string;
    childClassName?: string;
    children: ReactNode;
}

const Tooltip: FC<Props> = ({
    tooltipMsg,
    className,
    childClassName,
    children,
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    // const { ref: tooltipRef, inView, entry } = useInView({ threshold: 0 });
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        if (!divRef.current || !tooltipRef.current) return;
        const divWidth = divRef.current.clientWidth;
        const tooltipWidth = tooltipRef.current.clientWidth;
        setOffset((divWidth - tooltipWidth) / 2);
    }, [divRef, tooltipRef]);

    return (
        <div className={className} ref={divRef}>
            <div className="tooltip relative inline-block h-full w-full">
                <div className={childClassName}>{children}</div>
                <span
                    className="tooltiptext"
                    style={{ left: `${offset}px` }}
                    ref={tooltipRef}
                >
                    {tooltipMsg}
                </span>
            </div>
        </div>
    );
};

export default Tooltip;
