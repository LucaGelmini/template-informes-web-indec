/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const fs = require("fs");
const process = require('process')
process.chdir(__dirname)
const { variable_colors: customColors } = JSON.parse(
    fs.readFileSync("./colors.json")
);


module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                body: "#f3f3f3",
                blackIndec: "#2a2a2a",
                grayText: "#616161",
                navBarIndec: "#FEF3E1",




                impo: {
                    DEFAULT: customColors.M[0],
                    500: customColors.M[0],
                    400: customColors.M[1],
                    300: customColors.M[2],
                    200: customColors.M[3],
                    100: customColors.M[4]
                },
                expo: {
                    DEFAULT: customColors.X[0],
                    500: customColors.X[0],
                    400: customColors.X[1],
                    300: customColors.X[2],
                    200: customColors.X[3],
                    100: customColors.X[4]
                },
                balance: {
                    DEFAULT: customColors.BALANCE[0],
                    500: customColors.BALANCE[0],
                    400: customColors.BALANCE[1],
                    300: customColors.BALANCE[2],
                    200: customColors.BALANCE[3],
                    100: customColors.BALANCE[4]
                },
            },
            // spacing: {
            //     ...customSpacing(),
            //     "1/6": `${100 / 6}%`,
            //     "1/8": `${100 / 8}%`,
            // },
            fontFamily: {
                sans: ["Helvetica", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};

// function customSpacing() {
//     const { bar: { xPercentage, mPercentage } } = JSON.parse(
//         fs.readFileSync("./src/data/dashboards/datos_barra_cajas.json")
//     );

//     return {

//         expoMonthly: String(xPercentage.monthly * 100) + "%",
//         expoAccumulated: String(xPercentage.accumulated * 100) + "%",

//         impoMonthly: String(mPercentage.monthly * 100) + "%",
//         impoAccumulated: String(mPercentage.accumulated * 100) + "%",

//     };
// }
