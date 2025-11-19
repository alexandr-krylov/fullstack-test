<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'status',
        'priority',
        'due_date',
        'karada_project',
    ];

    protected $casts = [
        'due_date' => 'date',
    ];

    protected static function booted()
    {
        static::creating(function ($task) {
            $task->karada_test_label = 'KARADA_FULLSTACK_TEST';
            $task->importance_score = $task->priority * 20;
        });

        static::updating(function ($task) {
            if ($task->isDirty('priority')) {
                $task->importance_score = $task->priority * 20;
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
