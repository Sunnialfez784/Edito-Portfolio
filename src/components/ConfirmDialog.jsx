import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiAlertTriangle } from 'react-icons/fi'

export default function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[96] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-sm card p-7 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-4">
              <FiAlertTriangle size={22} />
            </div>
            <h3 className="font-display text-lg mb-2">{title}</h3>
            <p className="text-sm text-mist-500 mb-6">{message}</p>
            <div className="flex gap-3">
              <button onClick={onCancel} className="btn-ghost flex-1 !py-2.5">
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
