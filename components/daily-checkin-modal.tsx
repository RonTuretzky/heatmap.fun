"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Target, Zap, CheckCircle } from "lucide-react"

interface DailyCheckinModalProps {
  isOpen: boolean
  onClose: () => void
  heatmapTitle: string
  heatmapType: string
  todayValue: number
  onUpdateToday: (value: number) => void
  currentStreak: number
  dailyGoal?: number
}

export function DailyCheckinModal({
  isOpen,
  onClose,
  heatmapTitle,
  heatmapType,
  todayValue,
  onUpdateToday,
  currentStreak,
  dailyGoal = 5,
}: DailyCheckinModalProps) {
  const [inputValue, setInputValue] = useState(todayValue.toString())
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setInputValue(todayValue.toString())
  }, [todayValue])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const value = Number.parseInt(inputValue) || 0
    onUpdateToday(value)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    setIsSubmitting(false)
    onClose()
  }

  const getTypeUnit = (type: string) => {
    const units = {
      exercise: "minutes",
      mood: "rating (1-10)",
      habits: "times",
      productivity: "score (1-10)",
      custom: "value",
    }
    return units[type as keyof typeof units] || "value"
  }

  const getMotivationalMessage = () => {
    if (currentStreak === 0) return "Start your streak today!"
    if (currentStreak < 7) return `Great start! ${currentStreak} day streak`
    if (currentStreak < 30) return `Amazing! ${currentStreak} day streak 🔥`
    return `Incredible! ${currentStreak} day streak! You're unstoppable!`
  }

  const progressPercentage = Math.min((Number.parseInt(inputValue) / dailyGoal) * 100, 100)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif font-bold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-500" />
            Daily Check-in
          </DialogTitle>
          <DialogDescription>
            Update your progress for <span className="font-medium">{heatmapTitle}</span> today
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Streak Display */}
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-orange-500" />
              <span className="text-2xl font-serif font-bold text-gray-800">{currentStreak}</span>
              <span className="text-gray-600">day streak</span>
            </div>
            <p className="text-sm text-gray-600">{getMotivationalMessage()}</p>
          </div>

          {/* Daily Goal Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-500" />
                Today's Goal: {dailyGoal} {getTypeUnit(heatmapType)}
              </Label>
              <Badge variant={progressPercentage >= 100 ? "default" : "secondary"}>
                {Math.round(progressPercentage)}%
              </Badge>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Input */}
          <div className="space-y-2">
            <Label htmlFor="daily-value">Enter today's {getTypeUnit(heatmapType)}</Label>
            <Input
              id="daily-value"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="0"
              min="0"
              max="100"
              className="text-center text-lg font-medium"
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 3, 5, 10].map((quickValue) => (
              <Button
                key={quickValue}
                variant="outline"
                size="sm"
                onClick={() => setInputValue(quickValue.toString())}
                className="transition-all duration-200 hover:scale-105"
              >
                {quickValue}
              </Button>
            ))}
          </div>

          {/* Submit */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Skip Today
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 bg-purple-500 hover:bg-purple-600">
              {isSubmitting ? (
                "Updating..."
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Update
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
