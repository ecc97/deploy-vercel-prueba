package Contest.Project.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PropertyDTO {

    private int id;

    private int id_user;

    @NotBlank(message = "Address cannot be blank")
    @Size(max = 255, message = "Address cannot exceed 255 characters")
    private String address;

    @Min(value = 0, message = "Price must be a positive number")
    private double price;

    @Min(value = 0, message = "Number of bathrooms must be a positive number")
    private int numberOfBathrooms;

    @Min(value = 0, message = "Property size must be a positive number")
    private int propertySize;

    @Min(value = 0, message = "Stratum must be a positive number")
    private int stratum;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    private int propertyObjectiveId;

    private int propertyTypeId;

    private int zoneId;

}
