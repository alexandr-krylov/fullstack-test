<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::where('user_id', Auth::id())->get();
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|min:5|max:120',
            'description' => 'nullable|string',
            'status' => 'required|string|in:new,in_progress,done,archived',
            'priority' => 'required|integer|min:1|max:5',
            'due_date' => 'nullable|date',
            'karada_project' => 'required|string|in:karada_u,prohuntr,other',
        ]);
// dd(Auth::id());
        $task = Task::create(array_merge($validated, [
            'user_id' => Auth::id(),
        ]));

        return response()->json($task, 201);
    }

    public function show(Task $task)
    {
        $this->authorizeTask($task);
        return response()->json($task);
    }

    public function update(Request $request, Task $task)
    {
        $this->authorizeTask($task);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|min:5|max:120',
            'description' => 'nullable|string',
            'status' => 'sometimes|required|string|in:new,in_progress,done,archived',
            'priority' => 'sometimes|required|integer|min:1|max:5',
            'due_date' => 'nullable|date',
            'karada_project' => 'sometimes|required|string|in:karada_u,prohuntr,other',
        ]);

        $task->update($validated);

        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $this->authorizeTask($task);
        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }

    private function authorizeTask(Task $task)
    {
        if ($task->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }
    }
}
