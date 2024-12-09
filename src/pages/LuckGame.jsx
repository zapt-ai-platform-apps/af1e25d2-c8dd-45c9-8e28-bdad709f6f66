import { createSignal, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';

function LuckGame() {
  const [result, setResult] = createSignal(null);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal(null);

  const handlePlayGame = async () => {
    if (loading()) return;
    setLoading(true);
    setError(null);
    try {
      const gameResult = await createEvent('play_luck_game', {});
      setResult(gameResult);
      alert(`تهانينا! ربحت ${gameResult.points} نقطة!`);
    } catch (error) {
      console.error('Error in luck game:', error);
      setError('حدث خطأ أثناء لعبة الحظ. الرجاء المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="container mx-auto px-4 py-8 h-full">
      <h1 class="text-2xl font-bold mb-4 text-purple-600 text-center">لعبة الحظ</h1>
      <Show when={!error()} fallback={<p class="text-center text-red-500">{error()}</p>}>
        <div class="flex flex-col items-center">
          <button
            class={`bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out cursor-pointer ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handlePlayGame}
            disabled={loading()}
          >
            {loading() ? 'جارٍ اللعب...' : 'جرب حظك!'}
          </button>
          <Show when={result()}>
            <p class="mt-4 text-xl font-semibold text-purple-600">
              {'تهانينا! ربحت ' + result().points + ' نقطة!'}
            </p>
          </Show>
        </div>
      </Show>
    </div>
  );
}

export default LuckGame;