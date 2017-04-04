package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.graph.GraphAdapterBuilder;
import facades.Facade;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("book")
//@RolesAllowed("User")
public class Book {

    Facade facade = Facade.getFacade();
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    Gson graphBuilder;
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getSomething(){
        return "{\"message\" : \"Hello User from Server (Accesible by only authenticated USERS)\"}"; 
    }

    @POST
    //@Path("/create/{title}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createBookFromJSON(String content) {
        entity.User user = facade.getUserByName("user");   //TODO: Get username from logged in session, store into username
        entity.Book b = (entity.Book) gson.fromJson(content, entity.Book.class);
        b.setUser(user);
        entity.Book created = facade.createBook(b);
        //created.setUser(null);
        String response = getGraphBuilder().toJson(created, entity.Book.class);
        response = formatSingleJSON(response);
        
        return Response
                .status(Response.Status.OK)
                .entity(response)
                .build();
    }
    
    @GET
    @Path("/user/{userName}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPeopleFromZipCode(@PathParam("userName") String userName){
        
        List<entity.Book> books = facade.getBooks(facade.getUserByName(userName));
        //String stuff = "Found user: " + user.getUserName() + ", pass: " + user.getPassword() + ", role: " + user.getRole();
        
        String response = getGraphBuilder().toJson(books, List.class);
        response = getFormattedJSON(response);
        
        return Response
                .status(Response.Status.OK)
                .entity(response)
                .build();
    }
    
    private Gson getGraphBuilder() {
        if (graphBuilder == null) {
            GsonBuilder builder = new GsonBuilder();
            new GraphAdapterBuilder()
                    .addType(entity.Book.class)
                    .addType(entity.User.class)
                    .addType(entity.Role.class)
                    .registerOn(builder);
            graphBuilder = builder.setPrettyPrinting().create();
        }
        return graphBuilder;
    }
    
    private String formatSingleJSON(String singleJSON) {
        JsonObject o = gson.fromJson(singleJSON, JsonObject.class);
        JsonElement ele = o.get("0x1");
        JsonArray arr = new JsonArray();
        arr.add(ele);
        return gson.toJson(arr);
    }
    
    private String getFormattedJSON(String fullJSON) {
        JsonArray jsonArray = getGraphBuilder().fromJson(fullJSON, JsonElement.class).getAsJsonArray();
        ArrayList<JsonObject> objects = new ArrayList<>();
        for (int i = 0; i < jsonArray.size(); i++) {
            objects.add(jsonArray.get(i).getAsJsonObject());
        }
        JsonArray jsonArrayNew = new JsonArray();
        for (JsonObject o : objects) {
            JsonElement ele = o.get("0x1");
            jsonArrayNew.add(ele);
        }
        return gson.toJson(jsonArrayNew);
    }
    
}