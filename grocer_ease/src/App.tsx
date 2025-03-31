import { useEffect } from 'react';
import { useStore } from './store/store';
import ShoppingList from './components/ShoppingList';
import AddItemForm from './components/AddItemForm';
import { Toaster } from 'react-hot-toast';
import './index.css';
import { ShoppingBasket, Car, Store } from 'lucide-react';
import { motion, Transition } from 'framer-motion';

function App() {
  const fetchItems = useStore((state) => state.fetchItems);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div className="p-4 w-full mx-auto">
      <div className='flex flex-row justify-center gap-1.5'>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 } as Transition}>
          <Car className='w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20' />
        </motion.div>

        <Store className='w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 text-slate-700' />

        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 1, delay: 0.5 } as Transition}>
          <ShoppingBasket className='w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 text-slate-400' />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 1.5 } as Transition}>
        <h1 className="text-3xl md:text-5xl lg:text-7xl text-center font-light tracking-tighter mb-2.5">
          Grocer_<span className='text-slate-400'>EASE</span></h1>

      </motion.div>

      <AddItemForm />
      <ShoppingList />
      <Toaster />
    </div>
  );
}

export default App;