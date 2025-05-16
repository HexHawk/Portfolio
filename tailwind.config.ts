import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				mono: ["'Fira Mono'", 'monospace'],
				heading: ["'Share Tech Mono'", 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				cyber: {
					yellow: '#FFC107',
					red: '#FF5252',
					blue: '#03A9F4',
					green: '#4CAF50',
					pink: '#FF4081',
					dark: '#121212',
					'dark-accent': '#1E1E1E',
					'dark-800': '#1A1A1A',
					'dark-900': '#141414',
					'blue-light': '#40C4FF',
					'blue-dark': '#0288D1',
					'green-light': '#69F0AE',
					'green-dark': '#2E7D32',
					'yellow-light': '#FFD740',
					'yellow-dark': '#FFA000',
					'red-light': '#FF8A80',
					'red-dark': '#D32F2F',
					'pink-light': '#FF80AB',
					'pink-dark': '#C51162',
					'purple': '#9C27B0',
					'purple-light': '#E040FB',
					'purple-dark': '#6A1B9A',
					'cyan': '#00BCD4',
					'cyan-light': '#18FFFF',
					'cyan-dark': '#0097A7',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'meteor': {
					'0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
					'70%': { opacity: '1' },
					'100%': {
						transform: 'rotate(215deg) translateX(-500px)',
						opacity: '0',
					},
				},
				'blink': {
					'0%': { opacity: '1' },
					'50%': { opacity: '0.5' },
					'100%': { opacity: '1' },
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' },
				},
				'glow': {
					'0%': {
						boxShadow: '0 0 5px rgba(255, 193, 7, 0.5)',
						color: '#FFC107'
					},
					'100%': {
						boxShadow: '0 0 20px rgba(255, 193, 7, 0.8)',
						color: '#FFD54F'
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'meteor-effect': 'meteor 5s linear infinite',
				'blink': 'blink 1.5s infinite',
				'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
				'glow': 'glow 1.5s alternate infinite',
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
