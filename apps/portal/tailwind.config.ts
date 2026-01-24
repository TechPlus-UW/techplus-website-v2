import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary-main': '#020B2C',
        'secondary-main': '#6C9A5C',
        'secondary-light': '#8BC677',
        'secondary-yellow-light': '#FFDC84',
        'secondary-yellow-medium': '#F9CD34',
        'secondary-yellow-dark': '#ECB22E',
        'secondary-green-light': '#8BC677',
        'secondary-green-dark': '#6C9A5C',
      },
      fontFamily: {
        sans: ['Poppins', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
