package security;

import entity.Role;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

/*
REF: http://scytl.github.io/restguide/#_security_2
*/
public class UserPrincipal implements Principal {
 private String username; 

  private Role role;

  
  public UserPrincipal(String username, Role role) {
    super();
    this.username = username;
    this.role = role;
  }

  @Override
  public String getName() { 
    return username;
  }

  public boolean isUserRole(String roleName) {
    return this.role.getRoleName().equals(roleName);
  }
}
