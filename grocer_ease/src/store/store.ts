import { create } from 'zustand';
import { ShoppingItem, ShoppingListState, ShoppingItemSchema, FilterOption, SortOption } from '../types/types';
import toast from 'react-hot-toast';

const STORAGE_KEY = 'shopping-list';

const loadFromStorage = (): ShoppingItem[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

const saveToStorage = (items: ShoppingItem[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const useStore = create<ShoppingListState>((set, get) => ({
    items: loadFromStorage(),
    filter: 'all',
    sort: 'date',
    searchQuery: '',
    history: [loadFromStorage()],
    currentIndex: 0,
    isLoading: false,
    error: null,

    fetchItems: async () => {
        set({ isLoading: true, error: null });
        try {
            const items = loadFromStorage();
            set({ items, isLoading: false });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to fetch items';
            set({ error: message, isLoading: false });
            toast.error(message);
        }
    },

    addItem: async (item: Omit<ShoppingItem, 'id' | 'createdAt'>) => {
        try {
            ShoppingItemSchema.parse(item);

            set((state: ShoppingListState) => {
                const newItem = {
                    ...item,
                    id: crypto.randomUUID(),
                    createdAt: new Date().toISOString(),
                };
                const newItems = [...state.items, newItem];
                saveToStorage(newItems);
                return {
                    items: newItems,
                    history: [...state.history.slice(0, state.currentIndex + 1), newItems],
                    currentIndex: state.currentIndex + 1,
                    isLoading: false,
                };
            });

            toast.success('Item added successfully');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to add item';
            set({ error: message, isLoading: false });
            toast.error(message);
            throw error;
        }
    },

    updateItem: async (id: string, updates: Partial<ShoppingItem>) => {
        set((state: ShoppingListState) => {
            try {
                const newItems = state.items.map((item) =>
                    item.id === id ? { ...item, ...updates } : item
                );
                saveToStorage(newItems);
                return {
                    items: newItems,
                    history: [...state.history.slice(0, state.currentIndex + 1), newItems],
                    currentIndex: state.currentIndex + 1,
                    isLoading: false,
                };
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to update item';
                set({ error: message, isLoading: false });
                toast.error(message);
                throw error;
            }
        });
    },

    deleteItem: async (id) => {
        set((state: ShoppingListState) => {
            try {
                const newItems = state.items.filter((item) => item.id !== id);
                saveToStorage(newItems);
                return {
                    items: newItems,
                    history: [...state.history.slice(0, state.currentIndex + 1), newItems],
                    currentIndex: state.currentIndex + 1,
                    isLoading: false,
                };
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to delete item';
                set({ error: message, isLoading: false });
                toast.error(message);
                throw error;
            }
        });
    },

    toggleComplete: async (id) => {
        set((state: ShoppingListState) => {
            try {
                const item = get().items.find((item) => item.id === id);
                if (!item) throw new Error('Item not found');

                const newItems = state.items.map((item) =>
                    item.id === id ? { ...item, completed: !item.completed } : item
                );
                saveToStorage(newItems);
                return {
                    items: newItems,
                    history: [...state.history.slice(0, state.currentIndex + 1), newItems],
                    currentIndex: state.currentIndex + 1,
                    isLoading: false,
                };
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to toggle item status';
                set({ error: message, isLoading: false });
                toast.error(message);
                throw error;
            }
        });
    },

    setFilter: (filter: FilterOption) => set({ filter }),
    setSort: (sort: SortOption) => set({ sort }),
    setSearchQuery: (searchQuery: string) => set({ searchQuery }),

    reorderItems: async (items: ShoppingItem[]) => {
        set((state: ShoppingListState) => {
            try {
                saveToStorage(items);
                return {
                    items,
                    history: [...state.history.slice(0, state.currentIndex + 1), items],
                    currentIndex: state.currentIndex + 1,
                    isLoading: false,
                };
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to reorder items';
                set({ error: message, isLoading: false });
                toast.error(message);
                throw error;
            }
        });
    },

    undo: () => {
        set((state: ShoppingListState) => {
            if (state.currentIndex <= 0) return state;
            const newIndex = state.currentIndex - 1;
            const newItems = state.history[newIndex];
            saveToStorage(newItems);
            return {
                items: newItems,
                currentIndex: newIndex,
            };
        });
    },

    redo: () => {
        set((state: ShoppingListState) => {
            if (state.currentIndex >= state.history.length - 1) return state;
            const newIndex = state.currentIndex + 1;
            const newItems = state.history[newIndex];
            saveToStorage(newItems);
            return {
                items: newItems,
                currentIndex: newIndex,
            };
        });
    },
}));