import { useStore } from "@nanostores/react";
import { isMonthly } from "../../states/dataPeriod";
import publishData from "../../data/publishData.json";
import locales from "../../locales/locales";

interface Props {
    className?: string;
    id?: string;
}

const ChangeDataFreqButton = ({ className, id }: Props) => {
    const $isMonthly = useStore(isMonthly);
    const initialText = {
        monthly: `Ver valores de enero - ${locales.date(
            publishData.reportDate,
            { month: "long" }
        )}`,
        accumulated: `Ver valores de ${locales.date(publishData.reportDate, {
            month: "long",
        })}`,
    };

    return (
        <button
            id={id}
            type="button"
            onClick={() => isMonthly.set(!$isMonthly)}
            className={`cursor-pointer ${
                $isMonthly ? "bg-expo" : "bg-impo"
            } p-2 shadow-md shadow-gray-600 ${
                $isMonthly
                    ? "hover:bg-expo-300 active:bg-expo-400 "
                    : "hover:bg-impo-300 active:bg-impo "
            }${className}`}
        >
            <p>{$isMonthly ? initialText.monthly : initialText.accumulated}</p>
        </button>
    );
};

export default ChangeDataFreqButton;
