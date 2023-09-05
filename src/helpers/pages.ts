import { PdfReportLink } from "../data/publishData.json";
const BASE_URL = import.meta.env.BASE_URL;
const pages: { [key: string]: string } = {
    Prueba: BASE_URL,
    Prueba2: BASE_URL + "expo/",

};

export const links = {
    PdfReportLink,
    officialSite: "https://www.indec.gob.ar/",
    methodologicalReport:
        "https://www.indec.gob.ar/uploads/informesdeprensa/ica_08_23834FA12E2C.pdf",
    directorateSubSite: "https://www.indec.gob.ar/indec/web/Nivel3-Tema-3-2",
    cuadrosWeb:
        "https://www.indec.gob.ar/ftp/cuadros/economia/ica_cuadros_22_08_23.xls",
};

export default pages;
