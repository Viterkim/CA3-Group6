package facades;

import entity.Book;
import entity.User;
import java.util.List;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import security.IUser;

public class Facade {
 
    private static final Facade facade = new Facade();
    private final BookFacade bookFacade;
    private final UserFacade userFacade;
    
    private Facade() {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("pu_development");
        bookFacade = new BookFacade(emf);
        userFacade = new UserFacade(emf);
    }
    
    public Book createBook(String title, String info, User user) {
        return bookFacade.createBook(title, info, user);
    }
    
    public Book createBook(Book b) {
        return bookFacade.createBook(b);
    }
    
    public Book getBook(String title) {
        return bookFacade.getBook(title);
    }
    
    public List<Book> getBooks(String username) {
        return bookFacade.getBooks(username);
    }
    
    public User getUserByName(String name) {
        return userFacade.getUserByUserName(name);
    }
    
    public static Facade getFacade() {
        return facade;
    }
    
}