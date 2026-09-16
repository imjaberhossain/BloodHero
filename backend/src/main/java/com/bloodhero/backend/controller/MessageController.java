package com.bloodhero.backend.controller;

import com.bloodhero.backend.model.Message;
import com.bloodhero.backend.repository.MessageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class MessageController {

    private final MessageRepository messageRepository;

    public MessageController(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    // ১. ব্রাউজারে /api/messages টেস্ট করার জন্য (সব মেসেজের তালিকা দেখাবে)
    @GetMapping
    public ResponseEntity<List<Message>> getAllMessages() {
        List<Message> messages = messageRepository.findAll();
        return ResponseEntity.ok(messages);
    }

    // ২. নতুন মেসেজ সেভ করার জন্য (POST Request)
    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody Message message) {
        Message saved = messageRepository.save(message);
        return ResponseEntity.ok(saved);
    }

    // ৩. নির্দিষ্ট দুজন ইউজারের চ্যাট দেখার জন্য (GET with Params)
    @GetMapping("/conversation")
    public ResponseEntity<List<Message>> getConversation(
            @RequestParam Long user1,
            @RequestParam Long user2) {
        List<Message> conversation = messageRepository.findConversation(user1, user2);
        return ResponseEntity.ok(conversation);
    }
}