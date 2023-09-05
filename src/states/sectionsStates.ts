import { deepMap } from "nanostores";

type SectionStates = {
    [sectionName: string]: {
        rangeSlider?: [number, number];
    };
};

// Define the global store
export const sectionsStore = deepMap<SectionStates>({});
