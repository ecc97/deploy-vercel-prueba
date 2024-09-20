package Contest.Project.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Table(name = "messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_message")
    private int id;

    @Column(name = "body", columnDefinition = "TEXT")
    private String body;

    @Column(name = "date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date date;

    @ManyToOne
    @JoinColumn(name = "id_owner_1", nullable = false)
    private User sender;

    @ManyToOne
    @JoinColumn(name = "id_user_2", nullable = false)
    private User recipient;

}
