package entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import security.IUser;
import security.PasswordStorage;

@Entity(name = "SEED_USER")
public class User implements IUser, Serializable{
 
  //You will need to change this to save a Hashed/salted password 
  @Column(length = 255, name = "PASSWORD_HASH",nullable = false)
  private String passwordHash; 
  
  @Id
  @Column(length = 35, name = "USER_NAME",nullable = false)
  private String userName;
  
  private String role;
  
  public User() throws PasswordStorage.CannotPerformOperationException {
  }

  public User(String userName, String password) throws PasswordStorage.CannotPerformOperationException {
    this.userName = userName;
    this.passwordHash = PasswordStorage.createHash(password);
  }
  
  public void setRole(String role){
      this.role = role;
  }
  
  public String getRole(){
    return role;
  }
  
  @Override
  public String getPassword() {
    return passwordHash;
  }
  

  public void setPassword(String password) {
    this.passwordHash = password;
  }

  /*
    public List<Book> getBooks()
    {
        return books;
    }

    public void setPhones(List<Book> books)
    {
        this.books = books;
    }
    */
  
  
  @Override
  public String getUserName() {
    return userName;
  }
     
}