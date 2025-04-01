'use client'

import { useEffect, useState } from 'react';
import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';

interface OnboardingTutorialProps {
  onComplete: () => void;
}

const WelcomeStep = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Welcome to ExcAIdraw!</h2>
    <video
      className="w-full rounded-lg mb-4"
      controls
      src="/tutorial-video.mp4"
    />
    <p>Welcome! Lets get you started with a quick overview of the app.</p>
  </div>
);

const ApiKeysStep = () => (
  <div className="p-8" style={{ maxWidth: '600px', margin: '0 auto' }}>
    <h2 
      className="text-2xl mb-6 text-center" 
      style={{ 
        fontFamily: 'var(--font-family)',
        color: '#1a1a1a',
        letterSpacing: '0.5px'
      }}
    >
      API Keys Setup
    </h2>
    
    <p 
      className="mb-6 text-center text-lg" 
      style={{ 
        color: '#4a4a4a',
        lineHeight: '1.6'
      }}
    >
      To use ExcAIdraw, you need two free API keys:
    </p>

    <div className="flex flex-col gap-4">
      <a 
        href="https://makersuite.google.com/app/apikey"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
        style={{
          padding: '24px',
          borderRadius: '16px',
          backgroundColor: '#f8f9ff',
          border: '1px solid #e1e4ff',
          transition: 'all 0.3s ease',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div>
          <h3 
            style={{ 
              color: '#1a1a1a',
              fontSize: '20px',
              marginBottom: '6px',
              fontWeight: 500
            }}
          >
            Gemini API Key
          </h3>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.4' }}>
            Powers AI image generation
          </p>
        </div>
        <div 
          style={{ 
            marginLeft: 'auto',
            color: '#4F46E5',
            fontSize: '24px',
            transition: 'transform 0.3s ease',
          }}
          className="group-hover:translate-x-1"
        >
          →
        </div>
      </a>

      <a 
        href="https://piapi.ai"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
        style={{
          padding: '24px',
          borderRadius: '16px',
          backgroundColor: '#fff8f9',
          border: '1px solid #ffe1e4',
          transition: 'all 0.3s ease',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div>
          <h3 
            style={{ 
              color: '#1a1a1a',
              fontSize: '20px',
              marginBottom: '6px',
              fontWeight: 500
            }}
          >
            Trellis API Key
          </h3>
          <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.4' }}>
            Enables advanced 3D modelling
          </p>
        </div>
        <div 
          style={{ 
            marginLeft: 'auto',
            color: '#E54F46',
            fontSize: '24px',
            transition: 'transform 0.3s ease',
          }}
          className="group-hover:translate-x-1"
        >
          →
        </div>
      </a>
    </div>

    <p 
      className="mt-8 text-center text-sm" 
      style={{ 
        color: '#666',
        fontStyle: 'italic'
      }}
    >
      Click "Next" and we&aposll show you where to add these keys.
    </p>
  </div>
);

export const OnboardingTutorial: React.FC<OnboardingTutorialProps> = ({ onComplete }) => {
  const [showArrow, setShowArrow] = useState(false);
  const [run, setRun] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tutorialCompleted = localStorage.getItem('tutorialCompleted');
    if (!tutorialCompleted) {
      setRun(true);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  const steps: Step[] = [
    {
      target: 'body',
      placement: 'center',
      content: <WelcomeStep />,
      disableBeacon: true,
    },
    {
      target: 'body',
      placement: 'center',
      content: <ApiKeysStep />,
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;

    if (type === 'tour:end' || status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setShowArrow(true);
      localStorage.setItem('tutorialCompleted', 'true');
      onComplete();
    }
  };

  return (
    <>
      <Joyride
        steps={steps}
        run={run}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: '#4F46E5',
            zIndex: 1000,
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      />
    </>
  );
}; 