
package entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "BOOK")
public class Book{
    public Book(){
    }

    public Book(String title, String info, User user)
    {
        this.title = title;
        this.info = info;
        //this.user = user;
    }
    
    public Book(String title, String info, String username)
    {
        this.title = title;
        this.info = info;
        this.username = username;
    }
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    
    private String title, info, username;
    
    /*
    @ManyToOne
    @JoinColumn(name="CREATED_BY", referencedColumnName = "Creator")
    private User user;
    */
    
    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public String getInfo()
    {
        return info;
    }

    public void setInfo(String info)
    {
        this.info = info;
    }

    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }

    
    
    /*
    public User getUser()
    {
        return user;
    }

    public void setUser(User user)
    {
        this.user = user;
    }
    */

}
