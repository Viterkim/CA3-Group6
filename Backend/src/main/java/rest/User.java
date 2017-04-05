package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.graph.GraphAdapterBuilder;
import facades.Facade;
import facades.UserFacade;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import security.IUser;

@Path("user")
//@RolesAllowed("User")
public class User {
  
    Facade facade = Facade.getFacade();
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    Gson graphBuilder;
    
    @GET
    @Path("")
    @Produces(MediaType.APPLICATION_JSON)   //     seedMaven/api/user?username=XYZ
    public Response getUserFromUsername(@QueryParam("username") String username){
        List<entity.User> users = null;
        
        if (username.equals("") || username.isEmpty()) {
            users = facade.getAllUsers();
        } else {
            users = new ArrayList<>();
            users.add(facade.getUserByName(username));
        }
        
        String response = getGraphBuilder().toJson(users, List.class);
        response = getFormattedJSON(response);
        
        return Response
                .status(Response.Status.OK)
                .entity(response)
                .build();
    }
  
    @GET
    @Path("/update")
    @Produces(MediaType.APPLICATION_JSON)   //     seedMaven/api/user?username=XYZ
    public Response updateUser(@QueryParam("username") String username, @QueryParam("password") String password, @QueryParam("rolename") String rolename) {
        List<entity.User> users = null;
        
        if (username.equals("") || username.isEmpty()) {
            users = facade.getAllUsers();
        } else {
            users = new ArrayList<>();
            users.add(facade.getUserByName(username));
        }
        
        String response = getGraphBuilder().toJson(users, List.class);
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