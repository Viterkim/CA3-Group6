package facades;

import entity.*;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;


public class BookFacade
{
    EntityManagerFactory emf;
    EntityManager manager;

    public BookFacade(EntityManagerFactory emf) {
        this.emf = emf;
    }
    
    private EntityManager getEntityManager() {
        if (manager == null) {
            manager = emf.createEntityManager();
        }
        return manager;
    }
    
    public Book createBook(String title, String info, User user) {
        Book book = new Book(title, info, user);
        persist(book);
        return book;
    }
    
    public Book createBook(Book b) {
        persist(b);
        return b;
    }
    
    public Book getBook(String title) {
        return getEntityManager().find(Book.class, title);
    }
    
    public List<Book> getBooks(String username) {
        Query q = getEntityManager().createQuery("SELECT b FROM BOOK b WHERE b.username = :username");
        q.setParameter("username", username);
        return q.getResultList();
    }
    
    public void persist(Object... objs) {
        getEntityManager().getTransaction().begin();
        for (Object o : objs) {
            getEntityManager().persist(o);
        }
        getEntityManager().getTransaction().commit();
    }
    
}