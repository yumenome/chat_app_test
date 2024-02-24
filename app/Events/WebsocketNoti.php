<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class WebsocketNoti implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    public $message;
    public $roomId;

    public function __construct($message, $roomId, $user)
    {
        $this->user = $user;
        $this->message = $message;
        $this->roomId = $roomId;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            // new Channel('public.playground.' . $this->roomId),
            new PrivateChannel('private.group.' . $this->roomId),
            new PresenceChannel('presence.playground.' . $this->roomId),
        ];
    }

    public function broadcastAs(){
        return 'chat_message';
    }

    public function broadcastWith(){
        return [ 'message' => $this->message,
                 'roomId' => $this->roomId,
                 'user' => $this->user->only('id', 'name')];
    }
}
