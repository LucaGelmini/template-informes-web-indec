const LOCALE = "es-AR";

const locales = {
    date: (utfDateStamp: string, options: Intl.DateTimeFormatOptions) => {
        const formatter = new Intl.DateTimeFormat(LOCALE, options);
        return formatter.format(new Date(utfDateStamp));
    },
    number: (n: number, isPercentage: boolean = false, fixed: number = 1) => {
        const formatter = new Intl.NumberFormat(LOCALE, {
            style: isPercentage ? "percent" : "decimal",
            minimumFractionDigits: fixed,
            maximumFractionDigits: fixed,
        });
        return formatter.format(n);
    },
};

export default locales;
