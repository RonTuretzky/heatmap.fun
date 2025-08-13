"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart3, Trash2, Calendar } from "lucide-react"

interface Heatmap {
  id: string
  title: string
  type: string
  createdAt: string
  lastUpdated: string
  totalDays: number
  activeDays: number
}

interface DashboardSidebarProps {
  heatmaps: Heatmap[]
  selectedHeatmapId: string
  onSelectHeatmap: (id: string) => void
  onDeleteHeatmap: (id: string) => void
}

export function DashboardSidebar({
  heatmaps,
  selectedHeatmapId,
  onSelectHeatmap,
  onDeleteHeatmap,
}: DashboardSidebarProps) {
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

  const getDaysSinceUpdate = (lastUpdated: string) => {
    const days = Math.floor((Date.now() - new Date(lastUpdated).getTime()) / (1000 * 60 * 60 * 24))
    if (days === 0) return "Today"
    if (days === 1) return "Yesterday"
    return `${days} days ago`
  }

  return (
    <div className="w-80 border-r border-border bg-card h-[calc(100vh-73px)] flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="font-serif font-bold text-lg flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-purple-500" />
          Your Heatmaps
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{heatmaps.length} active trackers</p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {heatmaps.map((heatmap) => (
            <div
              key={heatmap.id}
              className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
                selectedHeatmapId === heatmap.id
                  ? "bg-purple-50 border-purple-200 shadow-sm"
                  : "bg-background border-border hover:bg-muted/50"
              }`}
              onClick={() => onSelectHeatmap(heatmap.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm truncate pr-2">{heatmap.title}</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteHeatmap(heatmap.id)
                  }}
                  className="h-6 w-6 p-0 hover:bg-red-100 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>

              <div className="space-y-2">
                <Badge className={`text-xs ${getTypeColor(heatmap.type)}`}>
                  {heatmap.type.charAt(0).toUpperCase() + heatmap.type.slice(1)}
                </Badge>

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {getDaysSinceUpdate(heatmap.lastUpdated)}
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{Math.round((heatmap.activeDays / heatmap.totalDays) * 100)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className="bg-purple-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${(heatmap.activeDays / heatmap.totalDays) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
