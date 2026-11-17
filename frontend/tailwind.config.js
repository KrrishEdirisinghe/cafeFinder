/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D97706",
        secondary: "#FFF8E7",
        accent: "#78350F",
        ink: "#1C1410",
        mist: "#F3E8D8",
        roast: "#3D2314",
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Sora"', "ui-sans-serif", "sans-serif"],
      },
      boxShadow: {
        card: "0 12px 40px -18px rgba(120, 53, 15, 0.35)",
        soft: "0 8px 24px -12px rgba(28, 20, 16, 0.25)",
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(217,119,6,0.35), transparent 60%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(120,53,15,0.45), transparent 55%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        "fade-up-delay": "fade-up 0.8s ease-out 0.15s both",
        "fade-up-late": "fade-up 0.9s ease-out 0.3s both",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
