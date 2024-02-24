<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    public function setting(){
        return $this->belongsTo(QuestionSetting::class, 'question_setting_id');
    }
}
