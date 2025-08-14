"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Minus, Settings, Palette } from "lucide-react"

interface HeatmapGridProps {
  heatmapId: string
}

interface DayData {
  date: string
  value: number
}

type Theme = "github" | "ocean" | "sunset" | "forest" | "purple"

const themes = {
  github: {
    name: "GitHub",
    colors: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  },
  ocean: {
    name: "Ocean",
    colors: ["#e0f2fe", "#bae6fd", "#7dd3fc", "#38bdf8", "#0ea5e9"],
  },
  sunset: {
    name: "Sunset",
    colors: ["#fef3c7", "#9a3412", "#ea580c", "#fb923c", "#fed7aa"],
  },
  forest: {
    name: "Forest",
    colors: ["#14532d", "#166534", "#16a34a", "#4ade80", "#86efac"],
  },
  purple: {
    name: "Purple",
    colors: ["#f3e8ff", "#e9d5ff", "#d8b4fe", "#c084fc", "#a855f7"],
  },
}

export function HeatmapGrid({ heatmapId }: HeatmapGridProps) {
  const [data, setData] = useState<DayData[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const [theme, setTheme] = useState<Theme>("github")

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

  const saveThemeToStorage = (selectedTheme: Theme) => {
    if (typeof window !== "undefined") {
      const themeKey = `heatmap_theme_${heatmapId}`
      try {
        localStorage.setItem(themeKey, selectedTheme)
        console.log("Saved theme to localStorage:", themeKey, selectedTheme)
      } catch (error) {
        console.error("Error saving theme to localStorage:", error)
      }
    }
  }

  const loadThemeFromStorage = (): Theme => {
    if (typeof window !== "undefined") {
      const themeKey = `heatmap_theme_${heatmapId}`
      try {
        const savedTheme = localStorage.getItem(themeKey) as Theme
        if (savedTheme && themes[savedTheme]) {
          console.log("Loaded theme from localStorage:", themeKey, savedTheme)
          return savedTheme
        }
      } catch (error) {
        console.error("Error loading theme from localStorage:", error)
      }
    }
    return "github"
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

  const ensureDataIncludesToday = (currentData: DayData[]): DayData[] => {
    const today = getTodayDate()
    const hasToday = currentData.some((day) => day.date === today)

    if (hasToday) {
      return currentData
    }

    // If today is not in the data, we need to update the date range
    console.log("Today not found in data, updating date range")
    const newData: DayData[] = []
    const todayDate = new Date()

    for (let i = 153; i >= 0; i--) {
      const date = new Date(todayDate)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]

      // Try to find existing data for this date
      const existingDay = currentData.find((day) => day.date === dateStr)
      newData.push({
        date: dateStr,
        value: existingDay?.value || 0,
      })
    }

    return newData
  }

  useEffect(() => {
    const savedData = loadFromStorage()
    const savedTheme = loadThemeFromStorage()
    setTheme(savedTheme)

    if (savedData && savedData.length === 154) {
      const updatedData = ensureDataIncludesToday(savedData)
      setData(updatedData)

      // Save the updated data if it changed
      if (updatedData !== savedData) {
        saveToStorage(updatedData)
      }
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

  useEffect(() => {
    const handleFocus = () => {
      setData((currentData) => {
        const updatedData = ensureDataIncludesToday(currentData)
        if (updatedData !== currentData) {
          saveToStorage(updatedData)
        }
        return updatedData
      })
    }

    window.addEventListener("focus", handleFocus)
    return () => window.removeEventListener("focus", handleFocus)
  }, [])

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

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    saveThemeToStorage(newTheme)
  }

  const getIntensityColor = (value: number) => {
    return themes[theme].colors[value] || themes[theme].colors[0]
  }

  const renderHeatmap = () => {
    const squareSize = 12
    const gap = 2

    return (
      <div
        className="inline-block p-4 rounded-xl"
        style={{
          background: `linear-gradient(135deg, ${themes[theme].colors[0]}22, ${themes[theme].colors[1]}11)`,
        }}
      >
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
                      borderRadius: "4px",
                    }}
                    title={`${day.date}: ${day.value}${isToday ? " (Today)" : ""}`}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Today's Controls */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
        <div className="flex items-center gap-4">
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
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          Settings
        </Button>
      </div>

      {showSettings && (
        <div className="p-4 bg-white border rounded-lg shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-4 h-4" />
              <span className="font-medium text-gray-700">Theme</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(themes).map(([key, themeData]) => (
                <button
                  key={key}
                  onClick={() => handleThemeChange(key as Theme)}
                  className={`p-2 rounded-lg border-2 transition-all ${
                    theme === key ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex gap-1 mb-1">
                    {themeData.colors.slice(1).map((color, index) => (
                      <div key={index} className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                  <div className="text-xs font-medium text-gray-600">{themeData.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Heatmap */}
      <div className="flex justify-center">{renderHeatmap()}</div>
    </div>
  )
}
