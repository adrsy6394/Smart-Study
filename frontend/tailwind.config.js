/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#0F0F12",
        foreground: "#FFFFFF",
        card: {
          DEFAULT: "#16181D",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#16181D",
          foreground: "#FFFFFF",
        },
        primary: {
          DEFAULT: "#FF2E2E",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#1F2228",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#1F2228",
          foreground: "#9CA3AF",
        },
        accent: {
          DEFAULT: "#FF2E2E",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#22C55E",
          foreground: "#FFFFFF",
        },
        border: "#1F2228",
        input: "#1F2228",
        ring: "#FF2E2E",
      },
      borderRadius: {
        lg: "16px",
        md: "10px",
        sm: "8px",
      },
    },
  },
  plugins: [],
}
