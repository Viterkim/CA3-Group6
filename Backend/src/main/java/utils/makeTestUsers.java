package utils;

import entity.Book;
import entity.User;
import facades.UserFacade;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.EntityManager;
import javax.persistence.Persistence;

public class makeTestUsers {

  //Only for initial testing REMOVE BEFORE PRODUCTION
  //Run this file to setup the users required to use the initial version of the seed
  public static void main(String[] args) {
    EntityManager em = Persistence.createEntityManagerFactory("pu_development").createEntityManager();
    try {
      System.out.println("Creating TEST Users");
      if (em.find(User.class, "user") == null) {
        em.getTransaction().begin();
        String userRole = new String("User");
        String adminRole = new String("Admin");
        User user = new User("user", "test");
        user.setRole(userRole);
        User admin = new User("admin", "test");
        admin.setRole(adminRole);
        User both = new User("user_admin", "test");
        both.setRole(userRole);
        both.setRole(adminRole);
        //em.persist(userRole);
        //em.persist(adminRole);
        em.persist(user);
        em.persist(admin);
        em.persist(both);
        //BookTest
        Book b1 = new Book("Eventyr", "Det er fandeme en god bog", user.getUserName());
        em.persist(b1);
        em.getTransaction().commit();
        System.out.println("Created TEST Users");
      }
    } catch (Exception ex) {
      Logger.getLogger(UserFacade.class.getName()).log(Level.SEVERE, null, ex);
      em.getTransaction().rollback();
    } finally {
      em.close();
    }
  }
}