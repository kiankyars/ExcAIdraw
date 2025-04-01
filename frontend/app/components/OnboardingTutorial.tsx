'use client'

import { useEffect, useState } from 'react';
import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';
import { AnimatedArrow } from './AnimatedArrow';

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
    <p>Let's get you started with a quick overview of the app.</p>
  </div>
);

const ApiKeysStep = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">API Keys Setup</h2>
    <p className="mb-2">To use ExcAIdraw, you'll need two free API keys:</p>
    <ol className="list-decimal list-inside space-y-2">
      <li>Google API Key - For image generation</li>
      <li>Trellis API Key - For advanced AI features</li>
    </ol>
    <p className="mt-4">Click "Next" and we'll show you where to add these keys.</p>
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
      <AnimatedArrow isVisible={showArrow} />
    </>
  );
}; 