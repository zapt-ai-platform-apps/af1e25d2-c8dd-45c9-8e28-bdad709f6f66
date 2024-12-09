import { createSignal } from 'solid-js';
import { createEvent } from '../supabaseClient';

function Withdraw() {
  const [amount, setAmount] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [message, setMessage] = createSignal('');

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const result = await createEvent('withdraw', { amount: parseFloat(amount()) });
      setMessage('تم تقديم طلب السحب بنجاح.');
      setAmount('');
    } catch (error) {
      console.error('خطأ في عملية السحب:', error);
      setMessage('حدث خطأ أثناء عملية السحب.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-4 text-purple-600 text-center">السحب عبر PayPal</h1>
      <form onSubmit={handleWithdraw} class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">المبلغ المطلوب سحبه (بالدولار):</label>
          <input
            type="number"
            min="1"
            step="0.01"
            value={amount()}
            onInput={(e) => setAmount(e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            required
          />
        </div>
        <button
          type="submit"
          class={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out cursor-pointer ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading()}
        >
          {loading() ? 'جارٍ المعالجة...' : 'طلب السحب'}
        </button>
        {message() && <p class="mt-4 text-center text-green-600">{message()}</p>}
      </form>
    </div>
  );
}

export default Withdraw;