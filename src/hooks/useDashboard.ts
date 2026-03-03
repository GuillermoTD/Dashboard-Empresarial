import { useDashboardStore } from "@/stores/dashboard-store";
import { TimeRange } from "@/types/dashboard";
import { useCallback } from "react";

export const useDashboard = () => {
  const {
    metrics,
    chartData,
    filters,
    isLoading,
    error,
    setTimeRange,
    setFilters,
    fetchMetrics,
    fetchChartData,
  } = useDashboardStore();

  const handleTimeRangeChange = useCallback(
    (timeRange: TimeRange) => {
      setTimeRange(timeRange);
    },
    [setTimeRange],
  );

  const calculateChange = useCallback((current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  }, []);

  return {
    // Estado
    metrics,
    chartData,
    filters,
    isLoading,
    error,

    // Acciones
    handleTimeRangeChange,
    setFilters,
    fetchMetrics,
    fetchChartData,
    calculateChange,

    // Utilidades
    hasData: metrics.length > 0 && chartData !== null,
  };
};
