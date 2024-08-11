package challenge;

import java.util.ArrayList;
import java.util.List;

import challenge.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/message")
public class MessageController {

    @Autowired
    MessageService messageService;

    // get message list (API)
    @GetMapping("/getMessageList")
    List<MessageModel> listMessages() {
        // based on service to do
        return messageService.getMessageList();
    }

    // save message to list (API)
    @PostMapping("/saveMessageList")
    public String getMessageList(@RequestBody List<MessageModel> messageList) {
        // based on service to do
        return messageService.saveMessageList(messageList);
    }

    // Delete some messages from the message list (API)
    @DeleteMapping("/delMessageList")
    public List<MessageModel> delMessageList(@RequestBody List<MessageModel> messageList) {
        // based on service to do
        return messageService.delMessageList(messageList);
    }
    // Junit test
    public void useJUnitPlatform(){
        System.out.println("JUnit Platform");
    }
}
