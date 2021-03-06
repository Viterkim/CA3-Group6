package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
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
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import httpErrors.*;
import javax.swing.JOptionPane;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.PUT;
import javax.ws.rs.ProcessingException;

@Path("book")
//@RolesAllowed("Admin")
public class Book {

    Facade facade = Facade.getFacade();
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    Gson graphBuilder;
    
    @POST
    //@Path("")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    //@RolesAllowed({"User", "Admin", "user", "admin"})
    public Response createBookFromJSON(String content) {
        //entity.User user = facade.getUserByName(username);   //TODO: Get username from logged in session, store into username
        
        entity.Book b = getBookFromJson(content);
        
        System.out.println("Book was gotten from json: " + content);
        
        entity.Book created = facade.createBook(b);
        
        System.out.println("Created new book: " + created.getTitle() + " with id: " + created.getId());
        
        
        //created.setUser(null);
        String response = getGraphBuilder().toJson(created, entity.Book.class);
        //response = formatSingleJSON(response);
        response = getBooks(response);
        
        return Response
                .status(Response.Status.OK)
                .entity(response)
                .build();
    }
    
    @PUT
    //@Path("")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    //@RolesAllowed({"User", "Admin", "user", "admin"})
    public Response updateBookFromJSON(String content) {
        //entity.User user = facade.getUserByName(username);   //TODO: Get username from logged in session, store into username
        System.out.println(content);
        entity.Book b = getBookFromJson(content);
        System.out.println("Rest info: " + b.getInfo());
        entity.Book updated = facade.updateBook(b);
        //created.setUser(null);
        String response = getGraphBuilder().toJson(updated, entity.Book.class);
        
        //response = formatSingleJSON(response);
        response = getBooks(response);
        
        return Response
                .status(Response.Status.OK)
                .entity(response)
                .build();
    }
    
    @GET
    @Path("/all")
    //@RolesAllowed({"User", "Admin"})
    @Produces(MediaType.APPLICATION_JSON)   //   seedMaven/api/book?username=XYZ
    public Response getBooksFromAll(){
        List<entity.Book> books = facade.getAllBooks();
        String response = getGraphBuilder().toJson(books, List.class);
        //response = getGraphBuilder().toJson(response);
        
        response = getBooks(response);
        
        return Response
                .status(Response.Status.OK)
                .entity(response)
                .build();
    }
    
    @GET
    //@Path("")
    @RolesAllowed({"User", "Admin"})
    @Produces(MediaType.APPLICATION_JSON)   //   seedMaven/api/book?username=XYZ
    public Response getBooksFromUsername(@QueryParam("username") String username){
        
        System.out.println("Running get books from username: " + username);
        
        List<entity.Book> books = null;
        
        if (username.equals("") || username.isEmpty()) {
            throw new NotAuthorizedException("Unable to get books from blank username", Response.Status.CONFLICT);
        } else {
            //Check if username == user logged in?
            books = facade.getBooks(facade.getUserByName(username));
        }
        String response = getGraphBuilder().toJson(books, List.class);
        response = getBooks(response);
        
        return Response
                .status(Response.Status.OK)
                .entity(response)
                .build();
    }
    
    @GET
    @Path("/id")
    //@RolesAllowed({"User", "Admin"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getBookFromId(@QueryParam("id") String id){
        
        entity.Book book = null;
        
        if (id.equals("") || id.isEmpty()) {
            throw new NotAuthorizedException("Unable to get book from id", Response.Status.CONFLICT);
        } else {
            try{
                book = facade.getBook(Integer.parseInt(id));
            }catch(Exception e){
                throw new NotAuthorizedException("Invalid id, please enter a numeric input", Response.Status.CONFLICT);
            }
        }
        String response = getGraphBuilder().toJson(book, entity.Book.class);
        response = getBooks(response);
        
        return Response
                .status(Response.Status.OK)
                .entity(response)
                .build();
    }
    
    @GET
    @Path("/update")
    @RolesAllowed({"User", "Admin"})
    @Produces(MediaType.APPLICATION_JSON)   //   seedMaven/api/book?username=XYZ
    public Response updateBooks(@QueryParam("bookID") String id, @QueryParam("bookTitle") String title, @QueryParam("bookInfo") String info) {
        entity.Book book = null;
        try {
            book = facade.getBook(Integer.parseInt(id));
        } catch (Exception e) {
            throw new NotAuthorizedException("Non numeric value input or no book with id: " + id, Response.Status.CONFLICT);
        }
        book.setTitle(title);
        book.setInfo(info);
        book = facade.updateBook(book);
        String response = getGraphBuilder().toJson(book, entity.Book.class);
        response = getBooks(response);
        
        return Response
                .status(Response.Status.OK)
                .entity(response)
                .build();
    }
    
    @GET
    @Path("/delete")
    @RolesAllowed({"User", "Admin"})
    @Produces(MediaType.APPLICATION_JSON)   //   seedMaven/api/book?username=XYZ
    public Response deleteBooks(@QueryParam("bookID") String id) {
        entity.Book b = null;
        try {
            b = facade.deleteBook(Integer.parseInt(id));
        } catch (Exception e) {
            throw new NotAuthorizedException("Non numeric value input", Response.Status.CONFLICT);
        }
        
        String response = "Deleted book " + b.getTitle();
        response = gson.toJson(response);
        
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
    
    private String getBooks(String json) {
        JsonArray arr = null;
        try {
            arr = gson.fromJson(json, JsonArray.class);
        } catch (Exception e) {
            arr = new JsonArray();
            arr.add(gson.fromJson(json, JsonObject.class));
        }
        //JsonArray arr = gson.fromJson(json, JsonArray.class);
        String fullJSON = ""; //+ gson.toJson(arr.size()) + System.lineSeparator();
        //int i = 1;
        JsonArray newArr = new JsonArray();
        for (int i = 1; i <= arr.size(); i++) {
            JsonElement ele = arr.get(i - 1);
            JsonObject o = ele.getAsJsonObject();
            
            JsonElement ele2 = o.get("0x1");
            JsonObject userObj = ele2.getAsJsonObject();
            JsonElement userID = userObj.getAsJsonObject().get("user");
            
            
            JsonElement ele3 = o.get(userID.getAsString());
            JsonElement userEle2 = ele3.getAsJsonObject();
            JsonObject userObj2 = userEle2.getAsJsonObject();
            JsonElement usernameEle = userObj2.get("username");

            userObj.remove("user");
            userObj.add("user", usernameEle);
            
            if (userObj == null) {
                throw new NotAuthorizedException("User element is null!!");
            }
            
            //fullJSON += gson.toJson(userObj.getAsJsonObject()) + System.lineSeparator();
            newArr.add(userObj);
        }
        return gson.toJson(newArr);
    }
    
    private String formatSingleJSON(String singleJSON) {
        JsonObject o = gson.fromJson(singleJSON, JsonObject.class);
        JsonElement ele = o.get("0x1");
        JsonArray arr = new JsonArray();
        arr.add(ele);
        return gson.toJson(arr);
    }
    
    private String getFormattedJSON(String fullJSON) {
        try {
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
        } catch (Exception e) {
            if (e.getMessage().toLowerCase().contains("json arra")) {
                return formatSingleJSON(fullJSON);
            }
        }
        return null;
    }
    
    public entity.Book getBookFromJson(String json) {
        JsonObject obj = gson.fromJson(json, JsonObject.class);
        int id = -1;
        try {
            id = obj.get("id").getAsInt();
        } catch (Exception e) { }
        String title = obj.get("title").getAsString();
        String info = obj.get("info").getAsString();
        String user = obj.get("user").getAsString();
        entity.Book book = new entity.Book(title, info, facade.getUserByName(user));
        if (id != -1) {
            book.setId(id);
        }
        return book;
    }
    
}