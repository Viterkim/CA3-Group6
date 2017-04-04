package rest;

import facades.Facade;
import facades.UserFacade;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import security.IUser;

@Path("user")
//@RolesAllowed("User")
public class User {
  
    Facade facade = Facade.getFacade();
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getSomething(){
        return "{\"message\" : \"Hello User from Server (Accesible by only authenticated USERS)\"}"; 
    }
 
    @GET
    @Path("/id/{userName}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPeopleFromZipCode(@PathParam("userName") String userName){
        
        entity.User user = facade.getUserByName(userName);
        String stuff = "Found user: " + user.getUserName() + ", pass: " + user.getPassword() + ", role: " + user.getRole();
        
        return Response
                .status(Response.Status.OK)
                .entity(stuff)
                .build();
    }
  
}