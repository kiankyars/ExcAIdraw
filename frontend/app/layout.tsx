import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'ExcAIdraw',
	description: 'draw a 3d model and make it real',
	manifest: '/manifest.json',
	icons: {
		icon: [
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/favicon.ico', sizes: 'any' }
		],
		apple: [
			{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
		],
		other: [
			{ url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
			{ url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
		]
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: 'default',
		title: 'ExcAIdraw',
	},
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	)
}
