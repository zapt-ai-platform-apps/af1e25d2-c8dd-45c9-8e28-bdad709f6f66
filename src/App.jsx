import { createSignal, createEffect, onMount, Show } from 'solid-js';
import { Routes, Route, useNavigate } from '@solidjs/router';
import Home from './pages/Home';
import DailyBonus from './pages/DailyBonus';
import Tasks from './pages/Tasks';
import Ads from './pages/Ads';
import LuckGame from './pages/LuckGame';
import Withdraw from './pages/Withdraw';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { supabase } from './supabaseClient';

function App() {
  const [user, setUser] = createSignal(null);
  const navigate = useNavigate();

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      setUser(user)
    } else {
      navigate('/login');
    }
  }

  onMount(checkUserSignedIn)

  createEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user)
      } else {
        setUser(null)
        navigate('/login');
      }
    })

    return () => {
      authListener.unsubscribe()
    }
  })

  return (
    <div class="min-h-screen bg-gray-100">
      <Show when={user()}>
        <Navbar user={user()} />
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/daily-bonus" component={DailyBonus} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/ads" component={Ads} />
          <Route path="/luck-game" component={LuckGame} />
          <Route path="/withdraw" component={Withdraw} />
          <Route path="/admin" component={AdminPanel} />
        </Routes>
      </Show>
      <Show when={!user()}>
        <Routes>
          <Route path="/login" component={Login} />
        </Routes>
      </Show>
    </div>
  );
}

export default App;