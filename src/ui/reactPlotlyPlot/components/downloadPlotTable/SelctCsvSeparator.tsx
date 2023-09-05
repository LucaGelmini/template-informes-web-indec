export interface Props {
    show: boolean;
    onClose: (sep: csvSep) => void;
    className?: string;
}

import type { csvSep } from "./DownloadPlotTable";

const SelectCsvSeparator = ({ show, onClose, className = "" }: Props) => {
    if (!show) {
        return null;
    }

    const setComma = () => {
        onClose(",");
    };
    const setSemiColon = () => {
        onClose(";");
    };

    return (
        <div className={className}>
            <div>
                <h3 className="font-bold">Seleccione formato de csv</h3>
                <button
                    type="button"
                    onClick={setComma}
                    className="m-2 bg-gray-100 p-2 shadow-md hover:shadow-lg"
                >
                    Separador "coma" y decimales con "punto".
                </button>
                <button
                    type="button"
                    onClick={setSemiColon}
                    className="m-2 bg-gray-100 p-2 shadow-md hover:shadow-lg"
                >
                    Separador "punto y coma" y decimales con "coma"
                </button>
            </div>
        </div>
    );
};

export default SelectCsvSeparator;
