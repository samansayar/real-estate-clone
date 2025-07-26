import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface SearchFilters {
  type?: string;
  province?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  rooms?: number[];
  amenities?: string[];
  propertyAge?: string;
  transactionType?: "خرید" | "اجاره";
}

interface SearchState {
  filters: SearchFilters;
  sortBy: string;
  isLoading: boolean;
  showMobileFilters: boolean;
  
  // Actions
  setFilters: (filters: SearchFilters) => void;
  updateFilter: (key: keyof SearchFilters, value: any) => void;
  clearFilters: () => void;
  setSortBy: (sortBy: string) => void;
  setIsLoading: (loading: boolean) => void;
  setShowMobileFilters: (show: boolean) => void;
  toggleAmenity: (amenity: string) => void;
  toggleRoom: (room: number) => void;
  getActiveFiltersCount: () => number;
}

export const useSearchStore = create<SearchState>()(
  devtools(
    persist(
      (set, get) => ({
        filters: {},
        sortBy: "newest",
        isLoading: false,
        showMobileFilters: false,

        setFilters: (filters) => {
          set({ filters }, false, "setFilters");
        },

        updateFilter: (key, value) => {
          const currentFilters = get().filters;
          const newFilters = { ...currentFilters, [key]: value };
          
          // Reset city when province changes
          if (key === "province") {
            newFilters.city = undefined;
          }
          
          set({ filters: newFilters }, false, "updateFilter");
        },

        clearFilters: () => {
          set({ filters: {} }, false, "clearFilters");
        },

        setSortBy: (sortBy) => {
          set({ sortBy }, false, "setSortBy");
        },

        setIsLoading: (isLoading) => {
          set({ isLoading }, false, "setIsLoading");
        },

        setShowMobileFilters: (showMobileFilters) => {
          set({ showMobileFilters }, false, "setShowMobileFilters");
        },

        toggleAmenity: (amenity) => {
          const currentFilters = get().filters;
          const currentAmenities = currentFilters.amenities || [];
          const newAmenities = currentAmenities.includes(amenity)
            ? currentAmenities.filter(a => a !== amenity)
            : [...currentAmenities, amenity];
          
          set({ 
            filters: { ...currentFilters, amenities: newAmenities }
          }, false, "toggleAmenity");
        },

        toggleRoom: (room) => {
          const currentFilters = get().filters;
          const currentRooms = currentFilters.rooms || [];
          const newRooms = currentRooms.includes(room)
            ? currentRooms.filter(r => r !== room)
            : [...currentRooms, room];
          
          set({ 
            filters: { ...currentFilters, rooms: newRooms }
          }, false, "toggleRoom");
        },

        getActiveFiltersCount: () => {
          const filters = get().filters;
          let count = 0;
          if (filters.type) count++;
          if (filters.province) count++;
          if (filters.city) count++;
          if (filters.minPrice || filters.maxPrice) count++;
          if (filters.minArea || filters.maxArea) count++;
          if (filters.rooms?.length) count++;
          if (filters.amenities?.length) count++;
          if (filters.propertyAge) count++;
          if (filters.transactionType) count++;
          return count;
        },
      }),
      {
        name: 'search-store',
        partialize: (state) => ({ 
          filters: state.filters, 
          sortBy: state.sortBy 
        }),
      }
    )
  )
);