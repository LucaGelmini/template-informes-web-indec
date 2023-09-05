const LOCALE = "es-AR";

const localeFormats = {
    monthAndYear: new Intl.DateTimeFormat(LOCALE, {
        year: "numeric",
        month: "long",
    }),
};

export default localeFormats;
