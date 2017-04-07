
package rest;

import io.restassured.*;
import static io.restassured.RestAssured.given;
import io.restassured.parsing.Parser;
import org.junit.BeforeClass;
import org.junit.Test;

import static org.hamcrest.Matchers.greaterThan;
import org.hamcrest.core.*;
import static org.hamcrest.core.IsEqual.equalTo;

public class BookIntegrationTest
{
    @BeforeClass
    public static void setUpBeforeAll()
    {
        RestAssured.baseURI = "http://viter.dk/ca3back/api/";
        RestAssured.basePath = "/";
        RestAssured.defaultParser = Parser.JSON;
    }

    @Test
    public void serverIsRunning()
    {
        given().when().get("test").then().statusCode(200);
    }
    
    @Test
    public void getAllBooks()
    {
        given().when().get("book/all").then().assertThat().body("size()", greaterThan(0));
    }
    
        
    //Can't coordinate authentication with remote server, any smart fix?
//    @Test
//    public void getSpecificBook() throws Exception
//    {
//        String auth = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjoiQWRtaW4iLCJleHAiOjE0OTE1NzQyNTYsImlhdCI6MTQ5MTU3MDY1NiwiaXNzdWVyIjoic2VtZXN0ZXIzZGVtby1jcGhidXNpbmVzcy5kay1jb21wdXRlclNjaWVuY2UiLCJ1c2VybmFtZSI6ImFkbWluIn0.zTKC3iH7IVNurLdM2NG37CW0URp1hiiA_4NhkJu98Oo";
//        //You need to get a new authrization header before you run the test!
//        given().header("Authorization", auth).when().get("book?bookID=1").then().body("[0].title", equalTo("Eventyr0"));
//    }
    
    
    //Exception Testing
    @Test
    public void nonexistantPageExceptionTest()
    {
        given().
                when().get("bingotrolden").
                then().
                body("error.code", equalTo(404));
    }
    
    @Test
    public void nonexistantAuthorizationHeader()
    {
        given().
                when().get("book?bookID=1").
                then().
                body("error.code", equalTo(401));
    }

}
