import React from 'react';
import { useStore } from '../store/store';
import { ShoppingItem } from '../types/types';
import { Trash2 } from 'lucide-react';
import { motion, Transition } from 'framer-motion';

interface ShoppingListItemProps {
    item: ShoppingItem;
}

const ShoppingListItem: React.FC<ShoppingListItemProps> = ({ item }) => {
    const deleteItem = useStore((state) => state.deleteItem);
    const toggleComplete = useStore((state) => state.toggleComplete);

    return (
        <div className="flex items-center justify-between p-6 border-b">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 } as Transition}
            >
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleComplete(item.id)}
                        className="mr-2"
                    />
                    <span className={item.completed ? 'line-through text-slate-400' : ''}>{item.name}</span>
                    <span className={item.completed ? 'line-through text-slate-400 ml-0.5' : 'ml-0.5'}>({item.quantity})</span>
                    <span className='ml-5 text-slate-500 text-sm'>{item.category}</span>
                    <span className='text-red-600 ml-2.5'>- {item.price} $
                    </span>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 } as Transition}
            >
                <button id='deleteButton' onClick={() => deleteItem(item.id)} className="flex mr-1.5 md:mr-0 gap-1.5 cursor-pointer bg-red-500 text-slate-800 p-2 hover:bg-red-800 hover:text-slate-100">
                    <Trash2 className='w-4 h-6' />
                    Delete
                </button>
            </motion.div>
        </div>
    );
};

export default ShoppingListItem;