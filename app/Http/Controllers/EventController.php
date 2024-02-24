<?php

namespace App\Http\Controllers;

use App\Events\WebsocketNoti;
use App\Models\Notification;
use App\Models\Question;
use App\Models\QuestionSetting;
use App\Models\Room;
use App\Models\Talk;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use PHPUnit\Framework\MockObject\Stub\ReturnStub;
use Symfony\Component\Mailer\Transport\AbstractTransportFactory;

class EventController extends Controller
{

    public function createRoom($creater_id,$room_name){
        $room = new Room;
        $room->creater_id = $creater_id;
        $room->name = $room_name;
        $room->save();
        $room->users()->attach($creater_id);
        return $room;
    }

    public function searchRoom(Request $request)
    {
        $validator = validator($request->all(),[
            'creater_id' =>  'required',
            'joined_id' => 'required',
        ]);

        if($validator->fails()) {
            return $validator->errors();
        }

        $created_rooms = DB::table('room_user')->where('user_id', $request->creater_id)->get();
        $joined_rooms = DB::table('room_user')->where('user_id', $request->joined_id) ->get();

        $created_array= [];
        if($created_rooms){
            foreach($created_rooms as $room){
                array_push($created_array, $room->room_id);
            }
        }

        $joined_array= [];
        if($joined_rooms){
            foreach($joined_rooms as $room){

                array_push($joined_array, $room->room_id);
            }
        }

        $collection1 = new Collection($created_array);
        $collection2 = new Collection($joined_array);

        $room_ids = $collection1->intersect($collection2);

        if(count($room_ids) > 0){
            foreach($room_ids as $id){
                $rooms = DB::table('room_user')->where('room_id',$id)->get();
                if(count($rooms) === 2){
                    foreach($rooms as $room){
                        $room_id = $room->room_id;
                        return $room_id;
                    }
                }
            }
        }
        $room = $this->createRoom($request->creater_id,null);
        $room->users()->attach($request->joined_id);
        return $room->id;

    }

    public function RoomMessages(Request $request) {

        $talks = Talk::where('room_id', $request->room_id)->get();
        return $talks;
    }

    public function groupRooms($id){

        $final_rooms = [];
        $rooms = DB::table('room_user')->where('user_id', $id)->get(); // user's rooms
        if($rooms){
            foreach($rooms as $room){
                        $total_rooms = Room::find($room->room_id);
                        if(!empty($total_rooms->name)){
                            $total_rooms->users;
                            array_push($final_rooms, $total_rooms);
                        }
                    }
                }
                $arr = array_values($final_rooms);
        return  $arr;
    }

    public function sendMessage(Request $request){
        $validator = validator($request->all(),[

            'sender_id' => 'required',
            'room_id' => 'required',
            'message' => 'required',
        ]);

        if($validator->fails()) {
            return $validator->errors();
        }

        event(new WebsocketNoti($request->message, $request->room_id, auth()->user()));

        $talk = new Talk;
        $talk->room_id = $request->room_id;
        $talk->sender_id = auth()->user()->id;
        $talk->message = $request->message;
        $talk->save();

        return $talk;
    }

    public function createGroupRoom(Request $request){
        $room = $this->createRoom($request->creater_id,$request->name);
        foreach($request->members as $member){
            $room->users()->attach($member['id']);
        }
        return $room->id;
    }

    public function SendNoti(Request $request){

        $noti = new Notification;
        $noti->sender_id = $request->sender_id;
        $noti->receiver_id = $request->receiver_id;
        $noti->title = $request->title;
        $noti->description = $request->title;
        $noti->read = $request->read;
        $noti->save();

        $noti->sender;
        $noti->receiver;
        return $noti;
    }


    public function SetQuestionSetting(Request $request){

        $setting = new QuestionSetting;
        $setting->user_id = $request->user_id;
        $setting->row = $request->row;
        $setting->digit = $request->digit;
        $setting->speed = $request->speed;
        $setting->round = $request->round;
        $setting->completed = $request->completed;
        $setting->exam = $request->exam;
        $setting->exam_time = $request->exam_time;
        $setting->exam_name = $request->exam_name;
        $setting->save();

        return $setting;

    }

    public function setting($id){
        $setting = QuestionSetting::find($id);
        $setting->questions;
        return $setting;
    }

    public function SetQuestion(Request $request){
        $question = new Question;
        $question->question_setting_id = $request->question_setting_id;
        $question->question = $request->question;
        $question->answer = $request->answer;
        $question->user_answer = $request->user_answer;
        $question->round_no = $request->round_no;
        $question->start_time = Carbon::now()->format('H:i');
        $question->end_time = $request->end_time;
        $question->is_correct = $request->is_correct;
        $question->save();

        $question->setting;
        return $question;

    }

}



