'use client'

import Link from 'next/link'
import { Zap, CheckCircle2 } from 'lucide-react'
import { useGameStore } from '@/store/gameStore'

export default function DailyQuestShortcut() {
  const quests = useGameStore((s) => s.quests)
  const dailyQuests = quests.filter((q) => q.category === 'daily-monthly')
  const allDone = dailyQuests.length > 0 && dailyQuests.every((q) => q.status === 'completed')

  if (allDone) {
    return (
      <div className="flex w-full items-center justify-between rounded-xl bg-green-50 px-5 py-4 border border-green-200">
        <div className="flex items-center gap-3">
          <CheckCircle2 size={20} className="text-green-500" />
          <span className="font-semibold text-green-700">오늘의 미션 완료! 🎉</span>
        </div>
        <span className="text-green-400 text-sm">+{dailyQuests.reduce((s, q) => s + q.rewardPoints, 0)}P</span>
      </div>
    )
  }

  return (
    <Link
      href="/quests?category=daily-monthly"
      className="flex w-full items-center justify-between rounded-xl bg-blue-600 px-5 py-4 text-white shadow-md active:bg-blue-700 transition-colors"
      aria-label="오늘의 일일 퀘스트 바로가기"
    >
      <div className="flex items-center gap-3">
        <Zap size={20} className="text-yellow-300" fill="currentColor" />
        <span className="font-semibold">오늘의 일일 퀘스트</span>
      </div>
      <span className="text-blue-200">→</span>
    </Link>
  )
}
