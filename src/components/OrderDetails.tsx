'use client';

import { X, ShoppingBag, Clock } from 'lucide-react';
import { useEffect } from 'react';

interface CartItem {
  productId: string;
  productName: string;
  weight: string;
  price: number;
  originalPrice: number;
  discount: number;
  quantity: number;
  image: string;
}

interface OrderDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalPrice: number;
  orderLink: string;
  onConfirmOrder: () => void;
}

export default function OrderDetails({ 
  isOpen, 
  onClose, 
  items, 
  totalPrice, 
  orderLink, 
  onConfirmOrder 
}: OrderDetailsProps) {
  
  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="fixed inset-0 z-[10000] overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="absolute inset-4 md:inset-8 lg:inset-16 bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-500/20 p-2">
                <ShoppingBag className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Détails de votre commande</h2>
                <p className="text-sm text-gray-400">Vérifiez avant de confirmer</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Résumé */}
            <div className="mb-6 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-full bg-green-500 p-1">
                  <ShoppingBag className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Résumé de commande</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Articles:</span>
                  <span className="ml-2 font-medium text-white">{totalItems} article{totalItems > 1 ? 's' : ''}</span>
                </div>
                <div>
                  <span className="text-gray-400">Total:</span>
                  <span className="ml-2 text-xl font-bold text-green-400">{totalPrice.toFixed(2)}€</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{currentDate}</span>
              </div>
            </div>

            {/* Liste des articles */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Articles commandés</h3>
              
              {items.map((item, index) => (
                <div key={`${item.productId}-${item.weight}`} 
                     className="rounded-xl bg-gray-800/50 border border-gray-700/50 p-4 hover:bg-gray-800/70 transition-colors">
                  <div className="flex gap-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-white">{item.productName}</h4>
                          <p className="text-sm text-gray-400">
                            {item.weight}
                            {item.discount > 0 && (
                              <span className="ml-2 rounded bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
                                -{item.discount}%
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">
                            {item.quantity}x {item.originalPrice}€
                          </p>
                          <p className="text-lg font-bold text-green-400">
                            {(item.price * item.quantity).toFixed(2)}€
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total final */}
            <div className="mt-6 rounded-xl bg-gradient-to-r from-green-600/20 to-green-500/20 border-2 border-green-500/30 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300">Total à payer</p>
                  <p className="text-sm text-gray-400">Livraison à convenir</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-400">{totalPrice.toFixed(2)}€</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Actions */}
          <div className="border-t border-gray-800 p-6 bg-gray-800/50">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl bg-gray-700 py-3 px-4 font-medium text-white hover:bg-gray-600 transition-colors"
              >
                ✏️ Modifier ma commande
              </button>
              <button
                onClick={() => {
                  onConfirmOrder();
                  onClose();
                }}
                className="flex-1 rounded-xl bg-gradient-to-r from-green-500 to-green-600 py-3 px-4 font-medium text-white hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/25"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                ✅ Confirmer et Commander
              </button>
            </div>
            
            <p className="text-xs text-gray-400 text-center mt-3">
              En confirmant, vous serez redirigé vers WhatsApp pour finaliser votre commande
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}