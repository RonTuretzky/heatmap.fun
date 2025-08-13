"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HeatmapGrid } from "@/components/heatmap-grid"
import { Plus, Edit2, Trash2 } from "lucide-react"

interface Heatmap {
  id: string
  title: string
}

export default function HomePage() {
  const [heatmaps, setHeatmaps] = useState<Heatmap[]>([])
  const [newHeatmapName, setNewHeatmapName] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState("")

  const saveHeatmapsToStorage = (heatmapList: Heatmap[]) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("heatmaps_list", JSON.stringify(heatmapList))
        console.log("Saved heatmaps list to localStorage:", heatmapList.length, "heatmaps")
      } catch (error) {
        console.error("Error saving heatmaps list to localStorage:", error)
      }
    }
  }

  const loadHeatmapsFromStorage = (): Heatmap[] => {
    if (typeof window !== "undefined") {
      try {
        const savedData = localStorage.getItem("heatmaps_list")
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          console.log("Loaded heatmaps list from localStorage:", parsedData.length, "heatmaps")
          return parsedData
        }
      } catch (error) {
        console.error("Error loading heatmaps list from localStorage:", error)
        localStorage.removeItem("heatmaps_list")
      }
      console.log("No heatmaps list found in localStorage, creating default")
    }
    return [{ id: "1", title: "My First Heatmap" }]
  }

  useEffect(() => {
    const savedHeatmaps = loadHeatmapsFromStorage()
    setHeatmaps(savedHeatmaps)
  }, [])

  const addHeatmap = () => {
    if (newHeatmapName.trim()) {
      const newHeatmap: Heatmap = {
        id: Date.now().toString(),
        title: newHeatmapName.trim(),
      }
      const updatedHeatmaps = [...heatmaps, newHeatmap]
      setHeatmaps(updatedHeatmaps)
      saveHeatmapsToStorage(updatedHeatmaps) // Save to localStorage
      setNewHeatmapName("")
    }
  }

  const deleteHeatmap = (id: string) => {
    const updatedHeatmaps = heatmaps.filter((h) => h.id !== id)
    setHeatmaps(updatedHeatmaps)
    saveHeatmapsToStorage(updatedHeatmaps) // Save to localStorage
  }

  const startEditing = (heatmap: Heatmap) => {
    setEditingId(heatmap.id)
    setEditingName(heatmap.title)
  }

  const saveEdit = () => {
    if (editingName.trim()) {
      const updatedHeatmaps = heatmaps.map((h) => (h.id === editingId ? { ...h, title: editingName.trim() } : h))
      setHeatmaps(updatedHeatmaps)
      saveHeatmapsToStorage(updatedHeatmaps) // Save to localStorage
    }
    setEditingId(null)
    setEditingName("")
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingName("")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">heatmaps.fun</h1>
          <p className="text-gray-600">Track anything with beautiful heatmaps</p>
        </div>

        {/* Add New Heatmap */}
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex gap-3">
            <Input
              placeholder="Enter heatmap name..."
              value={newHeatmapName}
              onChange={(e) => setNewHeatmapName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addHeatmap()}
              className="flex-1"
            />
            <Button onClick={addHeatmap} disabled={!newHeatmapName.trim()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Heatmap
            </Button>
          </div>
        </div>

        {/* Heatmaps */}
        <div className="space-y-8">
          {heatmaps.map((heatmap) => (
            <div key={heatmap.id} className="bg-white rounded-lg p-6 shadow-sm border">
              {/* Heatmap Header */}
              <div className="flex items-center justify-between mb-6">
                {editingId === heatmap.id ? (
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && saveEdit()}
                      className="text-xl font-bold"
                      autoFocus
                    />
                    <Button size="sm" onClick={saveEdit}>
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={cancelEdit}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900">{heatmap.title}</h2>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => startEditing(heatmap)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      {heatmaps.length > 1 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteHeatmap(heatmap.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Heatmap Grid */}
              <HeatmapGrid heatmapId={heatmap.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
