import { createSignal, For, onMount, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';

function Ads() {
  const [ads, setAds] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(null);

  const fetchAds = async () => {
    try {
      const result = await createEvent('get_ads', {});
      setAds(result.ads);
    } catch (error) {
      console.error('Error fetching ads:', error);
      setError('حدث خطأ أثناء جلب الإعلانات. الرجاء المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleWatchAd = async (adId) => {
    if (loading()) return;
    setLoading(true);
    try {
      await createEvent('watch_ad', { ad_id: adId });
      alert('شكراً لمشاهدتك الإعلان! تم إضافة النقاط إلى رصيدك.');
      // Optionally, update user balance or refresh ads
    } catch (error) {
      console.error('Error watching ad:', error);
      alert('حدث خطأ أثناء مشاهدة الإعلان. الرجاء المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    fetchAds();
  });

  return (
    <div class="container mx-auto px-4 py-8 h-full">
      <h1 class="text-2xl font-bold mb-4 text-purple-600 text-center">مشاهدة الإعلانات</h1>
      <Show when={!loading()} fallback={<p class="text-center">جارٍ التحميل...</p>}>
        <Show when={!error()} fallback={<p class="text-center text-red-500">{error()}</p>}>
          <For each={ads()}>
            {(ad) => (
              <div class="bg-white p-4 mb-4 rounded-lg shadow-md">
                <p class="font-semibold text-gray-800">{ad.title}</p>
                <p class="text-gray-600">{ad.description}</p>
                <button
                  class="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out cursor-pointer"
                  onClick={() => handleWatchAd(ad.id)}
                  disabled={loading()}
                >
                  مشاهدة الإعلان
                </button>
              </div>
            )}
          </For>
        </Show>
      </Show>
    </div>
  );
}

export default Ads;