import { MessageCircle, Phone } from 'lucide-react';
import PaymentMethodCard from './PaymentMethodCard';
import { paymentMethods } from '../data/paymentMethods';

export default function PaymentPage() {
  const handleContactSupport = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Payment Methods
          </h1>
          <p className="text-xl text-slate-600">
            Click on a payment method to view payment details
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {paymentMethods.map((method) => (
            <PaymentMethodCard key={method.id} method={method} />
          ))}
        </div>

        <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-lg">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Next Steps
              </h2>
              <p className="text-slate-700 text-lg leading-relaxed">
                After payment, please contact support for confirmation.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleContactSupport}
              className="flex-1 py-4 px-8 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl font-bold text-lg hover:from-slate-900 hover:to-black hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            >
              <Phone className="w-6 h-6" />
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
