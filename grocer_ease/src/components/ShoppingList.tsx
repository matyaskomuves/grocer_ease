import React from 'react';
import { useStore } from '../store/store';
import ShoppingListItem from './ShoppingListItem';
import { ShoppingItem, FilterOption, SortOption } from '../types/types';
import { Search, Undo2, Redo2 } from 'lucide-react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';



const ShoppingList: React.FC = () => {
    const items = useStore((state) => state.items);
    const filter = useStore((state) => state.filter);
    const sort = useStore((state) => state.sort);
    const searchQuery = useStore((state) => state.searchQuery);
    const setFilter = useStore((state) => state.setFilter);
    const setSort = useStore((state) => state.setSort);
    const setSearchQuery = useStore((state) => state.setSearchQuery);
    const undo = useStore((state) => state.undo);
    const redo = useStore((state) => state.redo);

    const filteredItems = items.filter((item) => {
        if (filter === 'active') return !item.completed;
        if (filter === 'completed') return item.completed;
        return true;
    }).filter((item) => {
        return item.name.toLowerCase().includes(searchQuery.toLocaleLowerCase());
    }).sort((a, b) => {
        if (sort === 'name') return a.name.localeCompare(b.name);
        if (sort === 'category') return a.category.localeCompare(b.category);
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

    return (
        <div>
            <div className='flex flex-col md:flex-row justify-left items-center mb-5 gap-2.5 md:gap-0.5'>
                <Listbox<FilterOption> as="div" value={filter} onChange={setFilter} className="px-4 py-2 rounded-md">
                    <ListboxButton className="px-4 py-2 bg-slate-100 border rounded-md shadow-sm w-30 cursor-pointer">
                        {filter}
                    </ListboxButton>
                    <ListboxOptions className="absolute w-1/3 bg-white border rounded-md shadow-lg z-10">
                        <ListboxOption value="all" className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                            All Items
                        </ListboxOption>
                        <ListboxOption value="completed" className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                            Completed Items
                        </ListboxOption>
                        <ListboxOption value="active" className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                            Active Items
                        </ListboxOption>
                    </ListboxOptions>
                </Listbox>

                <Listbox<SortOption> as="div" value={sort} onChange={setSort} className="px-4 py-2 rounded-md">
                    <ListboxButton className="px-4 py-2 bg-slate-100 border rounded-md shadow-sm w-30 cursor-pointer">
                        {sort}
                    </ListboxButton>
                    <ListboxOptions className="absolute w-1/3 bg-white border rounded-md shadow-lg z-10">
                        <ListboxOption value="date" className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                            Date
                        </ListboxOption>
                        <ListboxOption value="name" className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                            Name
                        </ListboxOption>
                        <ListboxOption value="category" className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                            Category
                        </ListboxOption>
                        <ListboxOption value="price" className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                            Price
                        </ListboxOption>
                    </ListboxOptions>
                </Listbox>


                <div className='relative flex-1'>
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input id='searchInput' type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder=' Search...' className='w-full pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500' />
                </div>
            </div>
            {filteredItems.map(item => (
                <ShoppingListItem key={item.id} item={item} />
            ))}
            <div className='flex flex-col mt-5 items-center'>
                <button onClick={undo} className='flex gap-2.5 cursor-pointer bg-sky-400 hover:bg-sky-700 mb-2 hover:text-slate-200'>
                    <Undo2 className='w-4 h-6' />
                    Undo
                </button>
                <button onClick={redo} className='flex gap-2.5 cursor-pointer bg-sky-400 hover:bg-sky-700 hover:text-slate-200'>
                    <Redo2 className='w-4 h-6' />
                    Redo
                </button>
            </div>
        </div>
    )
};

export default ShoppingList;
