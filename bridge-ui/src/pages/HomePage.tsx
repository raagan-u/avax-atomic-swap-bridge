import React from 'react';
import { motion } from 'framer-motion';
import Swap from '../components/Swap';
// import { PendingOrdersManager } from '../components/PendingOrdersManager';
interface HomePageProps {
  showHero: boolean;
  onOrderCreated: (orderId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ showHero, onOrderCreated }) => {
  return (
    <div className="w-full flex mx-auto items-center px-4 py-8">
      {/* Header */}
      {showHero && (
        <motion.div
          initial={{ opacity: 0, filter: 'blur(16px)', scale: 0.98 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 1.3, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center p-6 mb-8 px-12 h-full flex flex-col items-center justify-center w-1/2"
        >
          <motion.h1
            initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-8xl caveat font-bold text-gray-900 mb-4"
          >
            Move Bitcoin Without Trust.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl px-12 caveat font-medium text-gray-700 mb-2"
          >
            Where Bitcoin moves at Avalanche speed. Swap assets between Bitcoin and any EVM chain securely
          </motion.p>
        </motion.div>
      )}

      {/* Swap Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-8 w-1/2"
      >
        <Swap onOrderCreated={onOrderCreated} />
      </motion.div>

      {/* Pending Orders Manager */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        <PendingOrdersManager />
      </motion.div> */}
    </div>
  );
};

export default HomePage;