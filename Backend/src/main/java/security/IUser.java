package security;

import entity.Role;
import java.util.List;

public interface IUser {
    
    String getUserName();
    Role getRole();
    String getPassword();
    
}
