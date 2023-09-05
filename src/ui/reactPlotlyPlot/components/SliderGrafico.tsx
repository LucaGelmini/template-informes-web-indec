import { useState, useEffect, useRef } from "react";
import "./sliderStyles.css";
import { sectionsStore } from "../../../states/sectionsStates";
import { listenKeys } from "nanostores";

export interface Props {
    className?: string;
    sectionName: string;
}

const MAX = 200;

const SliderGrafico = ({ className = "", sectionName }: Props) => {
    const [[nanostoresThumb1, nanostoresThumb2], setNanostoresThumbs] =
        useState([0, 1]);
    const [[thumb1value, thumb2value], setThumbs] = useState([0, 1]);
    const [isMouseEventHappening, setIsMouseEventHappening] =
        useState<boolean>(false);
    const [suscriptionState, setsuscriptionState] = useState<boolean>(true);
    const didMount = useRef(false);

    // Mount
    useEffect(() => {
        const sectionState = sectionsStore.get()[`${sectionName}`];
        const initThumbs: [number, number] =
            sectionState && sectionState.rangeSlider
                ? sectionState.rangeSlider
                : [0, 1];
        setNanostoresThumbs(initThumbs);
        setThumbs([initThumbs[0] * MAX, (1 - initThumbs[1]) * MAX]);
        listenKeys(sectionsStore, [`${sectionName}.rangeSlider`], (state) => {
            const stateRange = state[sectionName].rangeSlider;
            suscriptionState &&
                setNanostoresThumbs(
                    stateRange !== undefined ? stateRange : [0, 1]
                );
        });
    }, []);

    // Update
    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }

        if (isMouseEventHappening) {
            setsuscriptionState(false);
            const startRange = thumb1value / MAX;
            const endRange = (MAX - thumb2value) / MAX;
            sectionsStore.setKey(`${sectionName}.rangeSlider`, [
                startRange,
                endRange,
            ]);
        } else {
            setsuscriptionState(true);
            setThumbs([nanostoresThumb1 * MAX, (1 - nanostoresThumb2) * MAX]);
        }
    }, [
        isMouseEventHappening,
        thumb1value,
        thumb2value,
        nanostoresThumb1,
        nanostoresThumb2,
    ]);

    const getBackgroundSize = () => {
        const bgSize = 100 - ((thumb1value + thumb2value) * 100) / MAX;
        const bgPosition =
            (thumb1value * 100) / MAX +
            100 -
            ((thumb1value + (thumb2value * MAX) / (thumb1value + thumb2value)) *
                100) /
                MAX;
        return {
            backgroundSize: `${bgSize}% 100%`,
            backgroundPosition: `${bgPosition}% 50%`,
        };
    };

    const handleThumb1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (newValue > MAX - thumb2value) {
            setThumbs([MAX - thumb2value - 5, thumb2value]);
        } else if (newValue >= MAX) {
            setThumbs([newValue - 5, thumb2value]);
        } else {
            setThumbs([newValue, thumb2value]);
        }
    };
    const handleThumb2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        if (newValue > MAX - thumb1value) {
            setThumbs([thumb1value, MAX - thumb1value - 5]);
        } else if (newValue >= MAX) {
            setThumbs([thumb1value, newValue - 5]);
        } else {
            setThumbs([thumb1value, newValue]);
        }
    };

    const handleMouseEventStart = () => {
        setIsMouseEventHappening(true);
    };

    const handleMouseEventEnd = () => {
        setIsMouseEventHappening(false);
    };

    return (
        <div
            className={"relative m-5 h-2 " + className}
            onTouchStart={handleMouseEventStart}
            onTouchEnd={handleMouseEventEnd}
            onMouseDown={handleMouseEventStart}
            onMouseUp={handleMouseEventEnd}
        >
            <input
                type="range"
                min="0"
                max={MAX}
                onChange={handleThumb1Change}
                style={getBackgroundSize()}
                value={thumb1value}
                className="absolute -top-5 z-10 my-5 h-2 w-full cursor-pointer appearance-none overflow-visible rounded-full bg-transparent bg-gradient-to-r from-impo to-expo bg-no-repeat"
            />
            <input
                type="range"
                min="0"
                max={MAX}
                onChange={handleThumb2Change}
                style={{ backgroundSize: 0 }}
                value={thumb2value}
                className="absolute  -top-5 z-10 my-5 h-2 w-full rotate-180 cursor-pointer appearance-none overflow-visible rounded-full bg-transparent bg-gradient-to-r from-impo to-expo bg-no-repeat"
            />
        </div>
    );
};

export default SliderGrafico;
