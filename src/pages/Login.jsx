import { onMount } from 'solid-js';
import { createSignal } from 'solid-js';
import { supabase } from '../supabaseClient';
import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from '@solidjs/router';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = createSignal(null);

  onMount(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setUser(user)
      navigate('/');
    }
  });

  return (
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 class="text-3xl font-bold mb-6 text-center text-purple-600">تسجيل الدخول عبر ZAPT</h2>
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 hover:underline mb-6 block text-center"
        >
          لمزيد من المعلومات عن ZAPT
        </a>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'facebook', 'apple']}
          magicLink={true}
          view="magic_link"
          showLinks={false}
          authView="magic_link"
        />
        <div class="mt-4 text-center">
          <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" class="text-sm text-gray-500 hover:underline">
            صنع باستخدام ZAPT
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;