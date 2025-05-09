"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/context/ThemeContext"
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { href: "#how-it-works", label: "How It Works" },
    { href: "#why-choose-us", label: "Why Us" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
]

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Close menu when a link is clicked (optional, if you want this behavior)
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 left-0 w-full z-50 bg-card/70 backdrop-blur border-b border-border">
            <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                <Link href="/" className="text-2xl font-bold tracking-tight text-primary">
                    SoftSell
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="hover:text-muted-foreground transition-colors duration-200"
                            scroll={true}
                        >
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <Button
                        variant="ghost"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle Mobile Menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="size-6" />
                        ) : (
                            <Menu className="size-6" />
                        )}
                    </Button>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? (
                            <Sun className="size-6" />
                        ) : (
                            <Moon className="size-5" />
                        )}

                    </Button>
                </div>
            </nav>

            {/* Mobile Menu (AnimatePresence for enter/exit animations) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-card border-b border-border"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className="text-lg text-foreground hover:text-muted-foreground transition-colors duration-200"
                                    onClick={closeMobileMenu} // Close menu on click
                                    scroll={true}
                                >
                                    {label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
