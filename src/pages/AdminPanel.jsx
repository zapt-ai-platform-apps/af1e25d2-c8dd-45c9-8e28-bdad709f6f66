import { createSignal, onMount, Show } from 'solid-js';
import { supabase } from '../supabaseClient';
import { useNavigate } from '@solidjs/router';

function AdminPanel() {
  const [isAdmin, setIsAdmin] = createSignal(false);
  const [loading, setLoading] = createSignal(true);
  const navigate = useNavigate();

  onMount(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user && user.email === 'daoudi.abdennour@gmail.com') {
      setIsAdmin(true);
    } else {
      navigate('/');
    }
    setLoading(false);
  });

  return (
    <Show when={!loading()}>
      <Show when={isAdmin()} fallback={<p>غير مصرح لك بالدخول</p>}>
        <div class="container mx-auto px-4 py-8">
          <h1 class="text-2xl font-bold mb-4 text-purple-600 text-center">لوحة تحكم المدير</h1>
          {/* Implement admin functionalities here */}
        </div>
      </Show>
    </Show>
  );
}

export default AdminPanel;