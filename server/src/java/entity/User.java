package entity;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name="user")
public class User implements Serializable{

    public User() {}
    
    @Id
    @Column(name = "email",length = 100,nullable = false)
    private String email;
    
    @Column(name = "username",length = 45,nullable = false)
    private String username;
    
    @Column(name="password",length = 45,nullable = false)
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    
}
