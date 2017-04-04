package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import facades.Facade;
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
        String username = "user";   //TODO: Get username from logged in session, store into username
        entity.Book b = (entity.Book) gson.fromJson(content, entity.Book.class);
        b.setUsername(username);
        entity.Book created = facade.createBook(b);
        //created.setUser(null);
        String response = gson.toJson(created, entity.Book.class);
        return Response
                .status(Response.Status.OK)
                .entity(response)
                .build();
    }
    
    @GET
    @Path("/user/{userName}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPeopleFromZipCode(@PathParam("userName") String userName){
        
        List<entity.Book> books = facade.getBooks(userName);
        //String stuff = "Found user: " + user.getUserName() + ", pass: " + user.getPassword() + ", role: " + user.getRole();
        String response = gson.toJson(books, List.class);
        
        return Response
                .status(Response.Status.OK)
                .entity(response)
                .build();
    }
}