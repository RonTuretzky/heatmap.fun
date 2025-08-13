"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Target, TrendingUp, Clock } from "lucide-react"

interface Heatmap {
  id: string
  title: string
  type: string
  lastUpdated: string
  currentStreak: number
  dailyGoal: number
  todayValue: number
}

interface DailyUpdateWidgetProps {
  heatmaps: Heatmap[]
  onQuickUpdate: (heatmapId: string, value: number) => void
  onOpenCheckin: (heatmapId: string) => void
}

export function DailyUpdateWidget({ heatmaps, onQuickUpdate, onOpenCheckin }: DailyUpdateWidgetProps) {
  const today = new Date().toISOString().split("T")[0]

  const pendingUpdates = heatmaps.filter((h) => h.lastUpdated !== today)
  const completedToday = heatmaps.filter((h) => h.lastUpdated === today && h.todayValue > 0)

  const getTypeColor = (type: string) => {
    const colors = {
      exercise: "bg-green-100 text-green-800",
      mood: "bg-blue-100 text-blue-800",
      habits: "bg-purple-100 text-purple-800",
      productivity: "bg-orange-100 text-orange-800",
      custom: "bg-gray-100 text-gray-800",
    }
    return colors[type as keyof typeof colors] || colors.custom
  }

  if (pendingUpdates.length === 0) {
    return (
      <Card className="border-0 shadow-md bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="font-serif font-bold text-lg text-green-800 mb-2">All Caught Up!</h3>
          <p className="text-green-700">You've updated all your heatmaps today. Great job!</p>
          <div className="mt-4 text-sm text-green-600">
            {completedToday.length} heatmap{completedToday.length !== 1 ? "s" : ""} updated today
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-md bg-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif font-bold text-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-500" />
            Daily Check-in
          </h3>
          <Badge variant="secondary">{pendingUpdates.length} pending</Badge>
        </div>

        <div className="space-y-3">
          {pendingUpdates.slice(0, 3).map((heatmap) => (
            <div
              key={heatmap.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{heatmap.title}</span>
                  <Badge className={`text-xs ${getTypeColor(heatmap.type)}`}>{heatmap.type}</Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {heatmap.currentStreak} day streak
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    Goal: {heatmap.dailyGoal}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onQuickUpdate(heatmap.id, heatmap.dailyGoal)}
                  className="text-xs px-2 py-1 h-7"
                >
                  Quick: {heatmap.dailyGoal}
                </Button>
                <Button
                  size="sm"
                  onClick={() => onOpenCheckin(heatmap.id)}
                  className="text-xs px-3 py-1 h-7 bg-purple-500 hover:bg-purple-600"
                >
                  Update
                </Button>
              </div>
            </div>
          ))}

          {pendingUpdates.length > 3 && (
            <div className="text-center pt-2">
              <span className="text-sm text-gray-500">+{pendingUpdates.length - 3} more heatmaps need updates</span>
            </div>
          )}
        </div>

        {completedToday.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>{completedToday.length} completed today</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
