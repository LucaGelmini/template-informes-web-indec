export interface Props {
    fetchPath: string;
    fileName?: string;
    className?: string;
}

export type csvSep = "," | ";";

const DownloadPlotTable = ({ fetchPath, className = "" }: Props) => {
    return (
        <button
            type="button"
            className={`${className} m-2 rounded-md bg-white shadow-md hover:shadow-lg`}
        >
            <a
                className="block p-2"
                target="_blank"
                href={import.meta.env.BASE_URL + fetchPath}
            >
                Descargar Excel
            </a>
        </button>
    );
};

export default DownloadPlotTable;
