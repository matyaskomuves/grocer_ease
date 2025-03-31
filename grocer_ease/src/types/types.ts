import { z } from 'zod';

export interface ShoppingItem {
    id: string;
    name: string;
    quantity: number;
    category: string;
    completed: boolean;
    createdAt: string;
}

export type SortOption = 'name' | 'date' | 'category';
export type FilterOption = 'all' | 'active' | 'completed';

export interface ShoppingListState {
    items: ShoppingItem[];
    filter: FilterOption;
    sort: SortOption;
    searchQuery: string;
    history: ShoppingItem[][];
    currentIndex: number;
    isLoading: boolean;
    error: string | null;
    addItem: (item: Omit<ShoppingItem, 'id' | 'createdAt'>) => Promise<void>;
    updateItem: (id: string, updates: Partial<ShoppingItem>) => Promise<void>;
    deleteItem: (id: string) => Promise<void>;
    toggleComplete: (id: string) => Promise<void>;
    setFilter: (filter: FilterOption) => void;
    setSort: (sort: SortOption) => void;
    setSearchQuery: (query: string) => void;
    reorderItems: (items: ShoppingItem[]) => Promise<void>;
    fetchItems: () => Promise<void>;
    undo: () => void;
    redo: () => void;
}

export const ShoppingItemSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100),
    quantity: z.number().int().positive(),
    category: z.string().min(1, 'Category is required'),
    completed: z.boolean(),
});