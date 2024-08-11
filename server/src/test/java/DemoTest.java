import org.junit.Test;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class DemoTest {
    @Test
    public void test() {
        // read file's address
        File f = new File("message.json");
        // get the json content
        String json = getJson(f).toString();
        System.out.println(json);
    }

    /*
    * read message json file
    * testing api is worked or not
    * */
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
