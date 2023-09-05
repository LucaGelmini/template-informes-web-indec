import {createContext} from "react";
import type React from "react";

interface RangeContextType {
    range: [number, number];
    setRange: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const RangeContext = createContext<RangeContextType>({
    range: [0, 1],
    setRange: () => {},
});

export default RangeContext;
