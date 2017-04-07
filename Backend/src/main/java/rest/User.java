package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.graph.GraphAdapterBuilder;
import entity.Role;
import facades.Facade;
import facades.UserFacade;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import security.IUser;
import security.PasswordStorage;

@Path("user")
//@RolesAllowed("User")
public class User {
  
    Facade facade = Facade.getFacade();
    Gson gson = new GsonBuilder().setPrettyPrinting().create();
    Gson graphBuilder;
    
    @POST
    //@Path("")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    //@RolesAllowed({"User", "Admin", "user", "admin"})
    public Response createUserFromJSON(String content) {
        //entity.User user = facade.getUserByName(username);   //TODO: Get username from logged in session, store into username
        
        entity.User b = getUserFromJson(content);
        
        System.out.println("User was gotten from json: " + content);
        
        entity.User created = facade.createUser(b);
        
        System.out.println("Created new user: " + created.getUserName());
        
        
        //created.setUser(null);
        String response = getGraphBuilder().toJson(created, entity.Book.class);
        //response = formatSingleJSON(response);
        response = getUsers(response);
        
        return Response
                .status(Response.Status.OK)
                .entity(response)
                .build();
    }
    
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
        response = getUsers(response);
        
        return Response
                .status(Response.Status.OK)
                .entity(response)
                .build();
    }
  
    @GET
    @Path("/all")
    //@RolesAllowed({"User", "Admin"})
    @Produces(MediaType.APPLICATION_JSON)   //   seedMaven/api/book?username=XYZ
    public Response getUsersFromAll(){
        System.out.println("Fetching all users!");
        List<entity.User> users = facade.getAllUsers();
        String response = getGraphBuilder().toJson(users, List.class);
        //response = getGraphBuilder().toJson(response);
        
        //response = getFormattedJSON(response);
        
        response = getUsers(response);
        
        return Response
                .status(Response.Status.OK)
                .entity(response)
                .build();
    }
    
    @PUT
    //@Path("")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)   //     seedMaven/api/user?username=XYZ
    public Response updateUser(String content) {
        
        String response = updateUserFromJson(content);
        
        return Response
                .status(Response.Status.OK)
                .entity(response)
                .build();
    }
  
    @GET
    @Path("/delete")
    //@RolesAllowed({"Admin"})
    @Produces(MediaType.APPLICATION_JSON)   //   seedMaven/api/user/delete?username=XYZ
    public Response deleteUser(@QueryParam("username") String name) {
        entity.User u = null;
        try {
            u = facade.deleteUser(name);
        } catch (Exception e) {
            throw new NotAuthorizedException(e.getMessage(), Response.Status.CONFLICT);
        }
        
        String response = "Deleted user " + u.getUserName();
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
    
    private String getUsers(String json) {
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
            JsonElement roleID = userObj.getAsJsonObject().get("role");
            
            
            JsonElement ele3 = o.get(roleID.getAsString());
            JsonElement userEle2 = ele3.getAsJsonObject();
            JsonObject userObj2 = userEle2.getAsJsonObject();
            JsonElement rolenameEle = userObj2.get("name");

            userObj.remove("role");
            userObj.remove("books");
            userObj.remove("passwordHash");
            userObj.add("role", rolenameEle);
            
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
    
    public entity.User getUserFromJson(String json) {
        JsonObject obj = gson.fromJson(json, JsonObject.class);
        String username = obj.get("username").getAsString();
        String password = obj.get("password").getAsString();
        String rolename = obj.get("rolename").getAsString();
        entity.User user = null;
        try {
            user = new entity.User(username, PasswordStorage.createHash(password));
        } catch (Exception e) {
            throw new NotAuthorizedException("Error, cannot store password, get rekt m8", Response.Status.CONFLICT);
        }
        user.setRole(new Role(rolename));
        return user;
    }
    
    public String updateUserFromJson(String json) {
        JsonObject obj = gson.fromJson(json, JsonObject.class);
        entity.User userObj = null;
        try {
            String oldUsername = obj.get("oldUsername").getAsString();
            String newUsername = obj.get("newUsername").getAsString();
            String rolename = obj.get("role").getAsString();
            userObj = facade.updateUsername(oldUsername, newUsername);
            userObj = facade.updateRole(newUsername, new Role(rolename));
        } catch (Exception e) {
            //Not updating username...
            throw new NotAuthorizedException(e.getMessage(), Response.Status.CONFLICT);
        }
        String s = getGraphBuilder().toJson(userObj);
        return getUsers(s);
    }
    
}