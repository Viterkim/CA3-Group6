
package facades;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;


public class BookFacade
{
    EntityManagerFactory emf;
    EntityManager em;

    public BookFacade(EntityManagerFactory emf)
    {
        this.emf = emf;
        this.em = emf.createEntityManager();
    }
    
    private EntityManager getEntityManager() {
    return emf.createEntityManager();
    }
    
    
}
