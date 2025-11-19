<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title', 120);
            $table->text('description')->nullable();
            $table->string('status')->default('new'); // new, in_progress, done, archived
            $table->tinyInteger('priority'); // 1-5
            $table->date('due_date')->nullable();
            $table->string('karada_project');   // karada_u, prohuntr, other
            $table->string('karada_test_label')->default('KARADA_FULLSTACK_TEST');
            $table->integer('importance_score')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
