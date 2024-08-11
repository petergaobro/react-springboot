package challenge.service;

import challenge.MessageModel;

import java.util.List;

/**
 * @author penggao
 * Created on 2024/08/06 13:55
 */
public interface MessageService {

    /**
     * read message list
     * @return initial list
     */
    List<MessageModel> getMessageList();

    /**
     * save message list
     * @return latest list after creation
     */
    String saveMessageList(List<MessageModel> messageList);

    /**
     * Delete some messages from the message list
     * @return latest after deletion
     */
    List<MessageModel> delMessageList(List<MessageModel> messageList);

}
