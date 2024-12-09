import { createSignal, onMount } from 'solid-js';
import { createEvent } from '../supabaseClient';

function DailyBonus() {
  const [bonusClaimed, setBonusClaimed] = createSignal(false);
  const [loading, setLoading] = createSignal(false);

  const checkBonusStatus = async () => {
    // Check if the user has already claimed the daily bonus
    // Implement your logic here
  };

  onMount(() => {
    checkBonusStatus();
  });

  const handleClaimBonus = async () => {
    setLoading(true);
    try {
      const result = await createEvent('claim_daily_bonus', {});
      // Handle the result, update user balance
      setBonusClaimed(true);
    } catch (error) {
      console.error('Error claiming bonus:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-4 text-purple-600 text-center">المكافأة اليومية</h1>
      <div class="flex justify-center">
        <button
          class={`bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out cursor-pointer ${bonusClaimed() ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleClaimBonus}
          disabled={bonusClaimed() || loading()}
        >
          {bonusClaimed() ? 'تم استلام المكافأة' : 'استلم المكافأة اليومية'}
        </button>
      </div>
    </div>
  );
}

export default DailyBonus;