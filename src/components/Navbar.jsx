import { supabase } from '../supabaseClient';
import { useNavigate, NavLink } from '@solidjs/router';

function Navbar(props) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <nav class="bg-white shadow-md">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <NavLink href="/" class="text-2xl font-bold text-purple-600">
              تطبيق الربح من الإنترنت
            </NavLink>
          </div>
          <div class="flex items-center space-x-4">
            <NavLink href="/daily-bonus" class="text-gray-700 hover:text-purple-600">
              المكافأة اليومية
            </NavLink>
            <NavLink href="/tasks" class="text-gray-700 hover:text-purple-600">
              المهام
            </NavLink>
            <NavLink href="/ads" class="text-gray-700 hover:text-purple-600">
              الإعلانات
            </NavLink>
            <NavLink href="/luck-game" class="text-gray-700 hover:text-purple-600">
              لعبة الحظ
            </NavLink>
            <NavLink href="/withdraw" class="text-gray-700 hover:text-purple-600">
              السحب
            </NavLink>
            <button
              class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out cursor-pointer"
              onClick={handleSignOut}
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;