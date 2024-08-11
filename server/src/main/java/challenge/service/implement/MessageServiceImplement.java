package challenge.service.implement;

import challenge.MessageModel;
import challenge.service.MessageService;
// import google Gson library
import com.google.gson.*;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.io.*;
import java.lang.reflect.Type;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;


@Service("MessageService")
public class MessageServiceImplement implements MessageService {
    // get message list
    @Override
    public List<MessageModel> getMessageList() {
        // initialize an empty list and return
        List<MessageModel> returnList = new ArrayList<MessageModel>();
        // read json file address
        File f = new File("message.json");
        // if file is not exist
        if (f.exists()) {
            // get Json content
            String json = getJson(f).toString();
            // To convert a JSON object to a Java object using Gson
            Gson gson = new Gson();
            // determine type for deserialize
            Type type = new ArrayList<MessageModel>(){}.getClass().getGenericSuperclass();
            returnList = gson.fromJson(json, type);
            return returnList;
        }
        else {
            System.out.println("Sorry, couldn't find the message.json");
            return returnList;
        }
    }
    // save message
    @Override
    public String saveMessageList(List<MessageModel> messageList) {
        // initialize an empty list to hold the Json objects (MessageModel)
        List<JsonObject> returList = new ArrayList<>();
        // check list which is empty or not
        if(!CollectionUtils.isEmpty(messageList)){
            // convert each item in MessageModel to Json object
            messageList.forEach(item->{
                // Step 1: Create Json object
                JsonObject jsonObject = new JsonObject();
                jsonObject.addProperty("id",item.getId() );
                jsonObject.addProperty("message", item.getMessage());
                jsonObject.addProperty("messageTimeStamp", item.getMessageTimestamp());
                returList.add(jsonObject);
            });
            // Step 2: To convert a JSON object to a Java object using Gson
            Gson gson = new Gson();
            String jsonStr = gson.toJson(returList);
            // Step 3: Write Json string to file
            try (FileWriter writer = new FileWriter("message.json")) {
                writer.write(jsonStr);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        // return size of input list
        return String.valueOf(messageList.size());
    }

    @Override
    public List<MessageModel> delMessageList(List<MessageModel> messageList) {
        // initialize an empty list，used to store MessageModel objects which remain after deletion
        List<MessageModel> returnList = new ArrayList<MessageModel>();
        // read Json file
        File f = new File("message.json");
        return returnList;
    }
    /**
     * get content from json file
     */
    private  String getJson(File file){
        // initialize string builder, file and buffer
        StringBuilder sb = new StringBuilder();
        FileInputStream fis = null;
        BufferedReader br = null;
        // reading file through try-catch block
        try {
            // open file and read
            fis = new FileInputStream(file);
            // encode with UTF-8, let bufferReader read more efficient
            br = new BufferedReader(new InputStreamReader(fis, StandardCharsets.UTF_8));
            // read first line
            String str = br.readLine();
            // keep reading until the end
            while(str != null) {
                sb.append(str);
                str = br.readLine();
            }
        } catch (FileNotFoundException e) {
            // file not found
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            // encoding is not support
            e.printStackTrace();
        } catch (IOException e) {
            // handle other I/O exception
            e.printStackTrace();
        } finally {
            try {
                // close FileInputStream
                if (fis != null) {
                    fis.close();
                }
                // close BufferedReader
                if (br != null) {
                    br.close();
                }
            } catch (IOException e) {
                // handle exception when closing
                e.printStackTrace();
            }
        }
        // convert string builder to Json string return Json string
        return sb.toString();
    }
}
