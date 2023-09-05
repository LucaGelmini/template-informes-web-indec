import Papa from "papaparse";

type DataRow = {
    [key: string]: number | string;
};

type pandasTable = {
    schema: {
        fields: Array<{
            name: string;
            type: string;
        }>;
        primaryKey: Array<string>;  
        pandas_version: string;
    };
    data: Array<DataRow>;
};

export type csvSep = "," | ";";

function isNumber(value: number | string): value is number {
    return typeof value === "number";
}


const handleCSV = async (csvSep: csvSep, setShowModal:(state:boolean)=>void, fetchPath:string, fileName:string) => {
            setShowModal(false);
            function downloadFile(
                data: string,
                fileName: string,
                fileType = "text/xlsx"
            ) {
                const blob = new Blob([data], { type: fileType });
                const a = document.createElement("a");
                a.download = fileName;
                a.href = window.URL.createObjectURL(blob);
                const clickEvt = new MouseEvent("click", {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                });
                a.dispatchEvent(clickEvt);
                a.remove();
            }
    
            async function fetchJSONAndConvertToCSV(url: string) {
                const limitDecimalNumericCols = (json: pandasTable, fixed = 4) => {
                    return {
                        schema: json.schema,
                        data: json.data.map((datum) => {
                            const numerics = json.schema.fields
                                .filter((field) => field.type === "number")
                                .map((field) => field.name);
                            for (const key in datum) {
                                const value = datum[key];
                                if (numerics.includes(key) && isNumber(value)) {
                                    datum[key] =
                                        csvSep === ";"
                                            ? value.toFixed(fixed).replace(".", ",")
                                            : value.toFixed(fixed);
                                }
                            }
                            return datum;
                        }),
                    } as pandasTable;
                };
    
                const response = await fetch(url);
                const jsonData: pandasTable = limitDecimalNumericCols(
                    await response.json()
                );
                const csvData = Papa.unparse(jsonData.data, {
                    delimiter: csvSep,
                });
    
                return csvData;
            }
            const data = await fetchJSONAndConvertToCSV(fetchPath);
            downloadFile(data, fileName);
        };

        export default handleCSV;