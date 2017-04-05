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
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import httpErrors.*;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.ProcessingException;

@Path("book")
//@RolesAllowed("Admin")
public class Book {

    Facade facade = Facade.getFacade();
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    Gson graphBuilder;
    
    @POST
    @Path("")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    //@RolesAllowed({"User", "Admin", "user", "admin"})
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
    @Path("/all")
    //@RolesAllowed({"User", "Admin"})
    @Produces(MediaType.APPLICATION_JSON)   //   seedMaven/api/book?username=XYZ
    public Response getBooksFromAll(){
        List<entity.Book> books = facade.getAllBooks();

        String response = getGraphBuilder().toJson(books, List.class);
        response = getFormattedJSON(response);
        
        return Response
                .status(Response.Status.OK)
                .entity(response)
                .build();
    }
    
    @GET
    @Path("")
    @RolesAllowed({"User", "Admin"})
    @Produces(MediaType.APPLICATION_JSON)   //   seedMaven/api/book?username=XYZ
    public Response getBooksFromUsername(@QueryParam("username") String username){
        List<entity.Book> books = null;
        
        if (username.equals("") || username.isEmpty()) {
            books = facade.getAllBooks();
        } else {
            //Check if username == user logged in?
            books = facade.getBooks(facade.getUserByName(username));
        }
        String response = getGraphBuilder().toJson(books, List.class);
        response = getFormattedJSON(response);
        
        return Response
                .status(Response.Status.OK)
                .entity(response)
                .build();
    }
    
    @GET
    @Path("/update")
    @RolesAllowed({"User", "Admin"})
    @Produces(MediaType.APPLICATION_JSON)   //   seedMaven/api/book?username=XYZ
    public Response updateBooks(@QueryParam("bookID") String id, @QueryParam("bookTitle") String title, @QueryParam("bookInfo") String info){
        entity.Book book = null;
        try {
            book = facade.getBook(Integer.parseInt(id));
        } catch (Exception e) {
            throw new NotAuthorizedException("Non numeric value input", Response.Status.CONFLICT);
        }
        book.setTitle(title);
        book.setInfo(info);
        book = facade.updateBook(book);
        String response = getGraphBuilder().toJson(book, entity.Book.class);
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
    
}