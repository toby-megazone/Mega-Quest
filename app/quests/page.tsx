'use client'

import { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useGameStore } from '@/store/gameStore'
import type { QuestCategory } from '@/lib/types'
import CategoryTabs from '@/components/CategoryTabs'
import QuestCard from '@/components/QuestCard'

const ALL_CATEGORIES: QuestCategory[] = [
  'pre-boarding',
  'day-one',
  'mandatory-training',
  'company-culture',
  'hr-beginner',
  'role-specific',
  'daily-monthly',
]

function QuestListContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const quests = useGameStore((s) => s.quests)

  const rawCategory = searchParams.get('category')

  // 미완료 퀘스트가 있는 첫 번째 카테고리로 자동 포커스
  const defaultCategory: QuestCategory =
    ALL_CATEGORIES.find((cat) =>
      quests.some((q) => q.category === cat && q.status === 'available')
    ) ?? 'hr-beginner'

  const activeCategory: QuestCategory = ALL_CATEGORIES.includes(rawCategory as QuestCategory)
    ? (rawCategory as QuestCategory)
    : defaultCategory

  const filtered = quests.filter((q) => q.category === activeCategory)
  const completedCount = filtered.filter((q) => q.status === 'completed').length
  const totalAllQuests = quests.length
  const totalCompletedQuests = quests.filter((q) => q.status === 'completed').length

  return (
    <div className="flex flex-col gap-4 px-4 pt-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">퀘스트 로드맵</h1>
        <p className="text-sm text-gray-400">미션을 완료하고 트리니티 펫을 키워보세요!</p>
      </div>

      {/* 전체 진행률 요약 */}
      <div className="flex items-center justify-between rounded-xl bg-blue-50 px-4 py-2">
        <span className="text-sm font-medium text-blue-700">전체 진행률</span>
        <span className="text-sm font-bold text-blue-700">
          {totalCompletedQuests} / {totalAllQuests} 완료
        </span>
      </div>

      <CategoryTabs activeCategory={activeCategory} />

      <div className="text-xs text-gray-400">
        {completedCount}/{filtered.length} 완료
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((quest) => (
          <div
            key={quest.id}
            className={quest.status === 'locked' ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
          >
            <QuestCard
              quest={quest}
              onClick={quest.status !== 'locked'
                ? () => router.push(`/quests/${quest.id}`)
                : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function QuestsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center pt-20 text-gray-400">
        로딩 중...
      </div>
    }>
      <QuestListContent />
    </Suspense>
  )
}
