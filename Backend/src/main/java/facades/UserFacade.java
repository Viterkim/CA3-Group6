package facades;

import entity.Book;
import entity.Role;
import security.IUserFacade;
import entity.User;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
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

    public User createUser(String username, String passwordHash, Role r) {
        try {
            User user = new User(username, passwordHash);
            user.setRole(r);
            persist(user);
            return user;
        } catch (Exception e) {
            return null;
        }
    }
    
    public User createUser(User u) {
        System.out.println(u.toString());
        u.setRole( getRole(u.getRole().getRoleName()) );
        persist(u);
        return u;
    }
    
    @Override
    public User getUserByUserName(String name) {
        return getEntityManager().find(User.class, name);
    }

    public List<User> getAllUsers() {
        Query q = getEntityManager().createQuery("SELECT u FROM USER u");
        return q.getResultList();
    }
    
    public void updateUser(User user) {
        update(user);
    }
    
    public User updateUsername(String oldname, String newname) {
        Query q = getEntityManager().createQuery("SELECT u FROM USER u where u.username = :username");
        q.setParameter("username", oldname);
        User user = (User) q.getSingleResult();
        user.setUsername(newname);
        update(user);
        return user;
    }
    
    public User updateRole(String username, Role r) {
        Query q = getEntityManager().createQuery("SELECT u FROM USER u where u.username = :username");
        q.setParameter("username", username);
        User user = (User) q.getSingleResult();
        user.setRole(r);
        update(user);
        return user;
    }
    
    public User deleteUser(String username) {
        Query q = getEntityManager().createQuery("SELECT u FROM USER u WHERE u.username = :username");
        q.setParameter("username", username);
        User u = (User) q.getSingleResult();
        delete(u);
        return u;
    }
    
    public User deleteUser(User user) {
        return deleteUser(user.getUserName());
    }
    
    /*
    Return the Roles if users could be authenticated, otherwise null
     */
    @Override
    public Role authenticateUser(String userName, String password) throws PasswordStorage.CannotPerformOperationException, PasswordStorage.InvalidHashException{
        User user = getUserByUserName(userName);
        return user != null && PasswordStorage.verifyPassword(password, user.getPassword()) ? user.getRole() : null;  
    }

    private void persist(Object... objs) {
        getEntityManager().getTransaction().begin();
        for (Object o : objs) {
            getEntityManager().persist(o);
        }
        getEntityManager().getTransaction().commit();
    }
    
    private void update(Object... objs) {
        getEntityManager().getTransaction().begin();
        for (Object o : objs) {
            getEntityManager().merge(o);
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

    private Role getRole(String roleName) {
        Query q = getEntityManager().createQuery("SELECT r FROM ROLE r WHERE r.name = :rolename");
        q.setParameter("rolename", roleName);
        Role role = (Role) q.getSingleResult();
        return role;
    }
    
}