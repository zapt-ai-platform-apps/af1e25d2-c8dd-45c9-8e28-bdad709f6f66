import { createSignal, onMount, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';

function DailyBonus() {
  const [bonusClaimed, setBonusClaimed] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal(null);

  const checkBonusStatus = async () => {
    setLoading(true);
    try {
      const result = await createEvent('check_daily_bonus', {});
      setBonusClaimed(result.bonusClaimed);
    } catch (error) {
      console.error('Error checking bonus status:', error);
      setError('حدث خطأ أثناء التحقق من حالة المكافأة.');
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    checkBonusStatus();
  });

  const handleClaimBonus = async () => {
    if (loading() || bonusClaimed()) return;
    setLoading(true);
    try {
      await createEvent('claim_daily_bonus', {});
      setBonusClaimed(true);
      alert('تم استلام المكافأة اليومية! تم إضافة النقاط إلى رصيدك.');
    } catch (error) {
      console.error('Error claiming bonus:', error);
      alert('حدث خطأ أثناء استلام المكافأة. الرجاء المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="container mx-auto px-4 py-8 h-full">
      <h1 class="text-2xl font-bold mb-4 text-purple-600 text-center">المكافأة اليومية</h1>
      <Show when={!error()} fallback={<p class="text-center text-red-500">{error()}</p>}>
        <div class="flex justify-center">
          <button
            class={`bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out cursor-pointer ${bonusClaimed() ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleClaimBonus}
            disabled={bonusClaimed() || loading()}
          >
            {bonusClaimed() ? 'تم استلام المكافأة' : 'استلم المكافأة اليومية'}
          </button>
        </div>
      </Show>
    </div>
  );
}

export default DailyBonus;