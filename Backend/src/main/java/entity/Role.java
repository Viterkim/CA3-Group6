package entity;
 
import java.io.Serializable;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity(name = "ROLE")
public class Role implements Serializable {

  @OneToMany(mappedBy = "role")
  private List<User> users = new ArrayList<>();

  private static final long serialVersionUID = 1L;

  @Id
  @Column(length = 30)
  private String name;

  public Role(String roleName) {
    this.name = roleName;
  }

  public Role() {
  }

  public List<User> getUsers() {
    return users;
  }

  public void addUser(User user) {
    if(users == null){
      users = new ArrayList();
    }
    users.add(user);
  }

  public String getRoleName() {
    return name;
  }

  public void setRoleName(String roleName) {
    this.name = roleName;
  }

    @Override
    public boolean equals(Object obj) {
        return this.name.equals(((Role) obj).getRoleName());
    }

}