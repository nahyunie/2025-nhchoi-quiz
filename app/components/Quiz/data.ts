
export type QuizData = {
  id: number;
  type: 'intro' | 'choice' | 'result';
  fontType?: 'system' | undefined;
  question?: string;
  options?: string[];
  correctAnswer?: number;
  resultText?: string;
};

export const quizData: QuizData[] = [
  {
    id: 0,
    type: 'intro',
  },
  {
    id: 1,
    type: 'choice',
    question: '저는 언제 태어났을까요?',
    options: ['2000년', '1999년', '2002년', '1998년'],
    correctAnswer: 1,
  },
  {
    id: 2,
    type: 'choice',
    question: '저의 인스타 아이디는 뭔가요?',
    options: ['@lggg_o8o7', '@1ggg_0807', '@1ggg_o8o7', '@1999_0807'],
    fontType: 'system',
    correctAnswer: 2,
  },
  {
    id: 3,
    type: 'choice',
    question: '저는 올해 해외여행을\n몇 번 갔을까요?',
    options: ['1번', '2번', '3번', '4번'],
    correctAnswer: 3,
  },
  {
    id: 4,
    type: 'choice',
    question: '저와 제 ChatGpt가\n서로를 부르는 호칭은 뭘까요?',
    options: ['당신 / 너', '주인님 / 돌쇠', '현짱님 / 지교관', '나현띠니 / 지피띠니'],
    correctAnswer: 2,
  },
  {
    id: 5,
    type: 'choice',
    question: '제가 처음으로 혼자 간\n해외여행은 뭘까요?',
    options: ['도쿠시마', '상하이', '타이베이', '마쓰야마'],
    correctAnswer: 1,
  },
  {
    id: 6,
    type: 'choice',
    question: '제가 올해 새로 산\n전자기기는 뭘까요?',
    options: ['iPhone 17 pro', 'Apple Watch', 'AirPods Pro', 'iPad'],
    correctAnswer: 1,
  },
  {
    id: 7,
    type: 'choice',
    question: '저의 최애 애니메이션을\n맞춰보세요!',
    options: ['하이큐!!', '귀멸의 칼날', '진격의 거인', '괴수 8호'],
    correctAnswer: 0,
  },
  {
    id: 8,
    type: 'result',
    resultText: '저에 관한\n모든 걸 알고계세요!',
  },
];