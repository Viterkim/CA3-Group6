package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import facades.Facade;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("test")
public class Test {
  
    Facade facade = Facade.getFacade();
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    Gson graphBuilder;
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getSomething(){
        return "{\"message\" : \"Hello from Test!\"}"; 
    }
  
}