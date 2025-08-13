"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BarChart3,
  Calendar,
  TrendingUp,
  Zap,
  Target,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Play,
  Github,
  Twitter,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [email, setEmail] = useState("")

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Interactive Heatmaps",
      description: "Transform your data into beautiful, interactive visualizations that reveal patterns at a glance.",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Daily Tracking",
      description: "Effortlessly track habits, moods, productivity, and any metric that matters to you.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Streak Tracking",
      description: "Stay motivated with automatic streak counting and achievement milestones.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Goal Setting",
      description: "Set daily targets and watch your progress unfold in real-time visualizations.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Pattern Recognition",
      description: "Discover trends and insights in your data that you never noticed before.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multiple Projects",
      description: "Track unlimited heatmaps for different aspects of your life or business.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      content: "Heatmaps.fun transformed how I track my team's productivity. The visual insights are incredible!",
      rating: 5,
    },
    {
      name: "Mike Rodriguez",
      role: "Fitness Enthusiast",
      content: "Finally found a tool that makes habit tracking actually enjoyable. My workout streak is at 45 days!",
      rating: 5,
    },
    {
      name: "Emma Thompson",
      role: "Data Analyst",
      content: "The interface is intuitive and the heatmaps reveal patterns I missed in spreadsheets.",
      rating: 5,
    },
  ]

  const useCases = [
    "Habit Tracking",
    "Mood Monitoring",
    "Exercise Logging",
    "Productivity Scoring",
    "Team Performance",
    "Sales Metrics",
    "Learning Progress",
    "Health Monitoring",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold">heatmaps.fun</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Dashboard
              </Link>
              <Button className="bg-purple-500 hover:bg-purple-600">Get Started Free</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-purple-100 text-purple-800 px-4 py-2">✨ Now with Daily Streak Tracking</Badge>

          <h1 className="text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            Visualize Your Data
            <br />
            <span className="text-purple-600">Like Never Before</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform complex datasets into stunning heatmaps. Track daily changes effortlessly. Discover patterns that
            drive better decisions and build lasting habits.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-lg px-8 py-4 gap-2">
              <Play className="w-5 h-5" />
              Try Demo
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 gap-2 bg-transparent">
              <Github className="w-5 h-5" />
              View on GitHub
            </Button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-8 text-center">
                  <BarChart3 className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Interactive Demo</h3>
                  <p className="text-gray-600">See your data come to life with beautiful heatmap visualizations</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Everything You Need to Track What Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make data visualization and habit tracking effortless and insightful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Perfect for Any Tracking Need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From personal habits to business metrics, heatmaps.fun adapts to your unique tracking requirements.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {useCases.map((useCase, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-200 bg-white">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <span className="font-medium text-gray-800">{useCase}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Loved by Thousands of Users</h2>
            <p className="text-xl text-gray-600">See what people are saying about their heatmaps.fun experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">Ready to Transform Your Data?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who've discovered the power of visual data tracking. Start your first heatmap today
            – it's completely free!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="max-w-sm bg-white"
            />
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 gap-2">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-purple-200 text-sm">No credit card required • Free forever • Setup in 2 minutes</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold">heatmaps.fun</span>
            </div>

            <div className="flex items-center gap-6">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Support
              </Link>
              <div className="flex gap-3">
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white p-2">
                  <Github className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 heatmaps.fun. All rights reserved. Built with ❤️ for data enthusiasts.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
