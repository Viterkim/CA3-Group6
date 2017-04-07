package entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import org.eclipse.persistence.annotations.CascadeOnDelete;
import security.IUser;
import security.PasswordStorage;

@Entity(name = "USER")
public class User implements IUser, Serializable{

    //You will need to change this to save a Hashed/salted password 
    @Column(length = 255, name = "PASSWORD")
    private String passwordHash;

    @Id
    @Column(length = 35)
    private String username;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private Role role;

    @OneToMany(mappedBy="user")
    @CascadeOnDelete
    private List<Book> books = new ArrayList<>();

    public User() throws PasswordStorage.CannotPerformOperationException {
        
    }

    public User(String userName, String password) throws PasswordStorage.CannotPerformOperationException {
        this.username = userName;
        this.passwordHash = PasswordStorage.createHash(password);
    }

    public void setRole(Role role){
        this.role = role;
        role.addUser(this);
    }

    public Role getRole() {
        return role;
    }

    @Override
    public String getPassword() {
      return passwordHash;
    }


    public void setPassword(String password) {
      this.passwordHash = password;
    }

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getUserName() {
        return username;
    }

}