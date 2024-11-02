package entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

@Entity
@Table(name="usage_tracking")
public class UsageTracking implements Serializable{

    public UsageTracking() {}
    
    @Id
    @Column(name="id",nullable=false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    @ManyToOne
    @JoinColumn(name="user_email")
    private User user_email;
    
    @Column(name="date",nullable = false)
    private Date date;
    
    @Column(name="count",nullable = false)
    private int count;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser_email() {
        return user_email;
    }

    public void setUser_email(User user_email) {
        this.user_email = user_email;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
    
    
}
