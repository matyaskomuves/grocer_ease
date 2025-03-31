import React, { useState } from 'react';
import { useStore } from '../store/store';
import { Plus } from 'lucide-react';

const AddItemForm: React.FC = () => {
    const addItem = useStore((state) => state.addItem);
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addItem({ name, quantity: parseInt(quantity), category, completed: false });
        setName('');
        setQuantity('1');
        setCategory('');
    };
    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full bg-slate-300 px-4 py-2.5 shadow-md rounded-xl mb-5 gap-2.5">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Item Name" required className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input type="number" value={quantity} onChange={(e) => setQuantity((e.target.value))} placeholder="Quantity" required min={1} max={99} className='w-1/3 md:w-1/6' />
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button type="submit" className="cursor-pointer w-1/2 md:w-1/4 lg:w-1/8 bg-blue-400 text-slate-800 hover:bg-blue-800 hover:text-slate-200 rounded-2xl uppercase mb-3 mt-3 flex">
                <Plus className='h-6 w-5 mr-0.5' />
                Add Item
            </button>
        </form>
    );
};

export default AddItemForm;