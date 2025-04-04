'use client'

import dynamic from 'next/dynamic'
import './tldraw.css'
import { Vibe3DCodeButton } from './components/Vibe3DCodeButton'
import { AutoDrawButton } from './components/AutoDrawButton'
import { ImproveDrawingButton } from './components/ImproveDrawingButton'
import { PreviewShapeUtil } from './PreviewShape/PreviewShape'
import { Model3DPreviewShapeUtil } from './PreviewShape/Model3DPreviewShape'
// import ThreeJSCanvas from './components/three/canvas'
import { useTabStore } from './store/appStore'
import TestAddCodeButton from './components/TestAddCodeButton'
import { TldrawLogo } from './components/TldrawLogo'
import { useState, useEffect } from 'react'
import { ApiSettingsModal } from './components/ApiSettingsModal'
import { OnboardingTutorial } from './components/OnboardingTutorial'
import { DynamicArrow } from './components/DynamicArrow'

// Dynamically import ThreeJSCanvas with ssr: false
const ThreeJSCanvas = dynamic(
	() => import('./components/three/canvas'),
	{ ssr: false }
)

const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, {
	ssr: false,
})

const shapeUtils = [PreviewShapeUtil, Model3DPreviewShapeUtil]

type TabType = 'tldraw' | 'threejs'

interface TabGroupProps {
	activeTab: TabType;
	setActiveTab: (tab: TabType) => void;
}

const TabGroup = ({ activeTab, setActiveTab }: TabGroupProps) => {
	return (
		<div style={{
			position: 'fixed', 
			top: '20px', 
			left: '50%', 
			transform: 'translateX(-50%)',
			zIndex: 9999999, 
			display: 'flex',
			gap: '6px',
			padding: '6px',
			borderRadius: '8px',
			backgroundColor: 'white',
			boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
		}}>
			<button 
				style={{
					padding: '6px 12px', 
					border: 'none', 
					borderRadius: '4px',
					backgroundColor: activeTab === 'tldraw' ? '#007bff' : '#f0f0f0', 
					color: activeTab === 'tldraw' ? 'white' : 'black',
					cursor: 'pointer',
					transition: 'background-color 0.2s'
				}}
				onClick={() => setActiveTab('tldraw')}
			>
				2D Canvas
			</button>
			<button 
				style={{
					padding: '6px 12px', 
					border: 'none', 
					borderRadius: '4px',
					backgroundColor: activeTab === 'threejs' ? '#007bff' : '#f0f0f0', 
					color: activeTab === 'threejs' ? 'white' : 'black',
					cursor: 'pointer',
					transition: 'background-color 0.2s'
				}}
				onClick={() => setActiveTab('threejs')}
			>
				3D World
			</button>
		</div>
	)
}

export default function App() {
	const { activeTab, setActiveTab } = useTabStore()
	const [isApiSettingsOpen, setIsApiSettingsOpen] = useState(false)
	const [showArrow, setShowArrow] = useState(false)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true);
		const apiKeysClicked = localStorage.getItem('apiKeysClicked');
		if (apiKeysClicked) {
			setShowArrow(false);
		}
	}, []);

	const handleTutorialComplete = () => {
		setShowArrow(true);
	};

	const handleApiKeysClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		setIsApiSettingsOpen(true);
		setShowArrow(false);
		localStorage.setItem('apiKeysClicked', 'true');
	};

	const handleApiKeysSave = () => {
		setShowArrow(false);
		localStorage.setItem('apiKeysClicked', 'true');
	};

	if (!mounted) {
		return null;
	}

	return (
		<>
			<OnboardingTutorial onComplete={handleTutorialComplete} />
			<TabGroup activeTab={activeTab} setActiveTab={setActiveTab} />
			<ApiSettingsModal 
				isOpen={isApiSettingsOpen}
				onClose={() => setIsApiSettingsOpen(false)}
				onSave={handleApiKeysSave}
			/>
			<div className="editor">
				<div style={{ 
					position: 'absolute', 
					width: '100%', 
					height: '100%', 
					visibility: activeTab === 'tldraw' ? 'visible' : 'hidden',
					zIndex: activeTab === 'tldraw' ? 2 : 1
				}}>
					<Tldraw 
						persistenceKey="excaidraw" 
						shareZone={
							<div style={{ 
								display: 'flex', 
								alignItems: 'center', 
								gap: '8px', 
								transform: 'scale(0.8)', 
								transformOrigin: 'right center',
							}}>
								<Vibe3DCodeButton />
								<ImproveDrawingButton />
								<AutoDrawButton />
								<button
									id="api-keys-button"
									onClick={handleApiKeysClick}
									className="tl-button"
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										gap: '8px',
										fontSize: '13px',
										position: 'relative',
										zIndex: 999999,
										pointerEvents: 'auto',
										height: '40px',
										padding: '0 16px',
										backgroundColor: 'var(--color-primary)',
										color: 'var(--color-selected-contrast)',
										border: 'none',
										borderRadius: '8px',
										fontFamily: 'var(--font-family)',
										fontWeight: 500,
										cursor: 'pointer',
										whiteSpace: 'nowrap',
									}}
								>
									<span style={{ fontSize: '16px' }}>⚙️</span>
									API Keys
								</button>
							</div>
						} 
						shapeUtils={shapeUtils}
					>
						<TldrawLogo />
					</Tldraw>
				</div>
				<ThreeJSCanvas visible={activeTab === 'threejs'} />
			</div>
			<TestAddCodeButton activeTab={activeTab} setActiveTab={setActiveTab} />
			<DynamicArrow isVisible={showArrow} targetButtonId="api-keys-button" />
		</>
	)
}
