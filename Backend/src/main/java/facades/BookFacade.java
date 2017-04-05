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
    
    public Book getBook(int id) {
        return getEntityManager().find(Book.class, id);
    }
    
    public List<Book> getBooks(User user) {
        Query q = getEntityManager().createQuery("SELECT b FROM BOOK b WHERE b.user = :username");
        q.setParameter("username", user);
        return q.getResultList();
    }
    
    public List<Book> getAllBooks() {
        Query q = getEntityManager().createQuery("SELECT b FROM BOOK b");
        return q.getResultList();
    }
    
    public Book updateBook(int id, String title, String info) {
        Book book = getEntityManager().find(Book.class, id);
        book.setInfo(info);
        book.setTitle(title);
        persist(book);
        return book;
    }
    
    public void deleteBook(int id) {
        delete(getEntityManager().find(Book.class, id));
    }
    
    private void persist(Object... objs) {
        getEntityManager().getTransaction().begin();
        for (Object o : objs) {
            getEntityManager().persist(o);
        }
        getEntityManager().getTransaction().commit();
    }
    
    private void delete(Object... objs) {
        getEntityManager().getTransaction().begin();
        for (Object o : objs) {
            getEntityManager().remove(o);
        }
        getEntityManager().getTransaction().commit();
    }
    
}