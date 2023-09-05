const localeNumber = (
    n: number,
    isPercentage: boolean = false,
    fixed: number = 1
) =>
    !isPercentage
        ? Number(n.toFixed(fixed)).toLocaleString("es-AR")
        : Number((n * 100).toFixed(fixed)).toLocaleString("es-AR") + "%";

export default localeNumber;
