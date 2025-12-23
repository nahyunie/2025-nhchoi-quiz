'use client'
import React, { useState, useEffect } from 'react';
import {QuizData, quizData} from "@/app/components/Quiz/data";

const ConfettiEmoji = ({ emoji, delay }: { emoji: string; delay: number }) => {
  const [position, setPosition] = useState({
    left: 50,
    animationDuration: 3,
    rotation: 0,
  });

  useEffect(() => {
    setPosition({
      left: Math.random() * 100,
      animationDuration: 1 + Math.random() * 1.5,
      rotation: Math.random() * 360,
    });
  }, []);

  return (
    <div
      className="absolute text-4xl animate-fall"
      style={{
        left: `${position.left}%`,
        top: '-50px',
        animationDelay: `${delay}s`,
        animationDuration: `${position.animationDuration}s`,
        transform: `rotate(${position.rotation}deg)`,
      }}
    >
      {emoji}
    </div>
  );
};

const WrongAnswerText = ({ delay }: { delay: number }) => {
  const [position, setPosition] = useState({
    left: 50,
    top: 50,
    animationDuration: 3,
    scale: 1,
  });

  useEffect(() => {
    setPosition({
      left: 5 + Math.random() * 60,
      top: 20 + Math.random() * 60,
      animationDuration: 2 + Math.random() * 1,
      scale: 0.8 + Math.random() * 0.4,
    });
  }, []);

  return (
    <div
      className="absolute text-gray animate-echo opacity-0 subsub whitespace-nowrap"
      style={{
        left: `${position.left}%`,
        top: `${position.top}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${position.animationDuration}s`,
        fontSize: `${position.scale * 2}rem`,
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        transform: 'translateX(-50%)'
      }}
    >
      섭섭한데...
    </div>
  );
};

const Snowflake = ({ delay }: { delay: number }) => {
  const [position, setPosition] = useState({
    left: 50,
    animationDuration: 4,
    size: 15,
  });

  useEffect(() => {
    setPosition({
      left: Math.random() * 100,
      animationDuration: 3 + Math.random() * 1.5,
      size: 10 + Math.random() * 20,
    });
  }, []);

  return (
    <div
      className="absolute text-white/70 animate-snow"
      style={{
        left: `${position.left}%`,
        top: '-50px',
        animationDelay: `${delay}s`,
        animationDuration: `${position.animationDuration}s`,
        fontSize: `${position.size}px`,
      }}
    >
      ❄️
    </div>
  );
};

const QuizApp = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWrongMessage, setShowWrongMessage] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isAnswering, setIsAnswering] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const emojis = ['🎄', '⛄', '🎁', '✨', '🎅', '🌟', '❄️', '🔔'];

  if (!isMounted) {
    return null;
  }

  const calculateScore = () => {
    let correct = 0;
    quizData.forEach((quiz) => {
      if (quiz.type === 'choice' && answers[quiz.id] === quiz.correctAnswer) {
        correct++;
      }
    });
    const totalQuestions = quizData.filter((q) => q.type === 'choice').length;
    return Math.round((correct / totalQuestions) * 100);
  };

  const handleAnswer = (quizId: number, answerIndex: number) => {
    if (isAnswering) return; // 이미 답변 처리 중이면 무시

    setIsAnswering(true);
    const currentQuiz = quizData.find(q => q.id === quizId);
    const isCorrect = currentQuiz?.correctAnswer === answerIndex;

    setAnswers({ ...answers, [quizId]: answerIndex });

    if (isCorrect) {
      // 정답이면 컨페티 효과
      setShowConfetti(true);

      // 컨페티를 충분히 본 후 다음 슬라이드로 이동
      setTimeout(() => {
        if (currentSlide < quizData.length - 1) {
          setCurrentSlide(currentSlide + 1);
        }
        // 페이지 전환 후 컨페티 제거 및 버튼 활성화
        setTimeout(() => {
          setShowConfetti(false);
          setIsAnswering(false);
        }, 300);
      }, 2000);
    } else {
      // 오답이면 "섭섭한데..." 효과
      setShowWrongMessage(true);

      setTimeout(() => {
        if (currentSlide < quizData.length - 1) {
          setCurrentSlide(currentSlide + 1);
        }
        setTimeout(() => {
          setShowWrongMessage(false);
          setIsAnswering(false);
        }, 300);
      }, 2000);
    }
  };


  const handleReset = () => {
    setIsTransitioning(false);
    setCurrentSlide(0);
    setAnswers({});
    setShowLetter(false);
    // 다음 프레임에서 transition 다시 활성화
    setTimeout(() => setIsTransitioning(true), 50);
  };

  const renderSlide = (quiz: QuizData) => {
    switch (quiz.type) {
      case 'intro':
        const titleLine1 = "나현이를";
        const titleLine2 = "맞춰보세요";
        return (
          <div className="flex items-center justify-center h-full p-6">
            <div className="text-center">
              <div className="text-6xl mb-6">🎄</div>
              <div className="mb-4 space-y-4">
                <h1 className="text-7xl font-bold text-white drop-shadow-lg tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                  {titleLine1.split('').map((char, index) => (
                    <span
                      key={index}
                      className="inline-block animate-bounce-in mx-1"
                      style={{
                        animationDelay: `${index * 0.15}s`,
                        animationFillMode: 'backwards',
                        transform: `rotate(${(Math.random() - 0.5) * 20}deg)`,
                        display: 'inline-block',
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </h1>
                <h1 className="text-7xl font-bold text-white drop-shadow-lg tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                  {titleLine2.split('').map((char, index) => (
                    <span
                      key={index}
                      className="inline-block animate-bounce-in mx-1"
                      style={{
                        animationDelay: `${(titleLine1.length + index) * 0.15}s`,
                        animationFillMode: 'backwards',
                        transform: `rotate(${(Math.random() - 0.5) * 20}deg)`,
                        display: 'inline-block',
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </h1>
              </div>
              <p className="font-bold text-gray-300 mb-2 drop-shadow-lg mt-8">문제를 푼 사람에 대한 정보는 저장하지 않아요.</p>
              <p className="font-bold text-gray-300 drop-shadow-lg">(나도 알고 싶은데 그 정도 개발 능력이 없삼....)</p>
              <button
                onClick={() => setCurrentSlide(1)}
                className="mt-6 px-10 py-4 bg-white text-red-600 rounded-full text-lg font-bold hover:bg-red-50 transition-all shadow-xl border-4 border-red-200"
              >
                시작하기 🎁
              </button>
            </div>
          </div>
        );

      case 'choice':
        return (
          <div className="flex flex-col items-center justify-center h-full px-6">
            <div className="text-5xl mb-6">❄️</div>
            <h2 className="text-3xl font-bold text-white mb-16 text-center leading-relaxed drop-shadow-lg whitespace-pre-line" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              {quiz.question}
            </h2>
            <div className="w-full max-w-md space-y-4">
              {quiz.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(quiz.id, index)}
                  disabled={isAnswering}
                  className={`w-full py-5 px-6 rounded-3xl text-xl font-bold transition-all transform active:scale-95 bg-white text-red-700 hover:bg-red-50 shadow-xl border-2 border-red-100 ${
                    quiz.fontType === 'system' ? 'system-basic' : ''
                  } ${
                    isAnswering ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 'result':
        const score = calculateScore();
        const isPerfectScore = score === 100;

        // 점수에 따른 이모지와 메시지
        const getScoreEmoji = (score: number) => {
          if (score === 100) return '🎅';
          if (score >= 75) return '⛄';
          if (score >= 50) return '🎄';
          if (score >= 25) return '❄️';
          return '😢';
        };

        const getScoreMessage = (score: number) => {
          if (score === 100) return '당신 누구야!\n나를 왜 이렇게 잘 알아!';
          if (score >= 75) return '정말 잘 아시네요...\n거의 다 맞추셨어요!';
          if (score >= 50) return '낫 배드 ~\n조금만 더 알아가요!';
          if (score >= 25) return '힝.......!\n더 친해져야겠네요!';
          return '우리... 모르는 사이 아니죠?';
        };

        return (
          <div className="flex flex-col items-center justify-center h-full px-6">
            {!showLetter ? (
              <div className="text-center">
                <div className="text-6xl mb-6">{getScoreEmoji(score)}</div>
                <div className="text-9xl font-black text-white mb-12 drop-shadow-2xl" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.4)' }}>
                  {score}점
                </div>
                <p className="text-3xl text-white font-bold whitespace-pre-line leading-relaxed drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                  {getScoreMessage(score)}
                </p>

                <div className="flex flex-col items-center gap-4 mt-12">
                  {isPerfectScore && (
                    <button
                      onClick={() => setShowLetter(true)}
                      className="w-full max-w-xs px-10 py-4 bg-gradient-to-r from-red-500 to-green-500 text-white rounded-full text-lg font-bold hover:from-red-600 hover:to-green-600 transition-all shadow-xl animate-pulse border-2 border-white"
                    >
                      🎁 특별한 선물 열기
                    </button>
                  )}

                  <button
                    onClick={handleReset}
                    className="w-full max-w-xs px-10 py-4 bg-white text-red-600 rounded-full text-lg font-bold hover:bg-red-50 transition-all shadow-xl border-2 border-red-200"
                  >
                    다시 하기 ⛄
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl max-h-[80vh] overflow-y-auto relative border-4 border-red-200">
                <div className="absolute top-4 right-4 text-3xl">🎄</div>
                <div className="absolute top-4 left-4 text-3xl">🎄</div>

                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🎁</div>
                  <h3 className="text-2xl font-bold text-red-600 mb-2">최산타의 크리스마스 편지</h3>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-1 bg-gray-600 rounded-full"></div>
                    <div className="text-2xl">⛄</div>
                    <div className="w-8 h-1 bg-gray-600 rounded-full"></div>
                  </div>
                </div>

                <div className="text-gray-700 leading-relaxed space-y-4 text-base">
                  <p>
                    와! 저에 대해서 완벽하게 알고 계시네요 ... ?
                  </p>
                  <p>
                    조금 무섭다 .... ! (농담)
                  </p>
                  <p>
                    올 한 해도 정말 고마웠습니다.
                  </p>
                  <p>
                    제발 내년에도 나랑 놀아줘잉 ~
                  </p>
                  <p>
                    새해 복 많이 받으세요 !
                  </p>
                  <p>
                    I LOVE YOU ❤️‍🔥
                  </p>
                  <p className="text-center text-3xl my-4">
                    ⛄ 🎁 ❄️
                  </p>
                  <p className="text-right font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent mt-6 text-xl">
                    Merry Christmas! 🎅
                  </p>
                </div>

                <button
                  onClick={() => setShowLetter(false)}
                  className="mt-8 w-full py-3 bg-gray-600 text-white rounded-full font-bold hover:from-red-600 hover:to-green-600 transition-all shadow-lg"
                >
                  닫기 🎄
                </button>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden relative" style={{
      background: 'linear-gradient(180deg, #1a4d7a 0%, #2d5f8d 50%, #4a7ba7 100%)'
    }}>
      <style>{`
  @keyframes fall {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }
  @keyframes snow {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0.8;
    }
    100% {
      transform: translateY(100vh) translateX(50px);
      opacity: 0;
    }
  }
  @keyframes echo {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.2);
    }
    100% {
      opacity: 0;
      transform: scale(1.5);
    }
  }
  @keyframes bounce-in {
    0% {
      opacity: 0;
      transform: scale(0) rotate(0deg);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  .animate-fall {
    animation: fall linear forwards;
  }
  .animate-snow {
    animation: snow linear infinite;
  }
  .animate-echo {
    animation: echo ease-out forwards;
  }
  .animate-bounce-in {
    animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  }
`}</style>


      {/* Snowflakes background */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <Snowflake key={i} delay={i * 0.3} />
        ))}
      </div>

      {/* Wrong Answer Message */}
      {showWrongMessage && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <WrongAnswerText key={i} delay={i * 0.15} />
          ))}
        </div>
      )}

      {/* Confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <ConfettiEmoji
              key={i}
              emoji={emojis[Math.floor(Math.random() * emojis.length)]}
              delay={i * 0.05}
            />
          ))}
        </div>
      )}

      {/* Copyright */}
      <div className="absolute bottom-4 left-0 right-0 z-20 text-center">
        <p className="text-white/60 text-sm font-medium">
          Created by Nahyeon Choi with love.
        </p>
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-3">
        {quizData.map((_, index) => (
          <div
            key={index}
            className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm"
          >
            <div
              className={`h-full bg-white transition-all duration-300 ${
                index < currentSlide ? 'w-full' : index === currentSlide ? 'w-full' : 'w-0'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Slides container */}
      <div className="relative h-full select-none">
        <div
          className={`flex h-full ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {quizData.map((quiz) => (
            <div
              key={quiz.id}
              className="min-w-full h-full relative"
            >
              {renderSlide(quiz)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizApp;