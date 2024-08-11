package challenge;

// Note: This is just a bare bones model, you are welcome to change it if required for your implementation.
public class MessageModel {
    private final long id;
    private final String message;
    private final String messageTimestamp;

    public MessageModel(long id, String message, String messageTimestamp) {
        this.id = id;
        this.message = message;
        this.messageTimestamp = messageTimestamp;
    }

    public long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public String getMessageTimestamp() {
        return messageTimestamp;
    }
}
