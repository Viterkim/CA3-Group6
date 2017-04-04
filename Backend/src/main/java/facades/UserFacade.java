package facades;

import security.IUserFacade;
import entity.User;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import security.IUser;
import security.PasswordStorage;

public class UserFacade implements IUserFacade {

    EntityManagerFactory emf;
    EntityManager manager;

    public UserFacade(EntityManagerFactory emf) {
        this.emf = emf;
    }

    private EntityManager getEntityManager() {
        if (manager == null) {
            manager = emf.createEntityManager();
        } 
        return manager;
    }

    @Override
    public User getUserByUserName(String name) {
        return getEntityManager().find(User.class, name);
    }

    /*
    Return the Roles if users could be authenticated, otherwise null
     */
    @Override
    public String authenticateUser(String userName, String password) throws PasswordStorage.CannotPerformOperationException, PasswordStorage.InvalidHashException{
        User user = getUserByUserName(userName);
        return user != null && PasswordStorage.verifyPassword(password, user.getPassword()) ? user.getRole() : null;  
    }

}