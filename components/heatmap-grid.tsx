"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"

interface HeatmapGridProps {
  heatmapId: string
}

interface DayData {
  date: string
  value: number
}

export function HeatmapGrid({ heatmapId }: HeatmapGridProps) {
  const [data, setData] = useState<DayData[]>([])

  const saveToStorage = (heatmapData: DayData[]) => {
    if (typeof window !== "undefined") {
      const storageKey = `heatmap_${heatmapId}`
      try {
        localStorage.setItem(storageKey, JSON.stringify(heatmapData))
        console.log("Saved to localStorage:", storageKey, heatmapData.length, "items")
      } catch (error) {
        console.error("Error saving to localStorage:", error)
      }
    }
  }

  const loadFromStorage = (): DayData[] | null => {
    if (typeof window !== "undefined") {
      const storageKey = `heatmap_${heatmapId}`
      try {
        const savedData = localStorage.getItem(storageKey)
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          console.log("Loaded from localStorage:", storageKey, parsedData.length, "items")
          return parsedData
        }
      } catch (error) {
        console.error("Error loading from localStorage:", error)
        localStorage.removeItem(storageKey)
      }
      console.log("No localStorage data found for:", storageKey)
    }
    return null
  }

  useEffect(() => {
    const savedData = loadFromStorage()

    if (savedData && savedData.length === 154) {
      setData(savedData)
    } else {
      // Create empty data (all zeros)
      const today = new Date()
      const days: DayData[] = []

      for (let i = 153; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        const dateStr = date.toISOString().split("T")[0]
        days.push({
          date: dateStr,
          value: 0, // Start with empty data instead of random values
        })
      }
      setData(days)
      saveToStorage(days) // Save initial empty data to localStorage
    }
  }, [heatmapId])

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0]
  }

  const getTodayValue = () => {
    const today = getTodayDate()
    const todayData = data.find((day) => day.date === today)
    return todayData?.value || 0
  }

  const updateTodayValue = (newValue: number) => {
    const today = getTodayDate()
    const clampedValue = Math.max(0, Math.min(4, newValue))
    const newData = data.map((day) => (day.date === today ? { ...day, value: clampedValue } : day))
    setData(newData)
    saveToStorage(newData) // Save to localStorage whenever data changes
  }

  const incrementToday = () => {
    updateTodayValue(getTodayValue() + 1)
  }

  const decrementToday = () => {
    updateTodayValue(getTodayValue() - 1)
  }

  const getIntensityColor = (value: number) => {
    if (value === 0) return "#161b22"
    if (value === 1) return "#0e4429"
    if (value === 2) return "#006d32"
    if (value === 3) return "#26a641"
    return "#39d353"
  }

  const renderHeatmap = () => {
    const squareSize = 12
    const gap = 2

    return (
      <div className="flex" style={{ gap: `${gap}px` }}>
        {Array.from({ length: 22 }, (_, colIndex) => (
          <div key={colIndex} className="flex flex-col" style={{ gap: `${gap}px` }}>
            {Array.from({ length: 7 }, (_, rowIndex) => {
              const dayIndex = colIndex * 7 + rowIndex
              const day = data[dayIndex]
              if (!day) return null

              const isToday = day.date === getTodayDate()

              return (
                <div
                  key={day.date}
                  className={`transition-all duration-200 ${isToday ? "ring-2 ring-blue-400" : ""}`}
                  style={{
                    width: `${squareSize}px`,
                    height: `${squareSize}px`,
                    backgroundColor: getIntensityColor(day.value),
                    borderRadius: "2px",
                  }}
                  title={`${day.date}: ${day.value}${isToday ? " (Today)" : ""}`}
                />
              )
            })}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Today's Controls */}
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <span className="text-sm font-medium text-gray-700">Today's value:</span>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={decrementToday} disabled={getTodayValue() <= 0}>
            <Minus className="w-4 h-4" />
          </Button>
          <span className="w-8 text-center font-bold text-lg">{getTodayValue()}</span>
          <Button size="sm" variant="outline" onClick={incrementToday} disabled={getTodayValue() >= 4}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <span className="text-xs text-gray-500">Use - and + to update today's block</span>
      </div>

      {/* Heatmap */}
      <div className="flex justify-center">{renderHeatmap()}</div>
    </div>
  )
}
