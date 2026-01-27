"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calculator,
  Wallet,
  Heart,
  Users,
  Home,
  RefreshCw,
  ChevronDown,
  ExternalLink,
  Check,
  Info,
} from "lucide-react"

interface ZakatCalculatorPanelProps {
  connected: boolean
  onConnect: () => void
}

export function ZakatCalculatorPanel({ connected, onConnect }: ZakatCalculatorPanelProps) {
  const [zakatType, setZakatType] = useState("income")
  const [incomeType, setIncomeType] = useState("monthly")
  const [monthlyIncome, setMonthlyIncome] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [peopleCount, setPeopleCount] = useState("")
  const [hasDeductions, setHasDeductions] = useState(false)
  const [expenses, setExpenses] = useState("")
  const [errors, setErrors] = useState<{ monthlyIncome?: string; peopleCount?: string; expenses?: string }>({})

  // Zakat constants
  const goldPrice = 2650.0 // USD per oz
  const nisabThreshold = 7296.88 // USD (85g gold)
  const zakatRate = 2.5
  const fitrahPerPerson = 15 // USD equivalent

  const validateInputs = () => {
    const newErrors: typeof errors = {}

    if (monthlyIncome && (isNaN(parseFloat(monthlyIncome)) || parseFloat(monthlyIncome) < 0)) {
      newErrors.monthlyIncome = "Please enter a valid positive number"
    }

    if (peopleCount && (isNaN(parseFloat(peopleCount)) || parseFloat(peopleCount) < 1 || !Number.isInteger(parseFloat(peopleCount)))) {
      newErrors.peopleCount = "Please enter a valid whole number (minimum 1)"
    }

    if (expenses && (isNaN(parseFloat(expenses)) || parseFloat(expenses) < 0)) {
      newErrors.expenses = "Please enter a valid positive number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateZakat = () => {
    if (!monthlyIncome || monthlyIncome.trim() === "") return 0

    const income = parseFloat(monthlyIncome)
    if (isNaN(income) || income <= 0) return 0

    const yearlyIncome = incomeType === "monthly" ? income * 12 : income
    const deductedIncome =
      hasDeductions && expenses ? yearlyIncome - parseFloat(expenses || "0") : yearlyIncome

    if (deductedIncome < nisabThreshold) return 0
    return deductedIncome * (zakatRate / 100)
  }

  const calculatedZakat = calculateZakat()
  const totalFitrah = peopleCount ? parseFloat(peopleCount) * fitrahPerPerson : 0

  const handlePayZakat = () => {
    // Redirect to zkt.app with calculated amount
    const amount = calculatedZakat.toFixed(2)
    const url = `https://zkt.app?amount=${amount}&type=maal&currency=USD`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const handlePayFitrah = () => {
    // Redirect to zkt.app with fitrah amount
    const amount = totalFitrah.toFixed(2)
    const url = `https://zkt.app?amount=${amount}&type=fitrah&currency=USD`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FFC700] to-[#ffe38a] bg-clip-text text-transparent">
          Zakat Calculator
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Calculate your Zakat obligation and pay transparently on-chain
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Nisab Information Card */}
          <Card className="bg-black/95 border border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-[#FFC700]" />
                  <h3 className="text-lg font-semibold text-white">Live Nisab Threshold</h3>
                </div>
                <button className="inline-flex items-center gap-2 text-sm text-[#FFC700] hover:text-[#ffe38a] transition-colors">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                  <div className="text-xs text-gray-400 mb-1">Gold Price</div>
                  <div className="text-lg font-bold text-white">${goldPrice.toFixed(2)}/oz</div>
                  <Badge className="bg-[#FFC700]/20 text-[#FFC700] border-[#FFC700]/30 text-xs mt-1">
                    Live
                  </Badge>
                </div>

                <div className="text-center p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                  <div className="text-xs text-gray-400 mb-1">Nisab (85g Gold)</div>
                  <div className="text-lg font-bold text-white">${nisabThreshold.toFixed(2)}</div>
                </div>

                <div className="text-center p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                  <div className="text-xs text-gray-400 mb-1">Zakat Rate</div>
                  <div className="text-lg font-bold text-white">{zakatRate}%</div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Nisab threshold based on live gold prices (85 grams). Updates every 5 minutes.
              </p>
            </CardContent>
          </Card>

          {/* Tabs for Wealth and Fitrah */}
          <Card className="bg-black/95 border border-gray-800">
            <Tabs defaultValue="maal" className="w-full">
              <TabsList className="grid grid-cols-2 bg-gray-900/50 border-b border-gray-800 rounded-none rounded-t-lg">
                <TabsTrigger
                  value="maal"
                  className="data-[state=active]:bg-[#FFC700]/10 data-[state=active]:text-[#FFC700] data-[state=active]:border-b-2 data-[state=active]:border-[#FFC700] rounded-none py-4"
                >
                  Wealth Zakat
                </TabsTrigger>
                <TabsTrigger
                  value="fitrah"
                  className="data-[state=active]:bg-[#FFC700]/10 data-[state=active]:text-[#FFC700] data-[state=active]:border-b-2 data-[state=active]:border-[#FFC700] rounded-none py-4"
                >
                  Fitrah Zakat
                </TabsTrigger>
              </TabsList>

              {/* Wealth Zakat Tab */}
              <TabsContent value="maal" className="p-6 space-y-6">
                {/* Zakat Type Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Zakat Type</label>
                  <select
                    value={zakatType}
                    onChange={(e) => setZakatType(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FFC700]/50 focus:border-[#FFC700]"
                  >
                    <option value="income">Income Zakat - For salary & wages</option>
                    <option value="trade">Trade Zakat - For business assets</option>
                    <option value="savings">Savings Zakat - For liquid assets</option>
                    <option value="gold">Gold & Silver Zakat</option>
                  </select>
                </div>

                {zakatType === "income" && (
                  <>
                    {/* Income Period */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Income Calculation Period
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="monthly"
                            checked={incomeType === "monthly"}
                            onChange={(e) => setIncomeType(e.target.value)}
                            className="w-4 h-4 accent-[#FFC700]"
                          />
                          <span className="text-sm text-gray-300">Monthly</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="yearly"
                            checked={incomeType === "yearly"}
                            onChange={(e) => setIncomeType(e.target.value)}
                            className="w-4 h-4 accent-[#FFC700]"
                          />
                          <span className="text-sm text-gray-300">Yearly</span>
                        </label>
                      </div>
                    </div>

                    {/* Income Input */}
                    <div>
                      <label htmlFor="monthly-income" className="block text-sm font-medium text-gray-300 mb-2">
                        {incomeType === "monthly" ? "Monthly Income*" : "Yearly Income*"}
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true">$</span>
                        <Input
                          id="monthly-income"
                          type="number"
                          value={monthlyIncome}
                          onChange={(e) => {
                            setMonthlyIncome(e.target.value)
                            if (errors.monthlyIncome) setErrors({ ...errors, monthlyIncome: undefined })
                          }}
                          onBlur={validateInputs}
                          placeholder={`Enter your ${incomeType} income in USD`}
                          className="pl-8 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FFC700] focus:ring-[#FFC700]/50"
                          aria-invalid={errors.monthlyIncome ? "true" : undefined}
                          aria-describedby={errors.monthlyIncome ? "monthly-income-error" : undefined}
                        />
                      </div>
                      {errors.monthlyIncome && (
                        <p id="monthly-income-error" className="text-red-400 text-xs mt-1" role="alert">
                          {errors.monthlyIncome}
                        </p>
                      )}
                    </div>

                    {/* Advanced Options Toggle */}
                    <button
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="flex items-center gap-2 text-sm text-[#FFC700] hover:text-[#ffe38a] transition-colors"
                    >
                      {showAdvanced ? "Hide" : "Show"} advanced options
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
                      />
                    </button>

                    {showAdvanced && (
                      <div className="space-y-4 pt-2">
                        {/* Deduction Toggle */}
                        <div className="flex items-center justify-between p-4 bg-[#FFC700]/10 rounded-lg border border-[#FFC700]/30">
                          <span className="text-sm font-medium text-[#FFC700]">
                            Apply work-related deductions
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={hasDeductions}
                              onChange={(e) => setHasDeductions(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#FFC700]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFC700]"></div>
                          </label>
                        </div>

                        {/* Expenses Input */}
                        {hasDeductions && (
                          <div>
                            <label htmlFor="expenses-input" className="block text-sm font-medium text-gray-300 mb-2">
                              Expenses (USD)
                            </label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true">
                                $
                              </span>
                              <Input
                                id="expenses-input"
                                type="number"
                                value={expenses}
                                onChange={(e) => {
                                  setExpenses(e.target.value)
                                  if (errors.expenses) setErrors({ ...errors, expenses: undefined })
                                }}
                                onBlur={validateInputs}
                                placeholder="Enter your expenses in USD"
                                className="pl-8 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FFC700] focus:ring-[#FFC700]/50"
                                aria-invalid={errors.expenses ? "true" : undefined}
                                aria-describedby={errors.expenses ? "expenses-error" : "expenses-help"}
                              />
                            </div>
                            {errors.expenses ? (
                              <p id="expenses-error" className="text-red-400 text-xs mt-1" role="alert">
                                {errors.expenses}
                              </p>
                            ) : (
                              <p id="expenses-help" className="text-xs text-gray-500 mt-1">
                                Optional: Enter your work-related or other deductible expenses
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Payment Obligation */}
                    <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                      <div className="text-sm font-medium text-gray-300 mb-1">Payment Obligation</div>
                      <div
                        className={`text-sm ${calculatedZakat > 0 ? "text-[#FFC700] font-medium" : "text-gray-400"}`}
                      >
                        {calculatedZakat > 0
                          ? "Required to Pay Zakat"
                          : "Not Required to Pay Zakat, but Can Give Charity"}
                      </div>
                    </div>
                  </>
                )}

                {/* Calculated Amount */}
                {calculatedZakat > 0 && (
                  <div className="p-6 rounded-lg border border-[#FFC700]/30 bg-[#FFC700]/5">
                    <div className="text-center">
                      <p className="text-sm text-gray-400 mb-2">Your Zakat Amount:</p>
                      <p className="text-4xl font-bold bg-gradient-to-r from-[#FFC700] to-[#ffe38a] bg-clip-text text-transparent mb-1">
                        ${calculatedZakat.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {zakatRate}% of taxable income above nisab
                      </p>
                    </div>
                  </div>
                )}

                {/* Pay Button */}
                {connected ? (
                  <Button
                    onClick={handlePayZakat}
                    disabled={calculatedZakat === 0}
                    className="w-full py-6 bg-gradient-to-r from-[#FFC700] to-[#ffe38a] text-black font-semibold hover:opacity-90 hover:shadow-lg hover:shadow-[#FFC700]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Pay Zakat via zkt.app
                  </Button>
                ) : (
                  <Button
                    onClick={onConnect}
                    className="w-full py-6 bg-gradient-to-r from-[#FFC700] to-[#ffe38a] text-black font-semibold hover:opacity-90 hover:shadow-lg hover:shadow-[#FFC700]/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Wallet className="h-4 w-4" />
                    Connect Wallet to Pay
                  </Button>
                )}
              </TabsContent>

              {/* Fitrah Zakat Tab */}
              <TabsContent value="fitrah" className="p-6 space-y-6">
                {/* Fitrah Amount Display */}
                <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-2">Fitrah Zakat per person:</p>
                    <p className="text-3xl font-bold text-white mb-1">${fitrahPerPerson}</p>
                    <p className="text-xs text-gray-500">Equivalent to 2.5kg rice</p>
                  </div>
                </div>

                {/* People Count Input */}
                <div>
                  <label htmlFor="people-count" className="block text-sm font-medium text-gray-300 mb-2">
                    Number of People
                  </label>
                  <Input
                    id="people-count"
                    type="number"
                    value={peopleCount}
                    onChange={(e) => {
                      setPeopleCount(e.target.value)
                      if (errors.peopleCount) setErrors({ ...errors, peopleCount: undefined })
                    }}
                    onBlur={validateInputs}
                    placeholder="Enter number of people"
                    min="1"
                    step="1"
                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#FFC700] focus:ring-[#FFC700]/50"
                    aria-invalid={errors.peopleCount ? "true" : undefined}
                    aria-describedby={errors.peopleCount ? "people-count-error" : undefined}
                  />
                  {errors.peopleCount && (
                    <p id="people-count-error" className="text-red-400 text-xs mt-1" role="alert">
                      {errors.peopleCount}
                    </p>
                  )}
                </div>

                {/* Calculation Breakdown */}
                <div className="space-y-3 py-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Per person:</span>
                    <span className="font-medium text-white">${fitrahPerPerson}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Number of people:</span>
                    <span className="font-medium text-white">{peopleCount || 0}</span>
                  </div>
                  <div className="h-px bg-gray-800" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-white">Total:</span>
                    <span className="bg-gradient-to-r from-[#FFC700] to-[#ffe38a] bg-clip-text text-transparent">
                      ${totalFitrah.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Pay Button */}
                {connected ? (
                  <Button
                    onClick={handlePayFitrah}
                    disabled={!peopleCount || totalFitrah === 0}
                    className="w-full py-6 bg-gradient-to-r from-[#FFC700] to-[#ffe38a] text-black font-semibold hover:opacity-90 hover:shadow-lg hover:shadow-[#FFC700]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Pay Zakat Fitrah via zkt.app
                  </Button>
                ) : (
                  <Button
                    onClick={onConnect}
                    className="w-full py-6 bg-gradient-to-r from-[#FFC700] to-[#ffe38a] text-black font-semibold hover:opacity-90 hover:shadow-lg hover:shadow-[#FFC700]/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Wallet className="h-4 w-4" />
                    Connect Wallet to Pay
                  </Button>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Impact Areas */}
          <Card className="bg-black/95 border border-gray-800">
            <div className="p-4 border-b border-gray-800">
              <h3 className="font-semibold text-sm text-white">Impact Areas</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-[#FFC700]/5 transition-colors">
                <Heart className="h-5 w-5 text-[#FFC700] flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-white">Orphans</div>
                  <div className="text-xs text-gray-500">Supporting orphaned children</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-[#FFC700]/5 transition-colors">
                <Users className="h-5 w-5 text-[#FFC700] flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-white">Refugees</div>
                  <div className="text-xs text-gray-500">Helping displaced families</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg hover:bg-[#FFC700]/5 transition-colors">
                <Home className="h-5 w-5 text-[#FFC700] flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-white">Local Aid</div>
                  <div className="text-xs text-gray-500">Community support programs</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Transparency Guarantee */}
          <Card className="bg-black/95 border border-gray-800">
            <div className="p-4 border-b border-gray-800">
              <h3 className="font-semibold text-sm text-white">Transparency Guarantee</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">✓</Badge>
                <span className="text-xs text-gray-400">Blockchain verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">✓</Badge>
                <span className="text-xs text-gray-400">Real-time tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">✓</Badge>
                <span className="text-xs text-gray-400">Impact reports</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">✓</Badge>
                <span className="text-xs text-gray-400">NFT certificates</span>
              </div>
            </div>
          </Card>

          {/* Global Impact */}
          <Card className="bg-black/95 border border-gray-800">
            <div className="p-4 border-b border-gray-800">
              <h3 className="font-semibold text-sm text-white">Global Impact</h3>
            </div>
            <div className="p-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Total Donated:</span>
                <span className="font-semibold text-white">$2.4M</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Families Helped:</span>
                <span className="font-semibold text-white">3,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Active Donors:</span>
                <span className="font-semibold text-white">1,856</span>
              </div>
            </div>
          </Card>

          {/* zkt.app Info */}
          <Card className="bg-[#FFC700]/10 border border-[#FFC700]/30">
            <div className="p-4">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-[#FFC700] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-[#FFC700]">Powered by zkt.app</div>
                  <div className="text-xs text-gray-400 mt-1">
                    Payments are processed securely through zkt.app, ensuring transparent and
                    Shariah-compliant distribution.
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
