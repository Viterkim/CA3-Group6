package security;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

/*
REF: http://scytl.github.io/restguide/#_security_2
*/
public class UserPrincipal implements Principal {
 private String username; 

  private String role = null;

  
  public UserPrincipal(String username, String role) {
    super();
    this.username = username;
    this.role = role;
  }

  @Override
  public String getName() { 
    return username;
  }

  public boolean isUserInRole(String role) { 
    return this.role.equals(role);
  }
}
