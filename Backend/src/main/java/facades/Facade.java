package facades;

import entity.Book;
import entity.User;
import java.util.List;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

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
    
    public Book getBook(int id) {
        return bookFacade.getBook(id);
    }
    
    public List<Book> getBooks(User user) {
        return bookFacade.getBooks(user);
    }
    
    public List<Book> getAllBooks() {
        return bookFacade.getAllBooks();
    }
    
    public Book updateBook(int id, String title, String info) {
        return bookFacade.updateBook(id, title, info);
    }
    
    public Book updateBook(Book b) {
        return bookFacade.updateBook(b.getId(), b.getTitle(), b.getInfo());
    }
    
    public User getUserByName(String name) {
        return userFacade.getUserByUserName(name);
    }
    
    public List<User> getAllUsers() {
        return userFacade.getAllUsers();
    }
    
    public static Facade getFacade() {
        return facade;
    }
    
}