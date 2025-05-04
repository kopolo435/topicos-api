import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "src"),
            "@assets": path.resolve(import.meta.dirname, "src", "assets"),
            "@components": path.resolve(import.meta.dirname, "src", "components"),
            "@lib": path.resolve(import.meta.dirname, "src", "lib"),
            "@styles": path.resolve(import.meta.dirname, "src", "styles"),
            "@views": path.resolve(import.meta.dirname, "src", "views")
        }
    }
})
