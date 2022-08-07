module.exports = {
  content: ["./**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        custom: {
          primary: "#077AFF",
          secondary: "#463AA1",
          accent: "#37CDBE",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
