import { createSignal, For, onMount, Show } from 'solid-js';
import { createEvent } from '../supabaseClient';

function Tasks() {
  const [tasks, setTasks] = createSignal([]);
  const [loading, setLoading] = createSignal(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const result = await createEvent('get_tasks', {});
      // Assume result is an array of tasks
      setTasks(result.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTask = async (taskId) => {
    setLoading(true);
    try {
      await createEvent('complete_task', { task_id: taskId });
      fetchTasks();
    } catch (error) {
      console.error('Error completing task:', error);
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    fetchTasks();
  });

  return (
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-4 text-purple-600 text-center">المهام</h1>
      <Show when={!loading()} fallback={<p class="text-center">جارٍ التحميل...</p>}>
        <For each={tasks()}>
          {(task) => (
            <div class="bg-white p-4 mb-4 rounded-lg shadow-md">
              <p class="font-semibold">{task.title}</p>
              <p class="text-gray-600">{task.description}</p>
              <button
                class={`mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out cursor-pointer ${task.completed ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handleCompleteTask(task.id)}
                disabled={task.completed || loading()}
              >
                {task.completed ? 'تم الإنجاز' : 'إنجاز المهمة'}
              </button>
            </div>
          )}
        </For>
      </Show>
    </div>
  );
}

export default Tasks;