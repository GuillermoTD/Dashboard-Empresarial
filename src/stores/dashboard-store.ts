import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import {
  Metric,
  ChartData,
  DashboardFilters,
  TimeRange,
} from "../types/dashboard";

interface DashboardState {
  metrics: Metric[];
  chartData: ChartData | null;
  filters: DashboardFilters;
  isLoading: boolean;
  error: string | null;

  //Acciones para modificar el estado
  // Adicionalmente, los particials permiten que se pueda actualizar el estado sin tener enviar todos los campos sino lo solo los que cambien
  setFilters: (filters: Partial<DashboardFilters>) => void;
  setTimeRange: (timeRange: TimeRange) => void;
  fetchMetrics: () => Promise<void>;
  fetchChartData: (timeRange: TimeRange) => Promise<void>;
  resetError: () => void;
}

//Data de pruueba
// Datos mock iniciales para desarrollo
export const initialMetrics: Metric[] = [
  {
    id: "revenue",
    name: "Ingresos Totales",
    value: 125430,
    previousValue: 118200,
    unit: "currency",
    timestamp: new Date(),
  },
  {
    id: "conversion",
    name: "Tasa de Conversión",
    value: 4.3,
    previousValue: 3.8,
    unit: "percentage",
    timestamp: new Date(),
  },
];

export const useDashboardStore = create<DashboardState>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        metrics: initialMetrics,
        chartData: null,
        filters: {
          timeRange: "7d",
          compareWithPrevious: true,
        },
        isLoading: false,
        error: null,

        // Acciones
        setFilters: (newFilters) => {
          set((state) => ({
            filters: { ...state.filters, ...newFilters },
          }));
        },

        fetchMetrics: async () => {
          set({ isLoading: true, error: null });

          try {
            // Simulación de API call
            await new Promise((resolve) =>
              setTimeout(resolve, 1000)
            );

            // En un caso real, aquí iría la llamada a la API
            set({ metrics: initialMetrics, isLoading: false });
          } catch (error) {
            set({
              error: "Error al cargar las métricas",
              isLoading: false,
            });
          }
        },

        setTimeRange: (timeRange) => {
          set((state) => ({
            filters: { ...state.filters, timeRange },
          }));
        },

        fetchChartData: async (timeRange) => {
          set({ isLoading: true, error: null });

          try {
            // Simulación de API call
            await new Promise((resolve) =>
              setTimeout(resolve, 1000)
            );

            // En un caso real, aquí iría la llamada a la API
            set({ chartData: null, isLoading: false });
          } catch (error) {
            set({
              error: "Error al cargar los datos del gráfico",
              isLoading: false,
            });
          }
        },

        resetError: () => {
          set({ error: null });
        },
      }),
      {
        name: "dashboard-storage", // requerido para persist
      }
    )
  )
);
