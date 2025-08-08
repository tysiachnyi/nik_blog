"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setMounted(true);
        const hasDark = document.documentElement.classList.contains("dark");
        setIsDark(hasDark);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark, mounted]);

    if (!mounted) {
        return (
            <button
                aria-label="Toggle theme"
                className="size-8 rounded border border-border hover:bg-muted"
            />
        );
    }

    return (
        <button
            aria-label="Toggle theme"
            onClick={() => setIsDark((v) => !v)}
            className="size-8 rounded border border-border hover:bg-muted flex items-center justify-center"
        >
            {isDark ? (
                <span className="text-sm">🌙</span>
            ) : (
                <span className="text-sm">☀️</span>
            )}
        </button>
    );
}


