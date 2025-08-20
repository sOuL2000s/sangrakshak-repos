import { Config } from "tailwindcss"; // Verified import syntax

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
				'inter': ['Inter', 'sans-serif'],
				'orbitron': ['Orbitron', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				glass: {
					DEFAULT: 'hsl(var(--glass))',
					border: 'hsl(var(--glass-border))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
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
					foreground: 'hsl(var(--accent-foreground))',
					glow: 'hsl(var(--accent-glow))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
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
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-accent': 'var(--gradient-accent)',
				'gradient-glass': 'var(--gradient-glass)',
				'gradient-hero': 'var(--gradient-hero)',
			},
			boxShadow: {
				'glass': 'var(--shadow-glass)',
				'glow': 'var(--shadow-glow)',
				'accent': 'var(--shadow-accent)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px hsl(var(--primary-glow) / 0.3)'
					},
					'50%': {
						boxShadow: '0 0 40px hsl(var(--primary-glow) / 0.6)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'slide-in': {
					'0%': {
						transform: 'translateX(-100%)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'slide-in': 'slide-in 0.3s ease-out'
			},
			typography: ({ theme }: { theme: (path: string) => string }) => ({
				DEFAULT: {
					css: {
						// Ensure all elements wrap by default in base prose
						'p, ol, ul, li, blockquote, pre, code, h1, h2, h3, h4, h5, h6': {
                            wordBreak: 'break-all', // Changed to break-all for stronger wrapping
                        },
                        'pre': {
                            whiteSpace: 'pre-wrap', // This ensures code blocks wrap
                        },
					},
				},
				// This is the important part for dark mode readability (for general dark backgrounds)
				'invert': {
					css: {
						'--tw-prose-body': theme('colors.foreground'), // Main body text
						'--tw-prose-headings': theme('colors.primary'), // H1, H2, etc.
						'--tw-prose-lead': theme('colors.muted-foreground'),
						'--tw-prose-links': theme('colors.accent'), // Links
						'--tw-prose-bold': theme('colors.foreground'), // Bold text
						'--tw-prose-counters': theme('colors.muted-foreground'), // List numbers
						'--tw-prose-bullets': theme('colors.muted-foreground'), // List bullets
						'--tw-prose-hr': theme('colors.border'), // Horizontal rules
						'--tw-prose-quotes': theme('colors.muted-foreground'), // Blockquotes text
						'--tw-prose-quote-borders': theme('colors.border'), // Blockquotes border
						'--tw-prose-captions': theme('colors.muted-foreground'), // Figcaption
						'--tw-prose-code': theme('colors.foreground'), // Inline code text
						'--tw-prose-pre-code': theme('colors.foreground'), // Code block text
						'--tw-prose-pre-bg': theme('colors.secondary'), // Code block background
						'--tw-prose-th-borders': theme('colors.border'), // Table header borders
						'--tw-prose-td-borders': theme('colors.border'), // Table cell borders
						'--tw-prose-figcaption': theme('colors.muted-foreground'),
						'--tw-prose-strong': theme('colors.foreground'), // Explicitly set strong/bold text color

						// Ensure list markers are colored correctly
						'ol > li::before': {
							color: theme('colors.muted-foreground'),
						},
						'ul > li::before': {
							backgroundColor: theme('colors.muted-foreground'),
						},
						// Specific styling for code blocks and inline code
						'pre': {
							color: theme('colors.foreground'),
							backgroundColor: theme('colors.secondary'),
							padding: '0.2em 0.4em',
							borderRadius: '0.25em',
                            wordBreak: 'break-all', // Changed to break-all
                            whiteSpace: 'pre-wrap', // Ensures pre-formatted text wraps
						},
						'code': {
							color: theme('colors.foreground'),
							backgroundColor: theme('colors.secondary'),
							padding: '0.2em 0.4em',
							borderRadius: '0.25em',
                            wordBreak: 'break-all', // Changed to break-all
						},
						'code::before': { content: 'none' }, // Remove default quotes around inline code
						'code::after': { content: 'none' },   // Remove default quotes around inline code
                        'hr': { // Explicitly define HR style to prevent overflow if it's too wide
                            width: '100%',
                            display: 'block',
                            height: '1px',
                            border: '0',
                            borderTop: '1px solid ' + theme('colors.border'),
                            margin: '1em 0',
                            overflow: 'hidden',
                        }
					},
				},
                // Custom prose variant for AI messages (now with primary blue background)
                'ai': {
                    css: {
                        '--tw-prose-body': theme('colors.primary-foreground'), // Main body text - dark
                        '--tw-prose-headings': theme('colors.primary-foreground'), // H1, H2, etc. - dark
                        '--tw-prose-lead': theme('colors.primary-foreground'),
                        '--tw-prose-links': theme('colors.primary-foreground'), // Links - dark
                        '--tw-prose-bold': theme('colors.primary-foreground'), // Bold text - dark
                        '--tw-prose-counters': theme('colors.primary-foreground'), // List numbers - dark
                        '--tw-prose-bullets': theme('colors.primary-foreground'), // List bullets - dark
                        '--tw-prose-hr': theme('colors.primary-foreground'), // Horizontal rules - dark border
                        '--tw-prose-quotes': theme('colors.primary-foreground'), // Blockquotes text - dark
                        '--tw-prose-quote-borders': theme('colors.primary-foreground'), // Blockquotes border - dark
                        '--tw-prose-captions': theme('colors.primary-foreground'), // Figcaption - dark
                        '--tw-prose-code': theme('colors.foreground'), // Inline code text - light (readable on secondary)
                        '--tw-prose-pre-code': theme('colors.foreground'), // Code block text - light (readable on secondary)
                        '--tw-prose-pre-bg': theme('colors.secondary'), // Code block background - dark grey
                        '--tw-prose-th-borders': theme('colors.primary-foreground'), // Table header borders - dark
                        '--tw-prose-td-borders': theme('colors.primary-foreground'), // Table cell borders - dark
                        '--tw-prose-figcaption': theme('colors.primary-foreground'),
                        '--tw-prose-strong': theme('colors.primary-foreground'), // Explicitly set strong/bold text color - dark

                        // Ensure list markers are colored correctly
                        'ol > li::before': {
                            color: theme('colors.primary-foreground'),
                        },
                        'ul > li::before': {
                            backgroundColor: theme('colors.primary-foreground'),
                        },
                        // Specific styling for code blocks and inline code
                        'pre': {
                            color: theme('colors.foreground'),
                            backgroundColor: theme('colors.secondary'),
                            padding: '0.2em 0.4em',
                            borderRadius: '0.25em',
                            wordBreak: 'break-all', // Changed to break-all
                            whiteSpace: 'pre-wrap',
                        },
                        'code': {
                            color: theme('colors.foreground'),
                            backgroundColor: theme('colors.secondary'),
                            padding: '0.2em 0.4em',
                            borderRadius: '0.25em',
                            wordBreak: 'break-all', // Changed to break-all
                        },
                        'code::before': { content: 'none' },
                        'code::after': { content: 'none' },
                        // Ensure general text, headings, links are also explicitly set to dark foreground color
                        'h1, h2, h3, h4, h5, h6, p, ul, ol, li, strong, b, a': {
                            color: theme('colors.primary-foreground'), // All text on primary background is primary-foreground (dark)
                            wordBreak: 'break-all', // Changed to break-all
                        },
                        'hr': {
                            width: '100%',
                            display: 'block',
                            height: '1px',
                            border: '0',
                            borderTop: '1px solid ' + theme('colors.primary-foreground'), // HR dark border
                            margin: '1em 0',
                            overflow: 'hidden',
                        }
                    },
                },
			}),
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
