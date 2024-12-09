import { createSignal } from 'solid-js';
import { createEvent } from '../supabaseClient';

function LuckGame() {
  const [result, setResult] = createSignal(null);
  const [loading, setLoading] = createSignal(false);

  const handlePlayGame = async () => {
    setLoading(true);
    try {
      const gameResult = await createEvent('play_luck_game', {});
      setResult(gameResult);
    } catch (error) {
      console.error('خطأ في لعبة الحظ:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-4 text-purple-600 text-center">لعبة الحظ</h1>
      <div class="flex flex-col items-center">
        <button
          class={`bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out cursor-pointer ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePlayGame}
          disabled={loading()}
        >
          جرب حظك!
        </button>
        <Show when={result()}>
          <p class="mt-4 text-xl font-semibold text-purple-600">
            {'تهانينا! ربحت ' + result().points + ' نقطة!'}
          </p>
        </Show>
      </div>
    </div>
  );
}

export default LuckGame;